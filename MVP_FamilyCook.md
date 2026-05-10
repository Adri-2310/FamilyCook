# Plan MVP — FamilyCook

**Version :** 1.0  
**Date :** 10 mai 2026  
**Objectif :** Livrer une version fonctionnelle et déployée sur Vercel

---

## Vue d'ensemble des étapes

| Phase | Titre | Priorité |
|-------|-------|----------|
| 1 | Initialisation du projet | 🔴 Critique |
| 2 | Base de données | 🔴 Critique |
| 3 | Authentification | 🔴 Critique |
| 4 | Page d'accueil publique | 🟡 Haute |
| 5 | Gestion des recettes | 🔴 Critique |
| 6 | Upload d'images | 🟡 Haute |
| 7 | Recherche et filtres | 🟡 Haute |
| 8 | Favoris | 🟡 Haute |
| 9 | Portions ajustables | 🟢 Moyenne |
| 10 | Impression | 🟢 Moyenne |
| 11 | Notifications (toasts) | 🟡 Haute |
| 12 | Panel d'administration | 🟡 Haute |
| 13 | Profil utilisateur | 🟡 Haute |
| 14 | Déploiement Vercel | 🔴 Critique |

---

## Phase 1 — Initialisation du projet

### Objectif
Mettre en place la structure de base du projet avec toutes les dépendances et la configuration initiale.

### Étapes

**1.1 Créer le projet Next.js**
- Initialiser un nouveau projet Next.js 16 avec TypeScript et App Router
- Choisir le dossier `src/` comme convention (optionnel mais recommandé)
- Activer Turbopack pour le développement local

**1.2 Installer et configurer Tailwind CSS v4**
- Installer Tailwind CSS v4
- Configurer le fichier de thème global
- Définir la palette de couleurs FamilyCook (teintes chaleureuses : crème, terra cotta, vert sauge)
- Configurer les polices (Inter ou Geist via next/font)
- Activer le mode sombre via next-themes

**1.3 Installer et configurer shadcn/ui**
- Initialiser shadcn/ui dans le projet
- Installer les composants nécessaires au MVP : Button, Card, Input, Form, Select, Badge, Avatar, Dialog, Sheet, Skeleton, Table, Tabs, DropdownMenu, Separator, Tooltip
- Installer le composant Sonner pour les toasts
- Vérifier la compatibilité avec Tailwind v4

**1.4 Configurer la structure des dossiers**
- Créer l'arborescence des dossiers : app, components, lib, hooks, types, emails, prisma, public
- Mettre en place les route groups : (public), (auth), (app), (admin)
- Créer les layouts pour chaque route group
- Configurer les alias de chemins TypeScript (@/components, @/lib, etc.)

**1.5 Configurer les variables d'environnement**
- Créer le fichier .env.local avec toutes les variables nécessaires (vides)
- Créer le fichier .env.example documenté pour référence
- Vérifier que .env.local est bien dans .gitignore

