"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, refetch } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user.name || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!session?.user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Chargement du profil...</p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Le nom ne peut pas être vide");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      await refetch();
      setIsEditing(false);
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde du profil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles
        </p>
      </div>

      <Card className="p-8 mb-6">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Nom</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={session.user.email || ""}
              disabled
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Rôle</label>
            <Input
              value={session.user.role || "USER"}
              disabled
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email vérifié</label>
            <div className="mt-2">
              <span className={`inline-block px-3 py-1 rounded text-sm ${
                session.user.emailVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {session.user.emailVerified ? "✓ Vérifié" : "⚠ Non vérifié"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {!isEditing ? (
            <Button onClick={() => {
              setName(session.user.name || "");
              setIsEditing(true);
            }}>
              Modifier le profil
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <Button variant="outline" onClick={() => {
                setName(session.user.name || "");
                setIsEditing(false);
              }} disabled={isSaving}>
                Annuler
              </Button>
            </>
          )}
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-lg font-bold mb-4">Paramètres et sécurité</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Modifier le mot de passe</span>
            <Button variant="outline" size="sm" disabled>
              Bientôt
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Activer l'authentification à deux facteurs</span>
            <Button variant="outline" size="sm" disabled>
              Bientôt
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
