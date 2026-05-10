# PRD — FamilyCook

**Version :** 1.2  
**Date :** 10 mai 2026  
**Statut :** Final  
**Hébergement :** Vercel  
**Framework :** Next.js 16.2.6 (App Router)

---

## 1. Vue d'ensemble

### 1.1 Contexte

**FamilyCook** est un site web de partage de recettes à usage familial. Il permet à toute personne de découvrir le site via une page d'accueil publique, puis, une fois inscrite, d'accéder à l'ensemble des recettes partagées, de créer les siennes et de les organiser.

### 1.2 Objectifs produit

- Offrir une vitrine publique attrayante pour présenter le concept
- Permettre une inscription libre et sécurisée (email, Google, magic link, 2FA)
- Donner à chaque utilisateur la possibilité de créer des recettes publiques ou privées
- Faciliter la recherche par catégorie, durée, difficulté et ingrédients
- Proposer des fonctionnalités pratiques : ajustement de portions, impression
- Fournir un panel d'administration complet

### 1.3 Hors périmètre (v1)

- Commentaires sur les recettes
- Système de follow / abonnements
- Partage sur réseaux sociaux
- Notation par étoiles
- Application mobile native
- Monétisation

---

## 2. Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | Next.js | 16.2.6 (latest stable) |
| UI Components | shadcn/ui | latest |
| Styling | Tailwind CSS | v4 |
| ORM | Prisma | 6.x |
| Authentification | Better Auth | latest |
| Base de données | PostgreSQL | via Neon (Vercel integration) |
| Stockage images | Vercel Blob | latest |
| Notifications (toasts) | Sonner (via shadcn) | latest |
| Emails transactionnels | Nodemailer + Google SMTP | — |
| Templates emails | React Email | latest |
| Notifications (toasts) | Sonner (via shadcn) | latest |
| Validation | Zod | 3.x |
| Langage | TypeScript | 5.x |
| Déploiement | Vercel | — |

### 2.1 Services Vercel utilisés

| Service | Usage |
|---------|-------|
| Vercel Hosting | Hébergement Next.js (Edge + Serverless) |
| Vercel Blob | Stockage et diffusion des images |
| Neon Postgres | Base de données PostgreSQL serverless |
| Vercel Analytics | Statistiques de trafic |

---

## 3. Architecture des pages

### Pages publiques (sans connexion)

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil — présentation de FamilyCook, aperçu de recettes publiques, CTA inscription/connexion |
| `/auth/login` | Connexion (email/mdp, Google OAuth, magic link) |
| `/auth/register` | Inscription (email + mot de passe) |
| `/auth/forgot-password` | Demande de réinitialisation de mot de passe |
| `/auth/reset-password` | Réinitialisation avec token |
| `/auth/verify-email` | Confirmation d'adresse email |
| `/auth/magic-link` | Saisie email pour magic link |
| `/auth/2fa` | Saisie du code TOTP |

### Pages privées (connexion requise)

| Route | Description |
|-------|-------------|
| `/recipes` | Liste de toutes les recettes publiques + les siennes |
| `/recipes/[id]` | Détail d'une recette |
| `/recipes/new` | Créer une recette |
| `/recipes/[id]/edit` | Modifier une recette (auteur ou admin) |
| `/profile` | Mon profil et mes recettes |
| `/profile/favorites` | Mes recettes favorites |
| `/profile/settings` | Paramètres du compte (nom, avatar, email) |
| `/profile/security` | Sécurité (mot de passe, 2FA, sessions actives) |

### Panel d'administration (rôle ADMIN uniquement)

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard (statistiques globales) |
| `/admin/users` | Gestion des utilisateurs |
| `/admin/recipes` | Gestion de toutes les recettes |

---

## 4. Fonctionnalités détaillées

### 4.1 Page d'accueil publique

La page d'accueil est accessible sans connexion et se compose de trois sections :

- **Hero** : titre accrocheur, sous-titre descriptif, deux boutons d'appel à l'action ("Rejoindre" et "Se connecter")
- **Aperçu des recettes** : grille de 6 recettes publiques récentes, affichées en mode teaser (photo + titre), non accessibles sans connexion
- **Comment ça marche** : 3 étapes illustrées expliquant le processus d'inscription et de partage
- **Footer** : liens légaux et contact

