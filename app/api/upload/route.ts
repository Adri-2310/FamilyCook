import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // Valider que c'est une image
    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Le fichier doit être une image" },
        { status: 400 }
      );
    }

    // Limiter la taille (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { error: "L'image ne doit pas dépasser 5MB" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    // Upload vers Vercel Blob
    const blob = await put(`recipes/${session.user.id}/${file.name}`, buffer, {
      access: "public",
    });

    return Response.json({ url: blob.url });
  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";

    return Response.json(
      { error: `Erreur lors de l'upload: ${errorMessage}` },
      { status: 500 }
    );
  }
}
