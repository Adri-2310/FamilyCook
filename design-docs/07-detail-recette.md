# 👀 Détail Recette

## Description

La page de détail affiche une recette complète avec tous les détails, ingrédients, étapes, et actions. C'est le cœur de la consultation des recettes.

**Statut**: Privé (communauté connectée)  
**URL**: `/recipe/shared/show/[id]` ou `/recipe/my/show/[id]`  
**Authentification**: ✅ Oui (required)  
**Responsive**: ✅ Mobile-first

⚠️ **Note**: Toutes les recettes (partagées ou privées) sont visibles uniquement pour les utilisateurs connectés.

---

## Objectifs UX

- 🎯 **Présentation attrayante** : Image hero + mise en avant des infos clés
- 🎯 **Utilisabilité en cuisine** : Checkboxes pour cocher les ingrédients
- 🎯 **Clarté des étapes** : Format cartes numérotées
- 🎯 **Adaptabilité** : Ajusteur de portions affecte les ingrédients
- 🎯 **Engagement** : Ajouter aux favoris, partager, modifier

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Layout** | Image top full-width + infos grille en bas |
| **Flow** | Infos clés → Ingrédients (ajustables) → Étapes |
| **Ingrédients** | Liste avec checkboxes |
| **Étapes** | Cartes numérotées |
| **Auteur/Stats** | Section distincte |
| **Actions** | Favoris + Modifier (si proprio) |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

┌─ HERO IMAGE (100% width) ──────────────────────────────────┐
│                                                             │
│                      [IMAGE GRANDE]                        │
│                    (16:9 ratio, full)                      │
│                                                             │
│  ┌─ OVERLAY ACTIONS ─────────────────┐                     │
│  │ [❤️ Favoris]  [✏️ Modifier]      │                     │
│  │ (top-right corner)                 │                     │
│  └────────────────────────────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ INFOS CLÉS ───────────────────────────────────────────────┐
│                                                             │
│  Ratatouille                                                │
│  (Plat principal • Moyen)                                  │
│                                                             │
│  [⏱ 50 min]  [👥 4 pers]  [📍 Moyen]                      │
│                                                             │
│  Par Jean Dupont • Publié il y a 2 mois                    │
│                                                             │
│  ⭐ 4.5/5 (12 votes)  ❤️ 45 favoris                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ INGRÉDIENTS ──────────────────────────────────────────────┐
│                                                             │
│  Ingrédients                                                │
│                                                             │
│  Ajuster les portions: [4 pers ▼]                          │
│                                                             │
│  ☐ 200g Farine                                             │
│  ☐ 100g Sucre                                              │
│  ☐ 50g Beurre                                              │
│  ☐ 2 Œufs                                                  │
│  ☐ 1 tasse Lait                                            │
│  ☐ 1 cuillère à café Vanille                               │
│  ☐ 1 pincée Sel                                            │
│                                                             │
│  [✓ Copier la liste]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ ÉTAPES ───────────────────────────────────────────────────┐
│                                                             │
│  Étapes de préparation                                      │
│                                                             │
│  ┌─ ÉTAPE 1 ─────────────────────────────────────┐        │
│  │                                               │        │
│  │  Préparer les ingrédients:                  │        │
│  │  Mélanger la farine et le sucre dans...   │        │
│  │  Ajouter les œufs un par un...            │        │
│  │                                               │        │
│  │  [5 min]  [✓ Fait]                         │        │
│  │                                               │        │
│  └───────────────────────────────────────────────┘        │
│                                                             │
│  ┌─ ÉTAPE 2 ─────────────────────────────────────┐        │
│  │                                               │        │
│  │  Cuisson:                                  │        │
│  │  Verser la pâte dans un moule beurré...   │        │
│  │  Enfourner à 180°C pendant 30 minutes...  │        │
│  │                                               │        │
│  │  [30 min]  [✓ Fait]                        │        │
│  │                                               │        │
│  └───────────────────────────────────────────────┘        │
│                                                             │
│  ┌─ ÉTAPE 3 ─────────────────────────────────────┐        │
│  │                                               │        │
│  │  Finition:                                 │        │
│  │  Laisser refroidir 5 minutes...           │        │
│  │  Décorer avec du sucre glace...           │        │
│  │                                               │        │
│  │  [5 min]  [✓ Fait]                         │        │
│  │                                               │        │
│  └───────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ AUTEUR & INFOS ───────────────────────────────────────────┐
│                                                             │
│  👤 Jean Dupont                                             │
│  Publié le 15 mars 2024                                    │
│                                                             │
│  📊 45 favoris  |  📺 120 vues  |  💬 8 commentaires      │
│                                                             │
│  [👥 Voir les autres recettes de Jean]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ ACTIONS ──────────────────────────────────────────────────┐
│                                                             │
│  [❤️ Ajouter aux favoris]  [🖨️  Imprimer]               │
│  [✏️ Modifier] (si propriétaire)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FOOTER ───────────────────────────────────────────────────┐
│ © 2026 FamilyCook | À propos | Contact | Mentions légal   │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Layout Structure