### 4.2 Authentification

#### Méthodes de connexion

| Méthode | Description |
|---------|-------------|
| Email + mot de passe | Inscription avec vérification email obligatoire avant accès |
| Google OAuth | Connexion en 1 clic via compte Google existant |
| Magic Link | Lien unique envoyé par email, valable 15 minutes |
| 2FA TOTP | Code à 6 chiffres généré par une application (Google Authenticator, Authy…) |

#### Emails transactionnels envoyés via Google SMTP

| Email | Déclencheur |
|-------|-------------|
| Vérification d'inscription | Immédiatement après création de compte |
| Magic link de connexion | À la demande de l'utilisateur |
| Réinitialisation de mot de passe | Demande "mot de passe oublié" |
| Confirmation d'activation du 2FA | Lors de l'activation du 2FA |
| Alerte de nouvelle connexion | Connexion détectée depuis un nouvel appareil |

#### Gestion des sessions

Les sessions sont stockées côté serveur avec un cookie sécurisé (httpOnly, sameSite, secure en production). La durée est de 7 jours par défaut, extensible à 30 jours avec l'option "Se souvenir de moi". L'utilisateur peut consulter et révoquer ses sessions actives depuis la page de sécurité de son profil.

### 4.3 Gestion des utilisateurs

#### Rôles

| Rôle | Permissions |
|------|-------------|
| USER | Créer, modifier et supprimer ses propres recettes ; consulter les recettes publiques ; gérer ses favoris |
| ADMIN | Toutes les permissions USER + gestion de tous les utilisateurs et toutes les recettes via le panel admin |

#### Profil utilisateur

Chaque utilisateur peut modifier depuis son espace personnel :
- Son nom d'affichage
- Son avatar (upload d'image stocké sur Vercel Blob)
- Son adresse email (avec re-vérification obligatoire)
- Son mot de passe (confirmation de l'ancien mot de passe requise)
- L'activation ou la désactivation du 2FA (accompagnée d'un QR code à scanner)
- La liste de ses sessions actives (appareil, date, adresse IP) avec possibilité de révocation individuelle
- La suppression définitive de son compte (modale de confirmation avec saisie du mot de passe)

### 4.4 Recettes

#### Champs d'une recette

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| Titre | Texte | ✅ | 3 à 100 caractères |
| Description | Texte | ✅ | 10 à 500 caractères |
| Photo de couverture | Image | ✅ | jpg / png / webp, max 5 Mo |
| Photos supplémentaires | Images | ❌ | Max 5 photos, mêmes règles |
| Catégorie | Liste fermée | ✅ | Voir liste ci-dessous |
| Durée de préparation | Entier (minutes) | ✅ | Entre 1 et 999 |
| Durée de cuisson | Entier (minutes) | ❌ | Entre 0 et 999 |
| Difficulté | Liste fermée | ✅ | Facile / Moyen / Difficile |
| Nombre de portions (base) | Entier | ✅ | Entre 1 et 100 |
| Ingrédients | Liste | ✅ | Minimum 1 ingrédient |
| └ Nom de l'ingrédient | Texte | ✅ | 1 à 100 caractères |
| └ Quantité | Décimal | ✅ | Supérieur à 0 |
| └ Unité | Texte | ❌ | ex : g, ml, cuillère à soupe |
| Étapes de préparation | Liste ordonnée | ✅ | Minimum 1 étape |
| └ Contenu de l'étape | Texte | ✅ | 5 à 1000 caractères |
| Tags | Mots-clés libres | ❌ | Max 10 tags, 30 caractères chacun |
| Visibilité | Liste fermée | ✅ | Publique ou Privée |

#### Catégories disponibles

Entrée · Plat principal · Dessert · Apéritif · Boisson · Petit-déjeuner · Sauce & condiment · Pain & viennoiserie · Autre

#### Visibilité

- **Publique** : la recette est visible par tous les utilisateurs connectés dans la liste des recettes
- **Privée** : la recette est visible uniquement par son auteur et les administrateurs

### 4.5 Portions ajustables

Sur la page de détail d'une recette, l'utilisateur dispose d'un contrôle numérique (boutons + et − ou saisie directe) pour modifier le nombre de portions. Toutes les quantités des ingrédients sont automatiquement recalculées en temps réel côté client, sans rechargement de page. Les valeurs sont arrondies de façon lisible (par exemple, 0,5 s'affiche comme ½). Le minimum est fixé à 1 portion.

