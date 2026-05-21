import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Accès refusé" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { year, month } = body;

    if (!year || !month) {
      return NextResponse.json(
        { error: "Année et mois requis" },
        { status: 400 }
      );
    }

    const result = await logger.archiveMonth(year, month);

    await logger.userAction("admin.logs-archive", {
      userId: session.user.id,
      metadata: { year, month, ...result },
    });

    return NextResponse.json({
      success: true,
      message: `Archivage réussi: ${result.archived} logs archivés, ${result.deleted} supprimés`,
      ...result,
    });
  } catch (error) {
    console.error("Archive logs error:", error);

    const session = await auth.api.getSession({ headers: request.headers });
    await logger.error(
      "admin.logs-archive-failed",
      error,
      { userId: session?.user.id }
    );

    return NextResponse.json(
      { error: "Erreur lors de l'archivage" },
      { status: 500 }
    );
  }
}
