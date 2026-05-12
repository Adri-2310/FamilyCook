# 👥 Profil Public Utilisateur

## Description

La page de profil public affiche les recettes publiques d'un membre et leurs informations de base. C'est un point d'entrée pour découvrir les contenus partagés par d'autres membres de la communauté et explorer leur catalogue de recettes. Accessible uniquement pour les utilisateurs connectés.

**Statut**: Privé (communauté connectée)  
**URL**: `/user/profile/[userId]`  
**Authentification**: ✅ Oui (required)  
**Responsive**: ✅ Mobile-first

⚠️ **Note**: Le profil public d'un utilisateur n'est visible que pour les utilisateurs connectés de la communauté.

---

## Objectifs UX

- 🎯 **Découverte** : Voir les recettes d'un membre particulier
- 🎯 **Confiance** : Informations claires sur l'auteur
- 🎯 **Navigation** : Accès facile depuis recettes partagées/détail
- 🎯 **Engagement** : Parcourir le catalogue d'un membre
- 🎯 **Communauté** : Connecter les membres entre eux
- 🎯 **Clarté** : Distinction avec profil PRIVÉ (09-profil.md)

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Quelles infos du profil afficher?** | Nom, avatar, date inscription, comptes recettes |
| **Recettes privées visibles?** | Non, uniquement recettes PUBLIC |
| **Bio/description?** | Non pour MVP (garder simple) |
| **Statistiques (avg rating)?** | Non pour MVP (garder simple) |
| **Pagination?** | Oui, 12 par page comme les autres grilles |

---

## Maquette ASCII

### Pas trouvé / Erreur

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    [Login]   │
└─────────────────────────────────────────────────────────────┘

