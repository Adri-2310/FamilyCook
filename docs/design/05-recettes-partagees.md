# 👥 Recettes Partagées

## Description

La page Recettes Partagées affiche toutes les recettes publiques partagées par la communauté. Les utilisateurs peuvent explorer, filtrer, ajouter aux favoris et consulter les recettes.

**Statut**: Communauté (connectés uniquement)  
**URL**: `/recipe/shared`  
**Authentification**: ✅ Oui (required)  
**Responsive**: ✅ Mobile-first

⚠️ **Note**: Cette page est privée. Seuls les utilisateurs connectés peuvent découvrir et explorer les recettes de la communauté.

---

## Objectifs UX

- 🎯 **Découverte** : Parcourir les recettes de la communauté
- 🎯 **Filtrage intelligent** : Trouver rapidement ce qu'on cherche
- 🎯 **Engagement** : Ajouter aux favoris, consulter les auteurs
- 🎯 **Inspiration** : Montrer les recettes populaires
- 🎯 **Communauté** : Connecter les utilisateurs entre eux

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Type de page** | Grille avec filtres avancés |
| **Filtres** | Catégorie, Difficulté |
| **Actions** | Favoris + Voir recette |
| **Tri par défaut** | Plus populaires (likes) |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  Recettes Partagées                                         │
│  Découvrez les meilleures recettes de notre communauté    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FILTRES BAR ───────────────────────────────────────────────┐
│                                                             │
│  [🔍 Chercher]  [Catégorie ▼]  [Difficulté ▼]  [Trier ▼] │
│                                                             │
│  1,245 recettes trouvées                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ GRILLE DE RECETTES ──────────────────────────────────────┐
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │              │  │              │  │              │   │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │   │
│  │   (16:9)     │  │   (16:9)     │  │   (16:9)     │   │
│  │              │  │              │  │              │   │
│  │          [❤️]│  │          [❤️]│  │          [❤️]│   │
│  │              │  │              │  │              │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ Titre        │  │ Titre        │  │ Titre        │   │
│  │              │  │              │  │              │   │
│  │ par Jean D.  │  │ par Marie L. │  │ par Pierre H.│   │
│  │              │  │              │  │              │   │
│  │ Description  │  │ Description  │  │ Description  │   │
│  │              │  │              │  │              │   │
│  │⏱ 30 min     │  │⏱ 45 min     │  │⏱ 25 min     │   │
│  │👥 4 pers    │  │👥 6 pers    │  │👥 2 pers    │   │
│  │             │  │             │  │             │   │
│  │⭐ 4.5 (8)  │  │⭐ 4.8 (24)  │  │⭐ 4.2 (5)   │   │
│  │❤️ 24        │  │❤️ 56        │  │❤️ 12        │   │
│  │             │  │             │  │             │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │   │
│  │              │  │              │  │              │   │
│  │          [❤️]│  │          [❤️]│  │          [❤️]│   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ Titre        │  │ Titre        │  │ Titre        │   │
│  │ par User     │  │ par User     │  │ par User     │   │
│  │ Description  │  │ Description  │  │ Description  │   │
│  │⏱ 30 min     │  │⏱ 45 min     │  │⏱ 25 min     │   │
│  │👥 4 pers    │  │👥 6 pers    │  │👥 2 pers    │   │
│  │⭐ 4.5       │  │⭐ 4.8       │  │⭐ 4.2       │   │
│  │❤️ 24        │  │❤️ 56        │  │❤️ 12        │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ PAGINATION ──────────────────────────────────────────────┐
│                                                           │
│  [< Précédent]  1  2  3  4  [Suivant >]                 │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ FOOTER ───────────────────────────────────────────────────┐
│ © 2026 FamilyCook | À propos | Contact | Mentions légal   │
└───────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Layout Structure

```
Page Header:
├── h1: "Recettes Partagées"
├── p: "Découvrez les meilleures recettes de notre communauté"
└── No CTA (voir recette via card)

Filters Bar:
├── Input: Recherche
├── Select: Catégorie (Tous, Apéritif, Plat, Dessert...)
├── Select: Difficulté (Tous, Facile, Moyen, Difficile)
├── Select: Trier par (Populaires, Récentes, Top rated)
└── Text: "X recettes trouvées"

Recipe Grid:
├── grid-cols-1 md:grid-cols-2 lg:grid-cols-3
├── gap-6
└── RecipeCard × N (enhanced with rating + likes)

Pagination:
├── Previous/Next buttons
├── Page numbers
└── Active page highlight
```

### Recipe Card Enhanced

Comparé à "Mes recettes", ajouter:
```
├── Rating: ⭐ 4.5 (8 votes)
├── Favorites count: ❤️ 24
├── Author name: "par Jean Dupont"
└── Heart icon for favoriting (top-right)
```

### Couleurs