### 4.6 Recherche & Filtres

#### Barre de recherche

La recherche plein-texte porte sur le titre, la description, les ingrédients et les tags d'une recette. Les résultats se mettent à jour en temps réel (délai de 300 ms après la saisie) sans rechargement de page. La recherche est implémentée via les capacités full-text search de PostgreSQL.

#### Filtres disponibles

| Filtre | Type d'interface |
|--------|-----------------|
| Catégorie | Sélection multiple via badges cliquables |
| Durée totale (préparation + cuisson) | Slider de plage (moins de 30 min / moins d'1h / plus d'1h) |
| Difficulté | Cases à cocher (Facile / Moyen / Difficile) |
| Ingrédient(s) | Champ de saisie avec autocomplétion |
| Mes recettes uniquement | Interrupteur (toggle) |
| Mes favoris uniquement | Interrupteur (toggle) |

#### Options de tri

- Plus récentes (par défaut)
- Plus anciennes
- Alphabétique A → Z
- Plus likées

### 4.7 Favoris

- Un bouton cœur est présent sur chaque carte recette et sur la page de détail
- Un clic ajoute ou retire la recette des favoris de l'utilisateur
- Le compteur de likes est toujours visible
- La page "Mes favoris" propose les mêmes filtres et options de tri que la liste principale
- Les recettes privées peuvent être mises en favoris sans que leur visibilité ne soit modifiée

### 4.8 Upload d'images

Les images sont stockées sur Vercel Blob. Les formats acceptés sont jpg, jpeg, png et webp, avec une taille maximum de 5 Mo par image. Avant le stockage, les images sont redimensionnées côté serveur : la photo de couverture est limitée à 1200×800 pixels et les photos supplémentaires à 1000×1000 pixels. Les images sont automatiquement converties en webp à l'upload. Un aperçu s'affiche côté client avant confirmation. Lorsqu'une image est remplacée, l'ancienne est automatiquement supprimée du stockage.

### 4.9 Impression

Un bouton "Imprimer" est disponible sur chaque page de détail de recette. Il déclenche la fenêtre d'impression native du navigateur. Une feuille de style dédiée masque tous les éléments d'interface (navigation, boutons, filtres) et présente uniquement le contenu utile : logo FamilyCook, titre, photo de couverture, informations clés (catégorie, durée, difficulté, nombre de portions ajusté), liste des ingrédients avec quantités recalculées si les portions ont été modifiées, étapes numérotées, et un pied de page mentionnant le nom du site et la date d'impression.

### 4.10 Notifications (toasts)

Les retours utilisateur sont affichés via des toasts positionnés en bas à droite de l'écran, implémentés avec Sonner (composant officiel shadcn/ui). Ils apparaissent automatiquement à la suite des actions suivantes :

| Action | Type | Message |
|--------|------|--------|
| Recette créée | Succès | "Recette ajoutée avec succès" |
| Recette modifiée | Succès | "Recette mise à jour" |
| Recette supprimée | Succès | "Recette supprimée" |
| Recette ajoutée aux favoris | Succès | "Ajouté à vos favoris" |
| Recette retirée des favoris | Info | "Retiré de vos favoris" |
| Erreur formulaire ou réseau | Erreur | Message d'erreur descriptif |
| Connexion réussie | Succès | "Bienvenue, [prénom]" |
| Déconnexion | Info | "Vous êtes déconnecté" |
| Email de vérification renvoyé | Succès | "Email envoyé" |
| Profil mis à jour | Succès | "Profil enregistré" |
| Mot de passe modifié | Succès | "Mot de passe mis à jour" |
| Session révoquée | Info | "Session déconnectée" |
| Action admin | Succès ou Erreur | Message contextuel |

Les toasts de succès et d'info se ferment automatiquement après 4 secondes. Les toasts d'erreur restent affichés jusqu'à fermeture manuelle.

### 4.11 Panel d'administration

#### Dashboard

Le tableau de bord affiche une vue d'ensemble : nombre total de recettes (publiques et privées), nombre d'utilisateurs inscrits (actifs et inactifs), nombre de recettes ajoutées cette semaine, et un graphique des nouvelles inscriptions sur les 30 derniers jours.

