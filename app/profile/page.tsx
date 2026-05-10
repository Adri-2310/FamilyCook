"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  recipeCount: number;
  favoriteCount: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, router, isPending]);

  if (loading || !profile) {
    return <div className="text-center text-muted-foreground">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start gap-6">
          {profile.image && (
            <img
              src={profile.image}
              alt={profile.name || "Avatar"}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {profile.name || "Utilisateur"}
            </h2>
            <p className="text-muted-foreground mb-4">{profile.email}</p>
            <p className="text-sm text-muted-foreground">
              Inscrit le {new Date(profile.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold">{profile.recipeCount}</div>
          <div className="text-sm text-muted-foreground">Recettes</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold">❤️ {profile.favoriteCount}</div>
          <div className="text-sm text-muted-foreground">Favoris</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Mes recettes</h3>
        <div className="text-sm text-muted-foreground">
          Vous avez {profile.recipeCount} recette{profile.recipeCount > 1 ? "s" : ""}
        </div>
      </Card>
    </div>
  );
}
