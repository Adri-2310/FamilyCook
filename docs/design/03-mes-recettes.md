# 📝 Mes Recettes

## Description

La page "Mes recettes" est le centre de gestion des recettes créées par l'utilisateur. C'est ici qu'il peut consulter, éditer, supprimer et gérer ses créations culinaires.

**Statut**: Connecté  
**URL**: `/recipe/my`  
**Authentification**: ✅ Oui  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Vue d'ensemble** : Afficher toutes ses recettes en un coup d'œil
- 🎯 **Découvrir ses créations** : Organiser et explorer son portfolio
- 🎯 **Actions rapides** : Éditer/supprimer sans naviguer
- 🎯 **Filtrage intelligent** : Trouver rapidement ce qu'on cherche
- 🎯 **Statistiques** : Voir la performance de chaque recette

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Affichage** | Grille (grid-cols-3) |
| **Actions** | Éditer, Supprimer, Voir stats |
| **Filtres** | Catégorie, Visibilité, Trier |
| **Placement actions** | Bottom-right corner (icones) |
| **Placement filtres** | Barre en haut avant la grille |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  Mes recettes                                               │
│  Gérez et partagez vos recettes                            │
│                                                             │
│  [+ Créer une recette]                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FILTRES BAR ───────────────────────────────────────────────┐
│                                                             │
│  [🔍 Chercher]  [Catégorie ▼]  [Visibilité ▼]  [Trier ▼]  │
│                                                             │
│  4 recettes trouvées                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ GRILLE DE RECETTES ──────────────────────────────────────┐
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │              │  │              │  │              │   │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │   │
│  │   (16:9)     │  │   (16:9)     │  │   (16:9)     │   │
│  │              │  │              │  │              │   │
│  │          [⌛][📊][⋮] ◄── icons  │  │              │   │
│  │              │  │    (bottom-   │  │          [⌛][📊]│
│  ├──────────────┤  │     right)    │  ├──────────────┤   │
│  │ Titre        │  │              │  │ Titre        │   │
│  │              │  ├──────────────┤  │              │   │
│  │ Description  │  │ Titre        │  │ Description  │   │
│  │              │  │              │  │              │   │
│  │⏱ 30 min     │  │ Description  │  │⏱ 30 min     │   │
│  │👥 4 pers    │  │              │  │👥 4 pers    │   │
│  │             │  │⏱ 30 min     │  │             │   │
│  │🔒 Privé    │  │👥 4 pers    │  │🔒 Privé    │   │
│  │             │  │             │  │             │   │
│  └──────────────┘  │🌐 Public    │  └──────────────┘   │
│                     │             │                     │
│                     └──────────────┘                     │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │              │  │              │  │              │   │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │   │
│  │              │  │              │  │              │   │
│  │          [⌛] │  │          [⌛][📊] │  │          [⌛][📊]│
│  │              │  │              │  │              │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ Titre        │  │ Titre        │  │ Titre        │   │
│  │ Description  │  │ Description  │  │ Description  │   │
│  │⏱ 30 min     │  │⏱ 30 min     │  │⏱ 30 min     │   │
│  │👥 4 pers    │  │👥 4 pers    │  │👥 4 pers    │   │
│  │🌐 Public    │  │🌐 Public    │  │🌐 Public    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ PAGINATION ──────────────────────────────────────────────┐
│                                                           │
│  [< Précédent]  1  2  3  [Suivant >]                    │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ FOOTER ──────────────────────────────────────────────────┐
│ © 2026 FamilyCook | À propos | Contact | Mentions légal  │
└───────────────────────────────────────────────────────────┘
```

**Legend**:
- `⌛` = Éditer (pencil icon)
- `📊` = Voir statistiques
- `⋮` = Menu 3-points (si nécessaire)
- `🔒` = Privé / `🌐` = Public

---

## Spécifications

### Layout Structure

```
Header Section:
├── h1: "Mes recettes"
├── p: "Gérez et partagez vos recettes"
└── Button: [+ Créer une recette] (primary)

Filters Bar:
├── Input: Recherche (placeholder: "Chercher...")
├── Select: Catégorie (Tous, Apéritif, Plat, Dessert...)
├── Select: Visibilité (Tous, Public, Privé)
├── Select: Trier par (Récentes, Titre A-Z, Populaires)
└── Text: "X recettes trouvées"

Recipe Grid:
├── grid-cols-1 md:grid-cols-2 lg:grid-cols-3
├── gap-6
└── RecipeCardWithActions × N

Pagination (si > 12 recettes):
├── [< Précédent]
├── Numéros pages
└── [Suivant >]
```

### Couleurs

```
Header:
- h1: text-4xl font-bold
- p: text-lg text-muted-foreground
- Button: primary (bg-primary text-primary-foreground)

Filters Bar:
- Background: bg-muted/30
- Input: variant="outline"
- Select: variant="outline"
- Text: text-sm text-muted-foreground

Recipe Cards:
- Même style que dashboard/home
- Icons bottom-right: text-muted-foreground hover:text-primary
- Badge (Public/Privé): text-xs font-semibold
  - Public: bg-blue-100 text-blue-900
  - Privé: bg-gray-100 text-gray-900