┌─ ERROR STATE ───────────────────────────────────────────────┐
│                                                             │
│                    ⚠️  Utilisateur non trouvé              │
│                                                             │
│  L'utilisateur que vous cherchez n'existe pas ou           │
│  a supprimé son compte.                                    │
│                                                             │
│  [← Retour à l'accueil]  [Voir recettes populaires]       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Profil Trouvé

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    [Login]   │
└─────────────────────────────────────────────────────────────┘

┌─ HEADER PROFIL ─────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐                                          │
│  │              │  Jean Dupont                             │
│  │   👤Avatar   │  Membre depuis mai 2024                 │
│  │              │                                          │
│  └──────────────┘  3 recettes publiques                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ RECETTES PUBLIQUES ──────────────────────────────────────┐
│                                                           │
│  📝 3 recettes publiques                                  │
│                                                           │
│  Grille 3 colonnes (responsive: 1 mobile, 2 tablet)      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────┐│
│  │ 🖼️             │  │ 🖼️             │  │ 🖼️      ││
│  │ Coq au vin      │  │ Tarte Tatin    │  │ Crème... ││
│  │                │  │                │  │         ││
│  │ ⭐⭐⭐⭐⭐        │  │ ⭐⭐⭐⭐         │  │ ⭐⭐⭐⭐ ││
│  │ (25 ratings)   │  │ (8 ratings)    │  │ (3 r.)  ││
│  │                │  │                │  │         ││
│  │ 🕐 Publié      │  │ 🕐 Publié      │  │ Publié  ││
│  │ 2026-05-01     │  │ 2026-04-15     │  │ le 30/4 ││
│  │                │  │                │  │         ││
│  │ [Voir]         │  │ [Voir]         │  │ [Voir]  ││
│  │ [❤️ Favori]    │  │ [♡ Ajouter]    │  │ [♡ A.]  ││
│  └─────────────────┘  └─────────────────┘  └──────────┘│
│                                                           │
│  [< Précédent]  1  2  [Suivant >]                       │
│                                                           │
└─────────────────────────────────────────────────────────────┘

┌─ EMPTY STATE (0 recettes publiques) ────────────────────┐
│                                                         │
│              🔒 Aucune recette publique               │
│                                                         │
│  Jean Dupont n'a pas encore partagé de recettes     │
│  publiques.                                            │
│                                                         │
│  [Retour aux recettes populaires]                    │
│                                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Layout & Structure

```
Breadcrumb/Back:
└── [← Retour] ou [Recettes populaires]

Profile Header Section:
├── Avatar (large, circular)
├── User info:
│   ├── name (h1)
│   ├── "Membre depuis [Mois Année]"
│   └── "[X] recettes publiques"
└── Spacing: py-12

Recipes Section:
├── Header: "📝 X recettes publiques"
├── Grid: 3 colonnes (responsive)
├── Recipe Cards (standard recipe card)
└── Pagination
```

### Profile Header

```typescript
Profile Header Component:
├── Avatar:
│   ├── Size: w-24 h-24 (96px)
│   ├── Border-radius: rounded-full
│   ├── Border: border-2 border-border
│   └── Fallback: User initials if no avatar
│
├── User Info:
│   ├── Name: text-3xl font-bold
│   ├── Member since: text-sm text-muted-foreground
│   │   Format: "Membre depuis [Mai 2024]"
│   └── Recipe count: text-base font-medium
│       "[X] recettes publiques"
│
├── Layout: flex (col on mobile, row on desktop)
└── Gap: gap-6
```

### Recipe Card (Réutilisé)

```typescript
Standard RecipeCard (from 05-recettes-partagees.md):
├── Image
├── Title
├── Difficulty badge
├── Rating (average + count)
├── Published date
├── [Voir] button (primary)
└── [♡ Ajouter/Favori] button (secondary)

Favorite toggle:
├── If user NOT logged in:
│   └─ Redirect to /auth/login on click
├── If user logged in:
│   └─ Toggle favorite (fill/unfill heart)
```

### Empty States

```
Aucun utilisateur trouvé:
├── Icon: ⚠️
├── Heading: "Utilisateur non trouvé"
├── Text: "L'utilisateur n'existe pas ou a supprimé son compte"
└── Actions:
    ├── [← Retour à l'accueil]
    └── [Voir recettes populaires]

Utilisateur existe mais 0 recettes publiques:
├── Icon: 🔒
├── Heading: "Aucune recette publique"
├── Text: "[Name] n'a pas encore partagé de recettes publiques"
└── Action: [Retour aux recettes populaires]
```

### Couleurs & Style

```
Header:
- Background: bg-muted/50
- Padding: py-12 px-4
- Avatar border: border-border

Recipe cards:
- Standard (see 05-recettes-partagees.md)

Empty state:
- Icon: text-muted-foreground
- Text: text-center text-muted-foreground
```

### Interactions

```
Clic avatar/nom:
├── Rien (page statique du profil)
└─ (future: copier email, envoyer message, etc.)

Clic [Voir] sur recette:
├── Navigate: /recipe/shared/show/[recipeId]
└── Affiche détail de la recette

Clic [♡ Ajouter/Favori]:
├── Si non connecté: Redirect /auth/login
├── Si connecté:
│   ├── POST /api/recipes/[id]/favorite
│   ├── Toggle heart (fill/unfill)
│   └─ Show toast "Ajouté aux favoris"

Pagination:
├── Update URL: ?page=2
├── Scroll to top
└─ Reload recipes

Back button:
├── Navigate back (history)
├── Or: /recipe/shared (por défaut)
```

### Responsive

```
Mobile (< 768px):
- Header: Column layout, centered
- Avatar: w-20 h-20
- Text: centered
- Grid: 1 colonne (recipes)

Tablet (768px - 1024px):
- Header: Row layout
- Avatar: w-24 h-24
- Grid: 2 colonnes

Desktop (> 1024px):
- Header: Row layout, spacious
- Avatar: w-24 h-24
- Grid: 3 colonnes
```

---

## Notes de développement

### API utilisée

```typescript
// Récupérer le profil public d'un utilisateur
GET /api/user/[userId]
Response: {
  id, name, avatar, createdAt
}
Code: 200 | 404 (if not found)

// Récupérer les recettes publiques d'un utilisateur
GET /api/recipes?authorId=[userId]&visibility=PUBLIC&page=1&limit=12
Response: {
  recipes: [{
    id, title, description, category, difficulty,
    coverImageUrl,
    author: {name, avatar},
    rating: {average, count},
    favoriteCount,
    createdAt
  }],
  total, page, totalPages
}

// Ajouter en favori
POST /api/recipes/[id]/favorite
Auth: ✅
Response: {favorited: boolean}
```

### Fichiers impliqués

```
app/(public)/user/profile/[userId]/page.tsx
components/user/
  ├── public-profile-header.tsx
  └── user-recipes-grid.tsx
api/user/[userId] (GET)
api/recipes (GET with filters)
```

### Considérations

1. **Sécurité**:
   - Vérifier que l'utilisateur existe
   - Ne pas exposer infos privées
   - Rate limit les requêtes de profil

2. **Performance**:
   - Cache le profil (5 min)
   - Lazy load les images
   - Paginer les recettes

3. **User deleted**:
   - Si compte supprimé → 404 page
   - Avec "Retour à l'accueil" link

4. **Private vs Public profile**:
   - Cette page: /user/profile/[userId] (PUBLIC)
   - 09-profil.md: /user/profile (PRIVATE, own)
   - Distinction claire dans les URLs

5. **Not authenticated**:
   - Peut voir profil public sans login
   - Favorite button redirects à /auth/login

---

## Checklist d'implémentation

### Page Structure
- [ ] Create /user/profile/[userId] route
- [ ] Fetch user profile by ID
- [ ] Handle 404 (user not found)
- [ ] Fetch user's public recipes

### Profile Header
- [ ] Display avatar (with fallback)
- [ ] Display user name
- [ ] Display member since date
- [ ] Display recipe count
- [ ] Responsive layout

### Recipes Grid
- [ ] Fetch public recipes for user
- [ ] Display recipe cards
- [ ] Implement pagination
- [ ] Handle empty state (0 recipes)

### Empty States
- [ ] User not found (404)
- [ ] User has 0 public recipes
- [ ] Network error handling

### Favorite Button
- [ ] Check if user logged in
- [ ] Redirect to login if not
- [ ] Toggle favorite state
- [ ] Show toast feedback
- [ ] Update heart icon

### Responsive Design
- [ ] Mobile: 1 column grid
- [ ] Tablet: 2 columns
- [ ] Desktop: 3 columns
- [ ] Test all sizes

### Edge Cases
- [ ] User deleted account
- [ ] User has many recipes (paginate)
- [ ] Slow network (loading state)
- [ ] Concurrent favorite toggle
- [ ] User logs in mid-page

### Accessibility
- [ ] Focus management
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader friendly
- [ ] Skip to content link

---

## Dépendances

- ✅ API endpoints: `/api/user/[userId]`, `/api/recipes?authorId=...`
- ✅ DATA-MODELS.md: User model (public fields)
- ✅ 05-recettes-partagees.md: RecipeCard component
- ✅ 07-detail-recette.md: Navigate from recipe detail

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Priorité**: 🟠 HAUTE (engagement communautaire)  
**Estimé**: 3-4 heures (page + header + pagination)  
**Dépendances**: API endpoints, RecipeCard component
