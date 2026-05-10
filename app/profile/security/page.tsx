"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecurityPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }
  }, [session, router, isPending]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setSaving(true);
    try {
      // Implement password change
    } catch {
      alert("Erreur lors de la modification du mot de passe");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Modifier le mot de passe</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Mot de passe actuel
            </label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Nouveau mot de passe
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirmer le mot de passe
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button onClick={handleChangePassword} disabled={saving}>
            {saving ? "Modification..." : "Modifier le mot de passe"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Authentification à deux facteurs (2FA)
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Renforcez la sécurité de votre compte avec le 2FA
        </p>
        <Button variant="outline" disabled>
          🔐 Configurer le 2FA
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sessions actives</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Gérez vos sessions connectées
        </p>
        <div className="space-y-3">
          <div className="border rounded p-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Session actuelle</p>
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
            </div>
            <span className="text-xs bg-primary/10 px-2 py-1 rounded">
              Actif maintenant
            </span>
          </div>
        </div>
        <Button variant="outline" className="mt-4" disabled>
          Révoquer toutes les autres sessions
        </Button>
      </Card>
    </div>
  );
}