```
Hero Image Section:
├── Full-width image (16:9 ratio)
├── Overlay actions (top-right)
│   ├── Button: [❤️ Favoris]
│   └── Button: [✏️ Modifier] (if owner)
└── Gradient overlay (dark bottom)

Infos Clés Section:
├── h1: Titre de la recette
├── Badges: Catégorie • Difficulté
├── Icons row: ⏱ temps | 👥 servings | 📍 difficulté
├── Meta: "Par [Auteur] • Publié il y a X"
└── Stats: ⭐ rating | ❤️ favoris

Ingrédients Section:
├── h2: "Ingrédients"
├── Servings adjuster: [4 pers ▼]
├── Ingredient list:
│   ├── Checkbox [] Nom ingrédient (quantité + unité)
│   ├── Quantities update live with servings
│   └── ... (repeat)
└── Button: [✓ Copier la liste]

Étapes Section:
├── h2: "Étapes de préparation"
├── Step Card × N:
│   ├── Step number (big)
│   ├── Step text (rich text)
│   ├── Time estimate: [5 min]
│   └── Checkbox: [✓ Fait]
└── Auto-numbering

Auteur Section:
├── Avatar + Name
├── Publish date
├── Stats: favorites | views | comments (if any)
└── Button: [👥 Voir les recettes de X]

Actions Section:
├── Button: [❤️ Ajouter aux favoris]
├── Button: [🖨️  Imprimer]
└── Button: [✏️ Modifier] (if owner)
```

### Couleurs

```
Hero Image:
- Overlay: gradient dark (rgba(0,0,0,0.3) → 0.6)
- Actions: bg-background/80 backdrop-blur

Infos Clés:
- Title: text-4xl font-bold
- Badges: bg-primary/10 text-primary
- Stats: text-sm text-muted-foreground

Ingrédients:
- Checkboxes: primary color
- Text: normal, strikethrough when checked
- Quantité: updateable, highlight on change

Étapes:
- Card: border-border bg-card
- Number: text-2xl font-bold text-primary
- Time: text-sm text-muted-foreground
- Checkbox: primary
- "Fait" state: text-muted opacity-50

Auteur Section:
- Avatar: ring-primary ring-2
- Button: variant="outline"
```

### Interactions

```
Favoris Button:
- Click: Toggle favorite
- Icon: ❤️ (outline) → ❤️ (filled) on toggle
- Toast: "Ajouté aux favoris" / "Retiré des favoris"

Servings Adjuster:
- Change value: Recalculate all quantities
- Quantities update: Show animation (highlight yellow briefly)
- Store in localStorage (remember user preference)

Checkboxes Ingrédients:
- Click: Toggle checkbox state
- Persist: localStorage (per recipe per user)
- Strikethrough: visual feedback

Checkboxes Étapes:
- Click: Toggle checkbox state
- Persist: localStorage
- Opacity: 50% when done

Copier Liste Button:
- Click: Copy ingredients to clipboard
- Toast: "Copié!"
- Format: "- 200g Farine\n- 100g Sucre\n..."

Imprimer Button:
- Click: Open print dialog
- Print-friendly: Hide navbar, footer, buttons
- Format: Nice layout optimized for print

Modifier Button:
- Click: Navigate to /recipe/my/edit/[id]
- (Only visible if owner)
```