```
Header:
- h1: text-4xl font-bold
- p: text-lg text-muted-foreground

Filters:
- Same as Mes recettes

Cards:
- Borders: border-border
- Author: text-sm text-muted-foreground
- Rating: ⭐ text-amber-500
- Favorites: ❤️ text-red-500 (when favorited)

Heart Button:
- Outline: text-muted-foreground hover:text-red-500
- Filled: text-red-500 (when favorited)
```

### Composants

```
Page Header:
├── h1: "Recettes Partagées"
└── p: Subtitle

Filters Section:
├── SearchInput
├── CategorySelect
├── DifficultySelect
├── SortBySelect
└── ResultCount

Recipe Card (Enhanced):
├── Image + overlay heart button
├── Title
├── Author name (clickable → profile)
├── Description
├── Icons: time, servings, difficulty
├── Rating: ⭐ + vote count
├── Favorites count: ❤️ N
└── Click card → navigate to /recipe/shared/show/[id]

Pagination:
├── Previous button
├── Page numbers
├── Next button
└── Active page styling
```

### Interactions

```
Search Filter:
- Debounced input (300ms)
- Update URL params
- Reload list

Category/Difficulty Select:
- Change: Update URL + reload
- Multi-select possible (future)

Sort By:
- Options: Populaires (default), Récentes, Top rated
- Update URL + reload

Heart Button (Favorites):
- Click: Toggle favorite (if connected)
- If not connected: Prompt login
- Icon: outline → filled
- Color: gray → red
- Toast: "Ajouté aux favoris" / "Retiré"

Author Link:
- Click: Navigate to /user/profile/[userId]
- Or show author card (future)

Recipe Card:
- Click: Navigate to /recipe/shared/show/[id]
- Hover: shadow-lg + image scale

Pagination:
- Click page number: Navigate + scroll to top
- Previous/Next: Obvious behavior
```

### Responsive

```
Mobile (< 768px):
- Filters: Vertical stack
- Grid: grid-cols-1
- Cards: Full width
- Heart button: Always visible
- Author name visible

Tablet (768px - 1024px):
- Filters: 2-3 per row
- Grid: grid-cols-2
- Normal cards

Desktop (> 1024px):
- Filters: 4 per row or compact
- Grid: grid-cols-3
- Full layout
```

---

## Notes de développement

### API utilisée

```typescript
// List public recipes
GET /api/recipes/shared?search=x&category=y&difficulty=z&sort=w&page=1
Response: {
  recipes: Recipe[],
  total: number,
  page: number,
  totalPages: number
}

// Toggle favorite
POST /api/recipes/[id]/favorite
Response: {favorited: boolean}

// Get user by ID (for author info)
GET /api/user/[id]
Response: {name, avatar, recipeCount}
```

### Données dynamiques

```
Filters:
- search: URLSearchParam
- category: URLSearchParam
- difficulty: URLSearchParam
- sort: URLSearchParam
- page: URLSearchParam

Recipe display:
- image, title, description, author
- prepTime, cookTime, baseServings
- category, difficulty
- rating, ratingCount
- favoriteCount
```

### Fichiers impliqués

```
app/recipe/shared/page.tsx
components/recipes/shared-filters.tsx
components/recipes/recipe-card-shared.tsx
api/recipes/shared (GET)
api/recipes/[id]/favorite (POST)
```

### Considérations

1. **Performance**:
   - Cache recipes list
   - Lazy load pagination
   - Image optimization
   - Debounce filters

2. **UX**:
   - Preserve filter state
   - Show loading states
   - Error handling
   - Empty state messaging

3. **Accessibilité**:
   - ARIA labels
   - Keyboard navigation
   - Tab index management
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Page header with title
- [ ] Fetch public recipes
- [ ] Display count

### Filters Bar

- [ ] Search input (debounced)
- [ ] Category select
- [ ] Difficulty select
- [ ] Sort by select
- [ ] URL params for all filters
- [ ] "X recettes trouvées" text

### Recipe Grid

- [ ] RecipeCardShared component
- [ ] Image display
- [ ] Title + author name
- [ ] Description
- [ ] Time + servings + difficulty
- [ ] Rating display (⭐)
- [ ] Rating count
- [ ] Favorites count (❤️)
- [ ] Heart button for favorites
- [ ] Grid responsive (1/2/3 cols)
- [ ] Hover animations

### Pagination

- [ ] Pagination component
- [ ] Previous/Next buttons
- [ ] Page numbers
- [ ] Active page styling
- [ ] Click handlers

### Edge Cases

- [ ] Empty state (no recipes)
- [ ] Loading state
- [ ] Error handling
- [ ] No results for filters
- [ ] Login prompt for favorites (if not connected)

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 6-8 heures (similaire à Mes Recettes)  
**Dépendances**: API routes (GET shared, POST favorite)
