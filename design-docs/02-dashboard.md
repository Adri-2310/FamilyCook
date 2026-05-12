# 📊 Dashboard Utilisateur

## Description

Le dashboard est la page d'accueil des utilisateurs connectés. C'est un hub personnalisé qui affiche les actions rapides, un récapitulatif des statistiques de l'utilisateur et du contenu intelligent (recettes trending, suggestions).

**Statut**: Connecté  
**URL**: `/user/dashboard`  
**Authentification**: ✅ Oui  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Accueil personnalisé** : Nom, avatar, et statistiques de l'utilisateur visibles immédiatement
- 🎯 **Actions rapides** : Bouton prominent pour créer une recette
- 🎯 **Contenu intelligent** : Suggestions, trending, inspirations
- 🎯 **Navigation claire** : Structure de menu moderne et accessible
- 🎯 **Engagement** : Montrer la progression et les stats de l'utilisateur

---

## Architecture Navbar

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

Menu "Recettes" (dropdown):
├── 📝 Mes recettes
└── 👥 Recettes partagées

Menu Utilisateur (dropdown):
├── 📊 Tableau de bord (current)
├── 👤 Profil
├── ⚙️  Paramètres
├── 📧 Contact
├── 🛡️  Admin (si admin)
└── 🚪 Déconnexion
```

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]  [Favoris]   Jean [☰]    │
└─────────────────────────────────────────────────────────────┘

┌─ HEADER UTILISATEUR ──────────────────────────────────────┐
│                                                           │
│            👤                                             │
│          (Avatar                                          │
│           large)                                          │
│                                                           │
│  Jean Dupont                                              │
│  Bienvenue Jean!                                          │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ SECTION QUICK STATS ────────────────────────────────────┐
│                                                           │
│  📊 Votre activité                                       │
│                                                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   📝       │  │   ⭐       │  │   👥       │        │
│  │  4 rct     │  │  12 fav    │  │  2 public  │        │
│  │créées      │  │sauvegardés │  │partagées   │        │
│  └────────────┘  └────────────┘  └────────────┘        │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ SECTION INSPIRATION ────────────────────────────────────┐
│                                                           │
│  📈 Tendances cette semaine                              │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │          │  │          │  │          │              │
│  │  IMAGE   │  │  IMAGE   │  │  IMAGE   │              │
│  │          │  │          │  │          │              │
│  ├──────────┤  ├──────────┤  ├──────────┤              │
│  │ Recette  │  │ Recette  │  │ Recette  │              │
│  │ Trending │  │ Trending │  │ Trending │              │
│  │par User  │  │par User  │  │par User  │              │
│  │❤️ 45     │  │❤️ 38     │  │❤️ 23     │              │
│  │          │  │          │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  [Voir toutes >]                                        │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ SECTION RECETTES RÉCENTES ──────────────────────────────┐
│                                                           │
│  Vos recettes récentes                                   │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │          │  │          │  │          │              │
│  │  IMAGE   │  │  IMAGE   │  │  IMAGE   │              │
│  │          │  │          │  │          │              │
│  ├──────────┤  ├──────────┤  ├──────────┤              │
│  │ Titre 1  │  │ Titre 2  │  │ Titre 3  │              │
│  │Modifiée  │  │Modifiée  │  │Modifiée  │              │
│  │il y a 2j │  │il y a 5j │  │il y a 1s │              │
│  │          │  │          │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  [Voir tout >]                                          │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ FOOTER ────────────────────────────────────────────────┐
│ © 2026 FamilyCook | À propos | Contact | Mentions légal │
└─────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Layout Structure

```
Header Utilisateur:
├── Avatar large (w-20 h-20 centré)
├── Nom complet (centered)
└── Message: "Bienvenue [Nom]" (text-muted-foreground)

Grille de contenu (order):
├── 1. Section Stats Quick (3 métriques)
├── 2. Section Tendances (max 3 cartes)
└── 3. Section Recettes Récentes (max 3 cartes)
```

### Couleurs

```
Header utilisateur:
- Background: transparent ou bg-muted/10 subtle
- Avatar: ring-primary ring-2
- Nom: text-2xl font-bold
- Message: text-sm text-muted-foreground

Stats Cards:
- Border: border-border
- Background: bg-card
- Icon: text-primary/80
- Number: text-xl font-bold
- Label: text-sm text-muted-foreground

Recipe Cards (Trending & Récentes):
- Même style que page d'accueil
- Hover: shadow-lg scale-105 sur image
```

### Composants

```
Header Block:
├── Avatar Image (Next.js Image, w-20 h-20 centered)
├── Typography
│   ├── h1: Nom utilisateur (text-center)
│   └── p: "Bienvenue [Nom]!" (text-center, muted)
└── (Pas de CTA - créer via navbar)

Stats Grid Section:
├── Title (optionnel ou hidden)
├── Stat Card × 3 (grid-cols-3)
│   ├── Icon
│   ├── Number
│   └── Label

Trending Section:
├── Title "📈 Tendances cette semaine"
├── RecipeCardClient × max 3 (grid-cols-3)
└── [Voir toutes >] link