### Responsive

```
Mobile (< 768px):
- Hero image: Full viewport width
- Infos: Centered, stack vertical
- Ingredients list: Full width, larger checkboxes
- Step cards: Full width
- Buttons: Full width, stack vertical

Tablet (768px - 1024px):
- Hero: 80% width
- Infos: 2 col grid
- Step cards: Side by side (2 per row)
- Buttons: 2 per row

Desktop (> 1024px):
- Normal layout
- Step cards: Full width
- Content: Container max-w-4xl
```

---

## Notes de développement

### API utilisée

```typescript
// Get recipe detail
GET /api/recipes/[id]
Response: Recipe (full with ingredients, steps)

// Toggle favorite
POST /api/recipes/[id]/favorite
Response: {favorited: boolean}

// Get ratings (future)
GET /api/recipes/[id]/ratings
Response: {average: number, count: number}
```

### State Management

```
Local State:
- servings: number (for quantity recalculation)
- checkedIngredients: Set<index> (localStorage)
- checkedSteps: Set<index> (localStorage)
- isFavorite: boolean

Derived:
- Ingredient quantities (calculated from baseServings)
```

### Fichiers impliqués

```
app/recipe/shared/show/[id]/page.tsx
app/recipe/my/show/[id]/page.tsx
components/recipes/recipe-detail.tsx
components/recipes/ingredients-section.tsx
components/recipes/steps-section.tsx
components/recipes/author-section.tsx
api/recipes/[id] (GET)
api/recipes/[id]/favorite (POST)
```

### Considérations

1. **Performance**:
   - Image optimization (next/image)
   - Lazy load author section
   - Cache recipe data

2. **UX**:
   - Checkbox states persist (localStorage)
   - Servings preference remembered
   - Print friendly format
   - Back button/breadcrumb

3. **Accessibilité**:
   - ARIA labels sur checkboxes
   - Alt text sur image
   - Semantic HTML (section, article, nav)
   - Keyboard navigation

4. **SEO** (si public):
   - Recipe schema markup (JSON-LD)
   - OG meta tags
   - Structured data for recipe
```

---

## Features Avancées (Future)

```
- Ratings/Notes (⭐ 4.5/5)
- Commentaires des utilisateurs
- Temps cuisson estimé (sous-étapes?)
- Allergènes (tags/badges)
- Nutrition facts (calories, proteines, etc)
- Portion preset (2, 4, 6, 8 pers)
- Share button (social media)
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Fetcher recette depuis API
- [ ] Redirect si pas trouvée (404)
- [ ] Check permissions (private recipes)

### Hero Image

- [ ] Afficher grande image
- [ ] Overlay gradient
- [ ] Actions buttons (top-right)

### Infos Clés

- [ ] Title
- [ ] Category + Difficulty badges
- [ ] Icons: Time, servings, difficulty
- [ ] Meta: Author + date
- [ ] Stats: Rating + Favorites

### Ingrédients

- [ ] Afficher liste d'ingrédients
- [ ] Checkboxes (persistées localStorage)
- [ ] Servings adjuster (dropdown)
- [ ] Quantity calculation on change
- [ ] [✓ Copier] button
- [ ] Mobile-friendly checkboxes

### Étapes

- [ ] Afficher en cartes numérotées
- [ ] Checkboxes (persistées localStorage)
- [ ] Time estimate per step
- [ ] Strikethrough/opacity on done
- [ ] Full-width responsive

### Auteur Section

- [ ] Avatar
- [ ] Nom auteur
- [ ] Date publiée
- [ ] Stats (favorites, views)
- [ ] Link vers autres recettes

### Actions

- [ ] [❤️ Favoris] toggle
- [ ] [🖨️  Imprimer] button
- [ ] [✏️ Modifier] (if owner)
- [ ] Toast notifications

### Advanced

- [ ] Print-friendly CSS
- [ ] localStorage persistence
- [ ] JSON-LD schema
- [ ] OG meta tags
- [ ] Animations/transitions

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 8-10 heures  
**Dépendances**: API recipes/[id], favoritesystem  
