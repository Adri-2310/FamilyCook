# ⭐ Mes Favoris

## Description

La page Mes Favoris affiche toutes les recettes que l'utilisateur a marquées comme favorites. C'est une collection personnelle et organisée de recettes aimées.

**Statut**: Connecté  
**URL**: `/recipe/favorites`  
**Authentification**: ✅ Oui  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Accès rapide** : Retrouver ses recettes aimées facilement
- 🎯 **Organisation** : Filtrer et trier sa collection
- 🎯 **Gestion** : Ajouter/retirer rapidement
- 🎯 **Inspiration** : Avoir une liste de recettes préférées
- 🎯 **Utilité** : Consulter ses recettes favorites en cuisine

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Affichage** | Grille (comme Mes Recettes) |
| **Actions** | Retirer des favoris + Trier/Filtrer |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  Mes Favoris                                                │
│  Vos recettes préférées à portée de main                   │
│                                                             │
│  12 recettes sauvegardées                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FILTRES BAR ───────────────────────────────────────────────┐
│                                                             │
│  [🔍 Chercher]  [Catégorie ▼]  [Difficulté ▼]  [Trier ▼] │
│                                                             │
│  12 recettes trouvées                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ GRILLE DE FAVORIS ───────────────────────────────────────┐
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │              │  │              │  │              │   │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │   │
│  │   (16:9)     │  │   (16:9)     │  │   (16:9)     │   │
│  │              │  │              │  │              │   │
│  │      [✕] ◄──┼──┤ Retirer btn  │  │      [✕]    │   │
│  │  (top-right) │  │ (top-right)  │  │ (top-right) │   │
│  │              │  │              │  │              │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ Titre        │  │ Titre        │  │ Titre        │   │
│  │ Recette      │  │ Recette      │  │ Recette      │   │
│  │ par User     │  │ par User     │  │ par User     │   │
│  │              │  │              │  │              │   │
│  │ Description  │  │ Description  │  │ Description  │   │
│  │              │  │              │  │              │   │
│  │⏱ 30 min     │  │⏱ 45 min     │  │⏱ 25 min     │   │
│  │👥 4 pers    │  │👥 6 pers    │  │👥 2 pers    │   │
│  │⭐ Plat      │  │⭐ Dessert    │  │⭐ Apéritif   │   │
│  │             │  │             │  │             │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │   │
│  │      [✕]    │  │      [✕]    │  │      [✕]    │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ Titre        │  │ Titre        │  │ Titre        │   │
│  │ Recette      │  │ Recette      │  │ Recette      │   │
│  │ par User     │  │ par User     │  │ par User     │   │
│  │ Description  │  │ Description  │  │ Description  │   │
│  │⏱ 30 min     │  │⏱ 45 min     │  │⏱ 25 min     │   │
│  │👥 4 pers    │  │👥 6 pers    │  │👥 2 pers    │   │
│  │⭐ Moyen     │  │⭐ Difficile  │  │⭐ Facile     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─ PAGINATION ──────────────────────────────────────────────┐
│                                                           │
│  [< Précédent]  1  2  [Suivant >]                        │
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
├── h1: "Mes Favoris"
├── p: "Vos recettes préférées à portée de main"
└── Favorite count: "X recettes sauvegardées"

Filters Bar:
├── Same as Recettes Partagées
├── Input: Recherche
├── Select: Catégorie
├── Select: Difficulté
├── Select: Trier par
└── Text: "X recettes trouvées"

Recipe Grid:
├── grid-cols-1 md:grid-cols-2 lg:grid-cols-3
├── gap-6
└── FavoriteCard × N (similar to shared recipes)

Pagination:
├── Previous/Next buttons
├── Page numbers
└── Active page styling
```

### Favorite Card

```
Elements:
├── Image + overlay [✕] remove button (top-right)
├── Title
├── Author name
├── Description
├── Time + servings + category
├── Hover effects
└── Click → navigate to recipe detail
```

### Couleurs

```
Header:
- h1: text-4xl font-bold
- Subtitle: text-lg text-muted-foreground
- Count badge: bg-primary/10 text-primary

Remove Button:
- Background: bg-destructive/80 hover:bg-destructive
- Icon: ✕ (or trash icon)
- Always visible (no hover needed)

Cards:
- Same as Recettes Partagées
```

### Composants

```
Page Header:
├── h1: "Mes Favoris"
├── p: Subtitle
└── Badge: "X recettes sauvegardées"

Filters Section:
├── SearchInput
├── CategorySelect
├── DifficultySelect
├── SortBySelect

Favorite Card:
├── Image + remove button overlay
├── Title
├── Author name
├── Description
├── Icons: time, servings, category
└── Click → recipe detail

Pagination:
├── Previous/Next
├── Page numbers
└── Active highlight
```

### Interactions

```
Remove Button (✕):
- Click: Remove from favorites
- Toast: "Retiré des favoris"
- Card animate out (fade + slide)
- Update count in header
- Update favorite icon across app

Filters:
- Same behavior as Recettes Partagées
- Update URL params
- Reload list

Recipe Card:
- Click: Navigate to /recipe/shared/show/[id]
- Hover: shadow-lg + scale

Empty State:
- Message: "Pas encore de recettes favorites"
- CTA: [Explorer les recettes]
- Link to /recipe/shared
```

### Responsive

```
Mobile (< 768px):
- Filters: Vertical stack
- Grid: grid-cols-1
- Cards: Full width
- Remove button: Always visible (top-right)

Tablet (768px - 1024px):
- Filters: 2-3 per row
- Grid: grid-cols-2

Desktop (> 1024px):
- Filters: 4 per row
- Grid: grid-cols-3
- Full layout
```

---

## Notes de développement

### API utilisée

```typescript
// Get user's favorites
GET /api/recipes/favorites?search=x&category=y&difficulty=z&sort=w&page=1
Response: {
  recipes: Recipe[],
  total: number,
  page: number,
  totalPages: number
}

// Remove from favorites
DELETE /api/recipes/[id]/favorite
Response: {success: boolean}
```

### Fichiers impliqués

```
app/recipe/favorites/page.tsx
components/recipes/favorite-card.tsx
components/recipes/favorites-filters.tsx
api/recipes/favorites (GET)
api/recipes/[id]/favorite (DELETE)
```

### Considérations

1. **Performance**:
   - Cache favorites list
   - Lazy load pagination
   - Real-time updates

2. **UX**:
   - Quick remove action
   - Visual feedback (animation)
   - Persist filter state
   - Empty state handling

3. **Synchronization**:
   - Update heart icon across app
   - Keep count accurate
   - Real-time favorite sync
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Page header with favorite count
- [ ] Fetch user favorites
- [ ] Display total count

### Filters Bar

- [ ] Search input (debounced)
- [ ] Category select
- [ ] Difficulty select
- [ ] Sort by select
- [ ] URL params for filters
- [ ] "X recettes trouvées" text

### Grid & Cards

- [ ] FavoriteCard component
- [ ] Image display
- [ ] Title + author
- [ ] Description
- [ ] Icons: time, servings, category
- [ ] Remove button (✕) overlay
- [ ] Remove functionality
- [ ] Toast feedback
- [ ] Card animation out
- [ ] Grid responsive (1/2/3)

### Pagination

- [ ] Pagination component
- [ ] Previous/Next buttons
- [ ] Page numbers
- [ ] Active styling

### Edge Cases

- [ ] Empty state (no favorites)
- [ ] Loading state
- [ ] Error handling
- [ ] No results for filters

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 4-6 heures (similaire à Recettes Partagées)  
**Dépendances**: API routes (GET favorites, DELETE favorite)