```

### Composants

```
Page Header:
├── h1: "Mes recettes"
├── p: Subtitle
└── Button: [+ Créer une recette]

Filters Section:
├── SearchInput
├── CategorySelect
├── VisibilitySelect
├── SortBySelect
└── ResultCount: "4 recettes trouvées"

Recipe Card Custom:
├── RecipeCardClient (base)
├── Actions Bottom-Right:
│   ├── Icon Button: Éditer (pencil)
│   ├── Icon Button: Stats (chart)
│   └── Menu: Supprimer (danger)
├── Badge: Visibilité (Public/Privé)
└── Infos: Temps, servings, category
```

### Interactions

```
Actions Icons (bottom-right):
- Hover: shadow-md, color-primary
- Click Éditer: Navigate to /recipe/my/edit/[id]
- Click Stats: Open modal/drawer
- Click Supprimer: Confirm dialog → Delete

Filters:
- Change filter: reload list avec ?search=x&category=y
- Debounce search: 300ms

Cards:
- Click card: Navigate to /recipe/my/show/[id]
- Hover image: scale-105
- Hover card: shadow-lg
```

### Responsive

```
Mobile (< 768px):
- Header: Stack layout
- Filters: Single column (wrap)
- Grid: grid-cols-1
- Actions: All visible (no need to hover)

Tablet (768px - 1024px):
- Filters: 2 per row
- Grid: grid-cols-2
- Actions: Visible on hover or always

Desktop (> 1024px):
- Filters: 4 in row
- Grid: grid-cols-3
- Actions: Bottom-right overlay
```

---

## Notes de développement

### API utilisée

```typescript
// List user's recipes
GET /api/recipes/my?search=x&category=y&visibility=z&sort=w&page=1
Response: {
  recipes: Recipe[],
  total: number,
  page: number,
  totalPages: number
}

// Delete recipe
DELETE /api/recipes/[id]

// Get recipe stats
GET /api/recipes/[id]/stats
Response: {
  views: number,
  favorites: number,
  shares: number
}
```

### Données dynamiques

```
Filters:
- search: URLSearchParam
- category: URLSearchParam
- visibility: URLSearchParam
- sort: URLSearchParam
- page: URLSearchParam

Recipe data:
- image, title, description
- prepTime, cookTime
- category
- visibility (PUBLIC/PRIVATE)
```

### Fichiers impliqués

```
app/recipe/my/page.tsx (Server component)
app/recipe/layout.tsx
components/recipes/recipe-card-with-actions.tsx (NEW)
components/recipes/filters-bar.tsx
api/recipes/my (GET, DELETE)
```

### Considérations

1. **Performance**:
   - Cache les listes
   - Lazy load pagination
   - Optimiser images

2. **UX**:
   - Confirmation avant suppression
   - Toast de succès/erreur
   - Loading states

3. **Accessibilité**:
   - ARIA labels sur icons
   - Keyboard navigation
   - Focus management

---

## Détails des Actions

### Éditer
```
Icon: ✏️ (edit-2)
Action: Navigate to /recipe/my/edit/[id]
Feedback: None (direct navigation)
```

### Voir Statistiques
```
Icon: 📊 (bar-chart-2)
Action: Open modal/drawer with:
  - Vues totales
  - Favoris totaux
  - Partagées combien de fois
  - Date de création
  - Dernière modification
Feedback: Modal open animation
```

### Supprimer
```
Icon: 🗑️ (trash-2)
Action: Open confirm dialog
  - Title: "Supprimer cette recette ?"
  - Message: "Cette action est irréversible"
  - Buttons: [Annuler] [Supprimer]
Feedback: Toast "Recette supprimée"
Navigate: Stay on page, remove card avec animation
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Page header avec titre et CTA
- [ ] Fetcher les recettes utilisateur
- [ ] Afficher nombre total de recettes

### Filters Bar

- [ ] Search input (debounced)
- [ ] Category select
- [ ] Visibility select (Public/Privé)
- [ ] Sort by select (Récentes, Titre, Popularité)
- [ ] URL params pour chaque filtre
- [ ] Display "X recettes trouvées"

### Recipe Grid

- [ ] RecipeCardClient component
- [ ] Bottom-right actions icons
- [ ] Visibility badge
- [ ] Grid responsive (1/2/3 cols)
- [ ] Hover animations

### Actions

- [ ] Edit button → navigate to /recipe/my/edit/[id]
- [ ] Stats button → open modal with stats
- [ ] Delete button → confirm dialog → delete

### Modal Stats

- [ ] Modal/drawer component
- [ ] Display: views, favorites, shares, dates
- [ ] Close button

### Pagination

- [ ] Pagination component
- [ ] Previous/Next buttons
- [ ] Page numbers
- [ ] Active page styling

### Edge Cases

- [ ] Empty state (aucune recette)
- [ ] Loading state
- [ ] Error handling
- [ ] No results for filters

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 6-8 heures  
**Dépendances**: API routes (GET, DELETE), filters component  