Recent Cards Section:
├── Title "Vos recettes récentes"
├── RecipeCardClient × max 3 (grid-cols-3)
└── [Voir tout >] link
```

### Interactions

```
Avatar Menu Hover:
- Image: grayscale 0% → 100% on hover
- Border: normal → primary color ring

Quick Action Buttons:
- Hover: bg-muted shadow-sm scale-105
- Active: bg-primary text-primary-foreground
- Click: smooth navigation

Recipe Cards:
- Same as home page
- Hover: shadow-lg + scale-105 on image
- Click: navigate to recipe detail

Stats Cards:
- Hover: shadow-md scale-102
- Click: navigate to relevant section
```

### Responsive

```
Mobile (< 768px):
- Header: Avatar small (w-12), stack layout
- Actions: Single row scrollable horizontally
- Cards: grid-cols-1
- Stats: Vertical stack or carousel

Tablet (768px - 1024px):
- Header: Normal size
- Actions: 2 per row
- Cards: grid-cols-2
- Stats: 3 in row if space

Desktop (> 1024px):
- Full layout
- Actions: 4 in row
- Cards: Full width
- Stats: 3 in row
```

---

## Navbar Structure Détaillée

### Desktop

```
┌────────────────────────────────────────────────┐
│ 🍳 Logo  [≡ Recettes ▼]  [Favoris]  User [☰] │
└────────────────────────────────────────────────┘

Recettes Dropdown:
- 📊 Tableau de bord (current)
- 📝 Mes recettes
- 👥 Recettes partagées

User Dropdown:
- 👤 Profil
- ⚙️  Paramètres
- 📧 Contact
- 🛡️  Admin (conditional)
- 🚪 Déconnexion
```

### Mobile

```
┌───────────────────────────────────────────────┐
│ 🍳 Logo           User [☰] [☰]              │
└───────────────────────────────────────────────┘

☰ Recettes:
├── Tableau de bord
├── Mes recettes
└── Partagées

☰ Utilisateur:
├── Profil
├── Settings
├── Contact
├── Admin (if)
└── Logout
```

---

## Notes de développement

### API utilisée

```typescript
// User data
GET /api/user/profile
Response: {
  name: string,
  email: string,
  image: string,
  recipeCount: number,
  favoriteCount: number,
  publicRecipeCount: number
}

// Recent recipes
GET /api/recipes/my?limit=3&sort=recent
Response: Recipe[]

// Trending recipes
GET /api/recipes/trending?limit=3
Response: Recipe[]
```

### Données dynamiques

```
Avatar: user.image
Nom: user.name
Stats: 
  - recipeCount
  - favoriteCount
  - publicRecipeCount
```

### Fichiers impliqués

```
app/user/dashboard/page.tsx (Server component)
app/user/layout.tsx (Layout avec navbar)
components/app-navbar.tsx (Refactored navbar)
components/recipes/recipe-card-client.tsx
components/footer.tsx
```

### Considérations

1. **Performance**:
   - Cache les données utilisateur
   - Lazy load les sections
   - Image optimization

2. **Accessibilité**:
   - Focus states sur dropdowns
   - Aria-expanded pour menus
   - Tab navigation

3. **Mobile**:
   - Menus hamburger responsifs
   - Tap targets 44px min
   - Vertical layout

---

## Changements majeurs (vs code actuel)

```diff
- Navbar classique simple
+ Navbar réorganisée avec menus
- Pas de header utilisateur
+ Header avec avatar + stats
- Pas de dashboard custom
+ Dashboard personnalisé avec actions rapides
- Footer minimaliste
+ Footer avec contact
```

---

## Checklist d'implémentation

### Navbar (Nouveau)

- [ ] Réorganiser structure navbar
- [ ] Menu "Recettes" (dropdown)
  - [ ] Mes recettes
  - [ ] Recettes partagées
- [ ] Menu "Favoris" (lien direct)
- [ ] Menu Utilisateur (dropdown)
  - [ ] Tableau de bord (current)
  - [ ] Profil
  - [ ] Settings
  - [ ] Contact
  - [ ] Admin link (conditional)
  - [ ] Logout
- [ ] Responsive burger menu (mobile)
- [ ] Dropdown animations

### Dashboard Content

- [ ] Header utilisateur (centré)
  - [ ] Avatar large
  - [ ] Nom
  - [ ] Message "Bienvenue [Nom]"
- [ ] Section Stats (3 cartes)
  - [ ] Nombre recettes
  - [ ] Nombre favoris
  - [ ] Nombre recettes publiques
- [ ] Section Tendances
  - [ ] Fetch trending recipes
  - [ ] RecipeCardClient × 3
  - [ ] [Voir toutes >] link
- [ ] Section Recettes Récentes
  - [ ] Fetch recent recipes
  - [ ] RecipeCardClient × 3
  - [ ] [Voir tout >] link
- [ ] Responsive layout (mobile/tablet)
- [ ] Animations smooth

### Footer

- [ ] Ajouter lien "Contact"
- [ ] Ajouter liens "À propos", "Mentions légales"
- [ ] Style cohérent avec navbar

---

**Créé le**: 2026-05-12  
**Status**: 📝 À concevoir en détail  
**Estimé**: 6-8 heures (avec navbar refactor)  
**Dépendances**: Page contact, refactor navbar  