**1.6 Configurer next.config.ts**
- Activer les en-têtes de sécurité (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- Configurer les domaines autorisés pour next/image (Vercel Blob)
- Activer le support des Server Actions

**1.7 Initialiser Git et le dépôt**
- Initialiser le dépôt Git
- Créer le .gitignore approprié
- Premier commit "init project"
- Connecter au dépôt GitHub (requis pour le déploiement Vercel)

### Livrable
Projet Next.js qui démarre sans erreur, avec shadcn/ui fonctionnel et la structure de dossiers en place.

---

## Phase 2 — Base de données

### Objectif
Mettre en place la base de données PostgreSQL avec Prisma et créer toutes les tables nécessaires.

### Étapes

**2.1 Créer la base de données Neon**
- Créer un compte Neon (ou utiliser l'intégration Vercel)
- Créer un nouveau projet Neon nommé "familycook"
- Récupérer l'URL de connexion et la placer dans .env.local

**2.2 Installer et configurer Prisma**
- Installer Prisma et le client Prisma
- Initialiser Prisma dans le projet (génère prisma/schema.prisma)
- Configurer le provider PostgreSQL et l'URL de base de données

**2.3 Écrire le schéma Prisma**
- Déclarer tous les enums : Role, Category, Difficulty, Visibility
- Créer le modèle User avec tous ses champs et relations
- Créer le modèle Recipe avec tous ses champs et relations
- Créer le modèle Ingredient
- Créer le modèle Step
- Créer le modèle Tag et la table de jonction RecipeTag
- Créer le modèle Favorite
- Créer les modèles Better Auth : Session, Account, Verification

**2.4 Appliquer le schéma**
- Générer la première migration Prisma
- Appliquer la migration sur la base Neon
- Générer le client Prisma

**2.5 Créer l'instance Prisma**
- Créer le fichier lib/db.ts avec une instance singleton du client Prisma (pattern recommandé pour éviter les connexions multiples en développement)

**2.6 Créer le seed**
- Écrire un fichier prisma/seed.ts qui crée un utilisateur admin par défaut et quelques recettes de démonstration
- Vérifier que le seed s'exécute correctement

### Livrable
Base de données opérationnelle avec toutes les tables créées, instance Prisma fonctionnelle, seed de démonstration disponible.

---

## Phase 3 — Authentification

### Objectif
Mettre en place un système d'authentification complet avec Better Auth : email/mot de passe, Google OAuth, magic link et 2FA.

### Étapes

**3.1 Configurer Google OAuth**
- Créer un projet dans Google Cloud Console
- Activer l'API Google OAuth
- Créer des identifiants OAuth (client ID + secret)
- Ajouter les URLs de redirection autorisées (localhost et domaine Vercel)
- Placer les identifiants dans .env.local

**3.2 Configurer Google SMTP**
- Activer la vérification en deux étapes sur le compte Gmail utilisé
- Générer un App Password Gmail (16 caractères)
- Placer les identifiants SMTP dans .env.local

**3.3 Installer et configurer Better Auth**
- Installer Better Auth et ses plugins : magic link, two-factor, admin
- Installer l'adaptateur Prisma pour Better Auth
- Créer le fichier lib/auth.ts avec la configuration complète (voir PRD section 8)
- Créer le fichier lib/auth-client.ts pour les appels côté client

**3.4 Créer la route API Better Auth**
- Créer app/api/auth/[...all]/route.ts qui délègue à Better Auth

**3.5 Installer React Email et Nodemailer**
- Installer nodemailer, @types/nodemailer, @react-email/components, react-email
- Créer le fichier lib/mailer.ts avec la configuration Google SMTP
- Créer les templates email avec React Email :
  - emails/verify-email.tsx : email de vérification d'inscription
  - emails/magic-link.tsx : email de connexion sans mot de passe
  - emails/reset-password.tsx : email de réinitialisation de mot de passe

**3.6 Créer le middleware de protection des routes**
- Créer middleware.ts à la racine du projet
- Configurer la logique de redirection :
  - Routes non authentifiées (/(app)/*) → redirection vers /auth/login si non connecté
  - Routes admin (/admin/*) → redirection vers /recipes si rôle !== ADMIN
  - Utilisateur connecté sur /auth/login → redirection vers /recipes

**3.7 Créer les pages d'authentification**
- /auth/login : formulaire email + mot de passe, bouton Google OAuth, lien "magic link", lien "mot de passe oublié"
- /auth/register : formulaire d'inscription (nom, email, mot de passe, confirmation)
- /auth/forgot-password : saisie email pour déclencher l'envoi du lien de reset
- /auth/reset-password : formulaire nouveau mot de passe (reçoit le token en paramètre URL)
- /auth/verify-email : page d'attente avec message "vérifiez votre boîte mail" + bouton renvoyer
- /auth/magic-link : saisie email, confirmation d'envoi
- /auth/2fa : saisie du code à 6 chiffres

**3.8 Tester les flux complets**
- Inscription → réception email → vérification → connexion
- Connexion Google OAuth
- Magic link : demande → email → connexion
- Mot de passe oublié : demande → email → reset → connexion
- Activation 2FA depuis le profil → déconnexion → reconnexion avec code TOTP

### Livrable
Authentification complète et fonctionnelle. Les routes privées sont protégées. Les emails sont envoyés et reçus correctement.

---

## Phase 4 — Page d'accueil publique

### Objectif
Créer la vitrine publique du site, accessible sans connexion.

### Étapes

**4.1 Créer le layout public**
- Créer app/(public)/layout.tsx avec une navbar minimaliste (logo + boutons Connexion/Inscription) et un footer

**4.2 Créer les composants de la navbar et du footer**
- components/layout/navbar-public.tsx : logo FamilyCook, navigation, boutons auth
- components/layout/footer.tsx : liens légaux, copyright

**4.3 Créer la section Hero**
- Titre principal "FamilyCook"
- Sous-titre accrocheur
- Deux boutons CTA : "Rejoindre FamilyCook" (→ /auth/register) et "Se connecter" (→ /auth/login)
- Image ou illustration de fond

**4.4 Créer la section aperçu des recettes**
- Récupérer les 6 recettes publiques les plus récentes (requête serveur)
- Afficher en grille de cartes teaser (photo + titre + catégorie)
- Les cartes ne sont pas cliquables : afficher un overlay "Connectez-vous pour voir la recette"

**4.5 Créer la section "Comment ça marche"**
- 3 étapes illustrées avec icônes :
  1. Créez votre compte gratuitement
  2. Ajoutez et organisez vos recettes
  3. Partagez avec votre famille

**4.6 Optimiser pour le SEO**
- Configurer les métadonnées : title, description, og:image dans app/layout.tsx et app/(public)/page.tsx
- Ajouter le favicon et les icônes Apple Touch

### Livrable
Page d'accueil publique affichée correctement, responsive, avec les 6 recettes en teaser et les CTAs fonctionnels.

---

## Phase 5 — Gestion des recettes (CRUD)

### Objectif
Permettre aux utilisateurs connectés de créer, lire, modifier et supprimer leurs recettes.

### Étapes

**5.1 Créer le layout privé**
- Créer app/(app)/layout.tsx avec navbar complète (logo, navigation, avatar utilisateur, menu déroulant)
- Inclure le Toaster Sonner dans le layout racine

**5.2 Créer les composants de base**
- components/recipes/recipe-card.tsx : carte recette (photo, titre, catégorie, durée, difficulté, auteur, compteur de likes, bouton favori)
- components/recipes/recipe-grid.tsx : grille responsive de RecipeCard avec skeleton de chargement

**5.3 Créer la page liste des recettes (/recipes)**
- Afficher toutes les recettes publiques + les recettes privées de l'utilisateur connecté
- Grille de 12 recettes par page avec pagination
- Barre de recherche et filtres (implémentés à la phase 7)
- Bouton "Nouvelle recette" en haut à droite

**5.4 Créer le formulaire de recette**
- components/recipes/recipe-form.tsx : formulaire complet de création/modification
  - Champs texte : titre, description
  - Upload photo de couverture + photos supplémentaires (phase 6)
  - Select catégorie
  - Inputs numériques : durée de préparation, durée de cuisson, portions
  - Select difficulté
  - Liste dynamique d'ingrédients (ajout/suppression/réordonnancement)
  - Liste dynamique d'étapes (ajout/suppression/réordonnancement)
  - Input tags avec saisie libre
  - Toggle visibilité publique/privée
  - Boutons "Enregistrer" et "Annuler"
- Validation côté client avec Zod + react-hook-form

**5.5 Créer la page de création (/recipes/new)**
- Afficher le RecipeForm vide
- Soumettre via Server Action → créer la recette en base
- Rediriger vers la page détail après succès
- Toast de confirmation

**5.6 Créer la page de détail (/recipes/[id])**
- components/recipes/recipe-detail.tsx : affichage complet de la recette
  - Photo de couverture pleine largeur
  - Galerie de photos supplémentaires
  - Informations clés (catégorie, durée totale, difficulté, portions)
  - Composant d'ajustement des portions (phase 9)
  - Liste des ingrédients
  - Étapes numérotées
  - Bouton favori
  - Bouton imprimer
  - Boutons Modifier / Supprimer (visibles uniquement pour l'auteur et les admins)
- Vérification des droits d'accès : recette privée → accessible uniquement à l'auteur et aux admins

**5.7 Créer la page de modification (/recipes/[id]/edit)**
- Afficher le RecipeForm pré-rempli avec les données existantes
- Soumettre via Server Action → mettre à jour la recette en base
- Rediriger vers la page détail après succès
- Toast de confirmation

**5.8 Implémenter la suppression**
- Bouton "Supprimer" sur la page détail (auteur et admin uniquement)
- Modale de confirmation avant suppression
- Server Action de suppression → suppression en base + suppression images Vercel Blob
- Redirection vers /recipes après succès
- Toast de confirmation

**5.9 Créer les Server Actions**
- actions/recipes.ts : createRecipe, updateRecipe, deleteRecipe
- Validation Zod sur chaque action
- Vérification des droits d'accès sur chaque action

### Livrable
CRUD complet fonctionnel. Un utilisateur peut créer, lire, modifier et supprimer ses recettes.

---

## Phase 6 — Upload d'images

### Objectif
Permettre l'upload de photos pour les recettes et les avatars, avec stockage sur Vercel Blob.

### Étapes

**6.1 Configurer Vercel Blob**
- Créer un store Vercel Blob depuis le dashboard Vercel
- Récupérer le token et le placer dans .env.local
- Installer le package @vercel/blob
- Créer lib/blob.ts avec les fonctions utilitaires : uploadImage, deleteImage

**6.2 Installer Sharp pour le traitement d'images**
- Installer sharp (redimensionnement côté serveur)
- Créer une fonction utilitaire de traitement : redimensionnement + conversion webp

**6.3 Créer la route API d'upload**
- Créer app/api/upload/route.ts
- Recevoir le fichier en FormData
- Valider le type (jpg/png/webp) et la taille (max 5 Mo)
- Redimensionner via sharp selon le type (couverture ou supplémentaire)
- Convertir en webp
- Uploader sur Vercel Blob
- Retourner l'URL publique

**6.4 Créer le composant d'upload**
- components/ui/image-upload.tsx : zone de dépôt (drag & drop) ou clic pour sélectionner
- Aperçu de l'image avant confirmation
- Indicateur de progression de l'upload
- Bouton de suppression de l'image sélectionnée
- Gestion des erreurs (fichier trop grand, format non supporté)

**6.5 Intégrer l'upload dans le formulaire recette**
- Remplacer les champs image du RecipeForm par le composant ImageUpload
- Photo de couverture : obligatoire, 1 seule image
- Photos supplémentaires : optionnel, max 5 images, avec possibilité de réordonner

**6.6 Gérer la suppression des images**
- Lors de la suppression d'une recette : supprimer toutes les images associées de Vercel Blob
- Lors du remplacement d'une image : supprimer l'ancienne avant d'uploader la nouvelle

**6.7 Uploader les avatars**
- Intégrer l'ImageUpload dans la page /profile/settings pour l'avatar utilisateur
- Redimensionnement spécifique : 200×200 pixels, format carré

### Livrable
Upload d'images fonctionnel. Les photos des recettes et avatars s'affichent depuis Vercel Blob.

---

## Phase 7 — Recherche et filtres

### Objectif
Permettre aux utilisateurs de trouver rapidement des recettes via la recherche et les filtres.

### Étapes

**7.1 Mettre en place la recherche full-text PostgreSQL**
- Ajouter un index full-text sur les champs titre, description du modèle Recipe dans Prisma
- Implémenter la requête de recherche dans une fonction utilitaire lib/search.ts
- La recherche doit couvrir : titre, description, noms des ingrédients, tags

**7.2 Créer le composant de barre de recherche**
- Input avec icône loupe
- Debounce de 300 ms pour limiter les requêtes
- Mise à jour des résultats en temps réel via les paramètres d'URL (searchParams)
- Bouton de réinitialisation de la recherche

**7.3 Créer le panneau de filtres**
- components/recipes/filters.tsx : panneau latéral ou accordéon selon la taille d'écran
- Filtre catégorie : badges cliquables multi-sélection
- Filtre durée : slider avec 3 paliers (< 30 min, < 1h, > 1h)
- Filtre difficulté : checkboxes
- Filtre ingrédients : input texte avec autocomplétion (suggestions issues de la base)
- Toggle "Mes recettes uniquement"
- Toggle "Mes favoris uniquement"
- Bouton "Réinitialiser les filtres"

**7.4 Créer le composant de tri**
- Select avec les 4 options de tri : Plus récentes, Plus anciennes, A→Z, Plus likées
- Persistance du tri dans les paramètres d'URL

**7.5 Mettre à jour la page /recipes**
- Lire tous les filtres et la recherche depuis searchParams (Server Component)
- Construire la requête Prisma avec tous les filtres actifs
- Afficher le nombre de résultats trouvés
- Pagination basée sur les paramètres d'URL (page=1, page=2…)

**7.6 Synchroniser les filtres avec l'URL**
- Tous les filtres actifs sont reflétés dans l'URL (pour partage et navigation arrière)
- Exemple : /recipes?search=pasta&category=MAIN&difficulty=EASY&sort=recent

### Livrable
Recherche et filtres fonctionnels, résultats mis à jour en temps réel, état persisté dans l'URL.

---

## Phase 8 — Favoris

### Objectif
Permettre aux utilisateurs de sauvegarder leurs recettes préférées.

### Étapes

**8.1 Créer les Server Actions**
- actions/favorites.ts : addFavorite, removeFavorite
- Vérification de l'authentification sur chaque action
- Optimistic updates pour une expérience fluide

**8.2 Créer le composant bouton favori**
- components/recipes/favorite-button.tsx : bouton cœur animé
- État actif/inactif selon si la recette est dans les favoris de l'utilisateur
- Affichage du compteur de likes à côté du cœur
- Mise à jour optimiste de l'interface avant confirmation serveur

**8.3 Intégrer le bouton dans les cartes et la page détail**
- Ajouter le FavoriteButton dans RecipeCard
- Ajouter le FavoriteButton dans RecipeDetail
- Vérifier que le bouton n'apparaît pas pour les utilisateurs non connectés

**8.4 Créer la page "Mes favoris" (/profile/favorites)**
- Récupérer toutes les recettes mises en favoris par l'utilisateur connecté
- Afficher avec la même grille et les mêmes filtres que /recipes
- Message "Vous n'avez pas encore de favoris" si la liste est vide

### Livrable
Système de favoris fonctionnel avec compteur de likes, page dédiée et état persisté.

---

## Phase 9 — Portions ajustables

### Objectif
Permettre d'ajuster dynamiquement les quantités d'ingrédients en fonction du nombre de portions souhaité.

### Étapes

**9.1 Créer la logique de calcul**
- Créer lib/fractions.ts : fonctions utilitaires pour convertir les décimaux en fractions lisibles (0.5 → ½, 0.333 → ⅓, 0.25 → ¼, etc.)
- Créer la fonction de recalcul : (quantité de base × portions souhaitées) ÷ portions de base

**9.2 Créer le hook useServings**
- hooks/use-servings.ts
- État : nombre de portions actuel (initialisé avec les portions de base de la recette)
- Fonctions : increment, decrement, set
- Calcul dérivé : liste des ingrédients avec quantités recalculées

**9.3 Créer le composant ServingsAdjuster**
- components/recipes/servings-adjuster.tsx
- Affichage du nombre de portions actuel
- Boutons + et − (le bouton − est désactivé si portions = 1)
- Input numérique direct avec validation (min 1)
- Label contextuel (ex : "Pour 4 personnes")

**9.4 Créer le composant IngredientList**
- components/recipes/ingredient-list.tsx
- Reçoit la liste des ingrédients avec les quantités déjà recalculées
- Affiche chaque ingrédient avec quantité formatée en fraction si pertinent + unité + nom
- Mise en évidence visuelle si les portions ont été modifiées par rapport aux portions de base

**9.5 Intégrer dans la page détail**
- La page détail passe en composant Client pour gérer l'état des portions
- ServingsAdjuster et IngredientList partagent l'état via le hook useServings
- Les quantités affichées se mettent à jour instantanément à chaque changement

### Livrable
Ajustement des portions fonctionnel en temps réel, avec affichage des fractions et mise à jour instantanée.

---

## Phase 10 — Impression

### Objectif
Permettre d'imprimer une recette dans une mise en page propre et sans éléments d'interface.

### Étapes

**10.1 Créer la feuille de style d'impression**
- Ajouter des classes CSS utilitaires Tailwind print: pour masquer les éléments non pertinents à l'impression (navbar, sidebar, boutons, filtres, footer)
- Définir la mise en page imprimée : marges, taille de police, saut de page

**10.2 Créer le composant PrintButton**
- components/recipes/print-button.tsx
- Bouton avec icône imprimante
- Déclenche window.print() au clic

**10.3 Définir la mise en page imprimée**
- Logo FamilyCook + titre de la recette en en-tête
- Photo de couverture (limitée en hauteur pour ne pas occuper toute la première page)
- Tableau d'informations clés : catégorie, durée totale, difficulté, nombre de portions ajusté
- Liste des ingrédients avec quantités recalculées
- Étapes numérotées avec saut de page automatique si nécessaire
- Pied de page : familycook.app · Imprimé le [date du jour]

**10.4 Intégrer dans la page détail**
- Ajouter PrintButton dans la barre d'actions de la page détail
- Vérifier le rendu en mode impression sur Chrome, Firefox et Safari

### Livrable
Impression propre et lisible, sans éléments d'interface, avec les quantités ajustées si les portions ont été modifiées.

---

## Phase 11 — Notifications (toasts)

### Objectif
Fournir des retours visuels immédiats à chaque action utilisateur via des toasts Sonner.

### Étapes

**11.1 Installer et configurer Sonner**
- Vérifier que le composant Sonner shadcn est installé
- Ajouter le composant Toaster dans le layout racine (app/layout.tsx)
- Configurer la position (bas à droite), la durée par défaut (4 secondes) et le thème

**11.2 Créer un helper centralisé**
- Créer lib/toast.ts avec des fonctions nommées pour chaque type de notification : toastSuccess, toastError, toastInfo
- Définir tous les messages du tableau du PRD comme constantes

**11.3 Intégrer les toasts dans chaque action**
- Recette créée, modifiée, supprimée
- Favori ajouté ou retiré
- Connexion et déconnexion
- Profil mis à jour, mot de passe modifié
- Session révoquée
- Actions admin
- Toute erreur réseau ou de formulaire

### Livrable
Toasts fonctionnels sur toutes les actions utilisateur. Les erreurs restent affichées jusqu'à fermeture manuelle.

---

## Phase 12 — Panel d'administration

### Objectif
Donner aux administrateurs une interface complète pour gérer les utilisateurs et les recettes.

### Étapes

**12.1 Créer le layout admin**
- app/(admin)/layout.tsx avec sidebar de navigation dédiée
- Vérification du rôle ADMIN dans le layout (double sécurité avec le middleware)
- Liens : Dashboard, Utilisateurs, Recettes

**12.2 Créer la page Dashboard (/admin)**
- 4 cartes de statistiques : total recettes, recettes publiques, total utilisateurs, utilisateurs actifs
- Compteur de recettes ajoutées cette semaine
- Graphique d'inscription des 30 derniers jours (composant recharts ou similar)
- Requêtes Prisma agrégées côté serveur

**12.3 Créer la page Gestion des utilisateurs (/admin/users)**
- Tableau paginé (20 par page) avec colonnes : avatar, nom, email, rôle, date d'inscription, statut (actif/banni)
- Barre de recherche par nom ou email
- Actions par ligne dans un menu déroulant :
  - Changer le rôle USER ↔ ADMIN
  - Désactiver / réactiver le compte
  - Supprimer le compte (modale de confirmation)
- Server Actions pour chaque action admin
- Toast de confirmation sur chaque action

**12.4 Créer la page Gestion des recettes (/admin/recipes)**
- Tableau paginé avec colonnes : photo miniature, titre, auteur, catégorie, visibilité, date, likes
- Filtres : par utilisateur (select), par catégorie, par visibilité
- Actions par ligne :
  - Changer la visibilité (publique ↔ privée)
  - Supprimer la recette (modale de confirmation)
- Server Actions pour chaque action admin
- Toast de confirmation sur chaque action

### Livrable
Panel admin fonctionnel. Les admins peuvent gérer utilisateurs et recettes depuis une interface dédiée.

---

## Phase 13 — Profil utilisateur

### Objectif
Permettre à chaque utilisateur de gérer son compte, ses préférences et sa sécurité.

### Étapes

**13.1 Créer le layout profil**
- Onglets ou sidebar de navigation : Mon profil, Paramètres, Sécurité

**13.2 Créer la page Mon profil (/profile)**
- Affichage de l'avatar, nom, email, date d'inscription
- Liste de toutes les recettes de l'utilisateur (même grille que /recipes)
- Compteur : X recettes · Y favoris

**13.3 Créer la page Paramètres (/profile/settings)**
- Formulaire de modification du nom d'affichage
- Upload et modification de l'avatar
- Modification de l'email (avec envoi d'un email de re-vérification)
- Section "Danger zone" : suppression du compte (modale de confirmation + saisie mot de passe)

**13.4 Créer la page Sécurité (/profile/security)**
- Modification du mot de passe (ancien mdp requis)
- Section 2FA :
  - Si désactivé : bouton "Activer le 2FA" → affichage QR code + code de secours
  - Si activé : bouton "Désactiver le 2FA" avec confirmation
- Liste des sessions actives : appareil, date, adresse IP, badge "Session actuelle"
- Bouton "Révoquer" par session
- Bouton "Révoquer toutes les autres sessions"

### Livrable
Gestion complète du profil. L'utilisateur peut modifier ses informations, activer le 2FA et gérer ses sessions.

---

## Phase 14 — Déploiement Vercel

### Objectif
Déployer FamilyCook en production sur Vercel, connecté à Neon PostgreSQL et Vercel Blob.

### Étapes

**14.1 Préparer le projet pour la production**
- Vérifier que toutes les variables d'environnement sont dans .env.example
- S'assurer que le build Next.js passe sans erreur (next build)
- Corriger tous les avertissements TypeScript et ESLint

**14.2 Créer le projet Vercel**
- Se connecter à Vercel et créer un nouveau projet
- Connecter le dépôt GitHub
- Vercel détecte automatiquement Next.js

**14.3 Configurer les variables d'environnement sur Vercel**
- Ajouter toutes les variables du .env.example dans les paramètres du projet Vercel
- Distinguer les environnements : Production, Preview, Development
- Ne jamais committer le .env.local

**14.4 Connecter Neon PostgreSQL**
- Utiliser l'intégration Vercel + Neon (marketplace Vercel) ou ajouter manuellement l'URL
- Vérifier que DATABASE_URL est correctement configurée en production

**14.5 Configurer Vercel Blob**
- Créer le store Vercel Blob depuis le dashboard
- Lier le store au projet Vercel
- Le token BLOB_READ_WRITE_TOKEN est automatiquement ajouté aux variables d'environnement

**14.6 Configurer le domaine**
- Utiliser le domaine Vercel par défaut (familycook.vercel.app) ou configurer un domaine personnalisé
- Mettre à jour BETTER_AUTH_URL et NEXT_PUBLIC_APP_URL avec l'URL de production
- Mettre à jour les URLs de redirection autorisées dans Google Cloud Console

**14.7 Appliquer les migrations en production**
- Lancer la migration Prisma sur la base Neon de production
- Optionnel : lancer le seed pour avoir des données de démonstration

**14.8 Vérifier le déploiement**
- Tester l'inscription et la connexion en production
- Vérifier la réception des emails
- Tester l'upload d'une image
- Vérifier le panel admin
- Tester sur mobile

**14.9 Configurer les déploiements automatiques**
- Chaque push sur la branche main déclenche un déploiement en production
- Chaque pull request génère un déploiement de prévisualisation (preview URL)

### Livrable
FamilyCook est en ligne, fonctionnel, sécurisé et avec des déploiements automatiques configurés.

---

## Récapitulatif des dépendances npm

### Dépendances principales

| Package | Usage |
|---------|-------|
| next | Framework principal |
| react / react-dom | Bibliothèque UI |
| typescript | Typage statique |
| tailwindcss | Styles |
| @shadcn/ui | Composants UI |
| sonner | Toasts / notifications |
| prisma / @prisma/client | ORM + client base de données |
| better-auth | Authentification |
| @vercel/blob | Stockage images |
| nodemailer | Envoi d'emails |
| @react-email/components | Templates emails |
| react-email | Prévisualisation emails |
| sharp | Traitement d'images |
| zod | Validation des données |
| react-hook-form | Gestion des formulaires |
| @hookform/resolvers | Intégration Zod + react-hook-form |
| next-themes | Mode sombre / clair |
| lucide-react | Icônes |

### Dépendances de développement

| Package | Usage |
|---------|-------|
| @types/node | Types Node.js |
| @types/nodemailer | Types Nodemailer |
| eslint / eslint-config-next | Linting |
| prettier | Formatage du code |

---

## Ordre de développement recommandé

1. Phase 1 — Initialisation (½ journée)
2. Phase 2 — Base de données (½ journée)
3. Phase 3 — Authentification (2 jours)
4. Phase 5 — Recettes CRUD sans images (2 jours)
5. Phase 6 — Upload d'images (1 jour)
6. Phase 4 — Page d'accueil publique (1 jour)
7. Phase 11 — Notifications toasts (½ journée)
8. Phase 8 — Favoris (½ journée)
9. Phase 7 — Recherche et filtres (1 jour)
10. Phase 9 — Portions ajustables (½ journée)
11. Phase 10 — Impression (½ journée)
12. Phase 13 — Profil utilisateur (1 jour)
13. Phase 12 — Panel admin (1 jour)
14. Phase 14 — Déploiement (½ journée)

**Estimation totale : environ 12 à 13 jours de développement**