#### Gestion des utilisateurs

Tableau paginé (20 par page) affichant avatar, nom, email, rôle, date d'inscription et statut. Les actions disponibles sont : modifier le rôle (USER ↔ ADMIN), désactiver ou réactiver un compte, et supprimer un compte (avec confirmation). Une barre de recherche permet de filtrer par nom ou email.

#### Gestion des recettes

Tableau paginé affichant titre, auteur, catégorie, visibilité, date de création et nombre de likes. Les actions disponibles sont : modifier la visibilité (publique ↔ privée) et supprimer une recette (avec confirmation). Des filtres permettent de trier par utilisateur, catégorie et visibilité.

---

## 5. Modèle de données

### Entités principales

**User** — représente un compte utilisateur. Contient : identifiant unique, nom, email (unique), statut de vérification de l'email, URL de l'avatar, rôle (USER ou ADMIN), statut actif/banni, dates de création et mise à jour. Relié aux sessions, comptes OAuth, recettes et favoris.

**Recipe** — représente une recette. Contient : identifiant, titre, description, URL de la photo de couverture, liste des URLs de photos supplémentaires, catégorie, durée de préparation, durée de cuisson (optionnel), difficulté, nombre de portions de base, visibilité (PUBLIC ou PRIVATE), dates de création et mise à jour, référence à l'auteur. Reliée aux ingrédients, étapes, tags et favoris.

**Ingredient** — ingrédient d'une recette. Contient : identifiant, nom, quantité, unité (optionnel), ordre d'affichage, référence à la recette parente.

**Step** — étape de préparation. Contient : identifiant, contenu textuel, ordre d'affichage, référence à la recette parente.

**Tag** — mot-clé libre. Contient : identifiant et nom unique. Relié aux recettes via une table de jonction.

**Favorite** — relation entre un utilisateur et une recette mise en favoris. Clé composite (userId + recipeId), avec date d'ajout.

### Entités Better Auth (gérées automatiquement)

**Session** — session active d'un utilisateur. Contient identifiant, date d'expiration, adresse IP, user agent, référence à l'utilisateur.

**Account** — compte OAuth ou local. Contient les tokens d'accès et de rafraîchissement, et le mot de passe hashé pour les comptes locaux.

**Verification** — token temporaire pour les vérifications d'email et les magic links.

---

## 6. Structure du projet

Le projet suit l'organisation standard de Next.js 16 avec App Router et des route groups pour isoler les layouts :

- **(public)** — layout minimal pour la page d'accueil publique
- **(auth)** — layout centré pour toutes les pages d'authentification
- **(app)** — layout principal avec navigation pour les pages privées
- **(admin)** — layout avec sidebar dédiée pour le panel d'administration

### Dossiers principaux

| Dossier | Contenu |
|---------|---------|
| `app/` | Pages et layouts Next.js organisés par route groups |
| `app/api/` | Routes API (auth, recettes, favoris, upload images) |
| `components/ui/` | Composants shadcn/ui générés automatiquement |
| `components/auth/` | Formulaires d'authentification |
| `components/recipes/` | Composants liés aux recettes (carte, formulaire, détail, ajusteur de portions) |
| `components/layout/` | Navbar, sidebar, footer |
| `components/admin/` | Composants du panel admin (tableaux, statistiques) |
| `lib/` | Configurations et utilitaires (auth, base de données, mailer, blob) |
| `hooks/` | Hooks React personnalisés |
| `types/` | Types TypeScript partagés |
| `prisma/` | Schéma de base de données et seed |
| `emails/` | Templates React Email (vérification, magic link, reset password) |
| `public/` | Assets statiques (logo, favicon) |

---

## 7. Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion Neon PostgreSQL |
| `BETTER_AUTH_SECRET` | Clé secrète aléatoire (minimum 32 caractères) |
| `BETTER_AUTH_URL` | URL publique du site (localhost en développement) |
| `GOOGLE_CLIENT_ID` | Identifiant client Google OAuth (Google Cloud Console) |
| `GOOGLE_CLIENT_SECRET` | Secret client Google OAuth |
| `GMAIL_USER` | Adresse Gmail utilisée pour l'envoi des emails |
| `GMAIL_APP_PASSWORD` | App Password Gmail à 16 caractères (différent du mot de passe du compte) |
| `EMAIL_FROM` | Expéditeur affiché dans les emails (ex : FamilyCook) |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob pour la lecture et l'écriture |
| `NEXT_PUBLIC_APP_URL` | URL publique du site, accessible côté client |
| `NEXT_PUBLIC_APP_NAME` | Nom de l'application affiché dans l'interface |

