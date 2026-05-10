# FamilyCook

Une application web de partage de recettes en famille, construite avec Next.js 16, TypeScript et Prisma.

## Stack Technologique

- **Frontend**: Next.js 16 (App Router) + React + TypeScript
- **UI**: Tailwind CSS v4 + shadcn/ui
- **Authentification**: Better Auth
- **Base de données**: PostgreSQL (Neon) + Prisma ORM
- **Stockage d'images**: Vercel Blob
- **Notifications**: Sonner (toast)
- **Validation**: Zod

## Fonctionnalités

### Authentification
- Inscription et connexion sécurisées avec Better Auth
- Gestion des sessions et rôles utilisateur
- Support des rôles : utilisateur standard et administrateur

### Gestion des Recettes
- Créer, modifier, supprimer des recettes
- Ajouter des photos et images supplémentaires
- Catégoriser par type (entrée, plat, dessert, etc.)
- Niveaux de difficulté (facile, moyen, difficile)
- Temps de préparation et cuisson
- Portage ajustable avec conversion automatique des unités
- Visibilité publique ou privée

### Favoris
- Sauvegarder les recettes préférées
- Accès rapide aux favoris

### Profil Utilisateur
- Affichage du profil avec statistiques
- Modification du nom d'affichage
- Suppression de compte (avec cascade)
- Gestion des sessions (stub)
- Sécurité (stub pour changement mot de passe et 2FA)

### Tableau de Bord Administrateur
- Vue d'ensemble des utilisateurs et recettes
- Modération du contenu
- Gestion des rôles

## Structure du Projet

```
app/
├── (public)/          # Pages publiques
├── api/              # Routes API
├── auth/             # Authentification
├── admin/            # Panneau administrateur
├── profile/          # Profil utilisateur
├── recipe/           # Gestion des recettes
│   ├── my/          # Recettes personnelles
│   ├── shared/      # Recettes publiques
│   └── favorites/   # Recettes favorites
└── user/            # Espace utilisateur

components/
├── ui/               # Composants shadcn/ui
└── recipe/          # Composants métier

lib/
├── auth.ts          # Configuration Better Auth
├── db.ts            # Client Prisma
└── ...

prisma/
└── schema.prisma    # Schéma de base de données
```

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer les variables d'environnement dans `.env.local` :
   ```
   DATABASE_URL=your_neon_database_url
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your_secret
   ```
4. Exécuter les migrations Prisma :
   ```bash
   npx prisma migrate dev
   ```

## Développement

Démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera disponible à [http://localhost:3000](http://localhost:3000).

## Commandes Utiles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run start` - Démarrer le serveur de production
- `npx prisma studio` - Ouvrir Prisma Studio pour gérer la base de données
- `npx prisma migrate dev` - Créer et exécuter les migrations
