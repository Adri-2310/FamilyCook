"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toastProfileUpdated, toastError } from "@/lib/toast";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    setName(session.user.name || "");
    setEmail(session.user.email || "");
  }, [session, router, isPending]);

  const handleSaveName = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        toastProfileUpdated();
      } else {
        toastError("Erreur lors de la mise à jour");
      }
    } catch {
      toastError("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr ? Cette action est irréversible."
    );
    if (!confirmed) return;

    try {
      const response = await fetch("/api/profile", { method: "DELETE" });
      if (response.ok) {
        router.push("/");
      } else {
        toastError("Erreur lors de la suppression du compte");
      }
    } catch {
      toastError("Erreur lors de la suppression du compte");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Nom d'affichage</h3>
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
          />
          <Button onClick={handleSaveName} disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Email</h3>
        <p className="text-sm text-muted-foreground mb-4">{email}</p>
        <Button variant="outline" disabled>
          Modifier l'email
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Avatar</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Téléchargez une nouvelle photo de profil
        </p>
        <Button variant="outline" disabled>
          Télécharger un avatar
        </Button>
      </Card>

      <Card className="p-6 border-red-200 bg-red-50/50 dark:bg-red-950/20">
        <h3 className="text-lg font-semibold mb-4 text-red-700 dark:text-red-300">
          Zone de danger
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cette action est irréversible. Vérifiez bien avant de continuer.
        </p>
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
        >
          🗑️ Supprimer mon compte
        </Button>
      </Card>
    </div>
  );
}