---

## 8. Configuration Better Auth

Better Auth est configuré avec les éléments suivants :

- **Adaptateur base de données** : Prisma avec PostgreSQL
- **Email + mot de passe** : activé, vérification email obligatoire avant tout accès. Un email de réinitialisation est envoyé via Google SMTP.
- **Google OAuth** : activé via les identifiants Google Cloud Console.
- **Magic Link** : plugin activé, lien valable 15 minutes, envoyé via Google SMTP.
- **2FA TOTP** : plugin activé, issuer affiché dans l'application d'authentification : "FamilyCook".
- **Admin** : plugin activé, rôle admin associé à la valeur "ADMIN".
- **Sessions** : durée de 7 jours, renouvellement automatique si moins d'1 jour restant, cache cookie côté client de 5 minutes pour éviter des requêtes serveur inutiles.

---

## 9. Configuration emails (Google SMTP)

L'envoi d'emails utilise Nodemailer connecté à Gmail via SMTP sécurisé (port 465, SSL). L'authentification se fait avec un App Password Gmail et non le mot de passe principal du compte. Les templates sont construits avec React Email pour un rendu HTML compatible avec tous les clients email. Trois templates sont prévus en v1 : vérification d'inscription, magic link de connexion, et réinitialisation de mot de passe.

---

## 10. Exigences non-fonctionnelles

### Performance

- Score Lighthouse supérieur ou égal à 90 sur mobile et desktop
- Images servies via le CDN Vercel avec optimisation automatique (format webp, lazy loading, redimensionnement)
- Pagination de 12 recettes par page
- Rendu statique incrémental (ISR) sur les pages de recettes publiques pour réduire la charge serveur

### Sécurité

- HTTPS enforced par défaut sur Vercel
- En-têtes HTTP sécurisés configurés dans next.config.ts : CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Validation des données côté serveur avec Zod sur toutes les Server Actions et API Routes
- Rate limiting intégré Better Auth sur les endpoints d'authentification
- Contrôle d'accès basé sur les rôles (RBAC) : le middleware Next.js vérifie le rôle ADMIN pour les routes /admin et la propriété d'une ressource pour les mutations

### Accessibilité

- Conformité WCAG 2.1 niveau AA
- Navigation clavier complète sur tous les composants interactifs
- Attributs aria-label sur tous les boutons iconiques
- Contraste suffisant en mode clair et mode sombre

### Responsive

- Approche mobile-first
- Breakpoints Tailwind CSS : sm (640px), md (768px), lg (1024px), xl (1280px)

---

## 11. Roadmap

### Phase 1 — MVP (v1.0)

- [ ] Setup du projet (Next.js 16 + Tailwind v4 + shadcn + Prisma + Neon + Better Auth + Vercel Blob)
- [ ] Authentification complète (email, Google, magic link, 2FA, réinitialisation de mot de passe)
- [ ] Page d'accueil publique
- [ ] CRUD recettes avec upload d'images
- [ ] Visibilité publique / privée
- [ ] Recherche et filtres
- [ ] Favoris / likes
- [ ] Portions ajustables
- [ ] Impression
- [ ] Panel admin (utilisateurs + recettes)
- [ ] Déploiement Vercel + Neon

### Phase 2 — Améliorations (v1.x)

- [ ] Commentaires sur les recettes
- [ ] Partage par lien privé (token temporaire, sans compte)
- [ ] Notation par étoiles
- [ ] Export PDF d'une recette
- [ ] Import depuis une URL (scraping)
- [ ] Collections / classeurs personnalisés

### Phase 3 — Évolutions (v2.0)

- [ ] PWA (Progressive Web App)
- [ ] Planificateur de menus hebdomadaire
- [ ] Liste de courses générée automatiquement
- [ ] Notifications pour les nouvelles recettes publiques
