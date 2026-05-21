import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { ContactType } from "@prisma/client";

const contactSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  type: z.enum(["BUG", "FEEDBACK", "QUESTION"]),
  message: z.string().min(10).max(5000),
});

type ContactData = z.infer<typeof contactSchema>;

// Simple in-memory rate limiting (5 messages per day per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  return ip.trim();
}

function generateReferenceNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `MSG-${dateStr}-${random}`;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or new entry
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    rateLimitMap.set(ip, {
      count: 1,
      resetTime: tomorrow.getTime(),
    });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Parse JSON
    const body = await request.json();

    // Validate with Zod
    const validatedData = contactSchema.parse(body);

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit (5 per day per IP)
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Trop de messages. Veuillez réessayer demain." },
        { status: 429 }
      );
    }

    // Get user agent
    const userAgent = request.headers.get("user-agent") || undefined;

    // Generate reference number
    const referenceNumber = generateReferenceNumber();

    // Save to database
    const message = await prisma.message.create({
      data: {
        referenceNumber,
        name: validatedData.name,
        email: validatedData.email,
        type: validatedData.type as ContactType,
        subject: undefined, // Optional - could be auto-generated based on type
        body: validatedData.message,
        ipAddress: clientIP,
        userAgent,
        status: "NEW",
        consentEmail: true,
      },
    });

    await logger.userAction("contact.submit", {
      ipAddress: clientIP,
      metadata: {
        referenceNumber: message.referenceNumber,
        type: validatedData.type,
        email: validatedData.email,
      },
    });

    return NextResponse.json({
      success: true,
      referenceNumber: message.referenceNumber,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      await logger.error("contact.validation-failed", error);
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    await logger.error("contact.submit-failed", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
