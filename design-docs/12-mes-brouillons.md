# 📝 Mes Brouillons

## Description

La page de gestion des brouillons permet à l'utilisateur de voir, reprendre, publier ou supprimer ses recettes en cours de rédaction. C'est un espace dédié pour l'édition et la sauvegarde de contenu non publié.

**Statut**: Privé (utilisateur connecté uniquement)  
**URL**: `/recipe/my/drafts`  
**Authentification**: ✅ Oui (required)  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Prévention de perte** : Aucun brouillon n'est perdu, toujours sauvegardé
- 🎯 **Reprise facile** : Continuer un brouillon en 1 clic
- 🎯 **Clarté de statut** : Savoir ce qui est draft, ce qui est publié
- 🎯 **Organisation** : Voir tous les brouillons en même temps
- 🎯 **Gestion** : Publier directement ou supprimer des brouillons

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Sauvegarde auto ou manuelle?** | Auto-save à chaque modification, avec indication visuelle |
| **Brouillon vs privé?** | Brouillon = recette non publiée + non finalisée; Privée = recette complète mais pas publique |
| **Temps expiration?** | Pas d'expiration - brouillon peut rester indéfiniment |
| **Pagination?** | Oui, 12 par page comme Mes recettes |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Jean [☰]  │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  📝 Mes brouillons                                          │
│  Continuez vos recettes en cours                           │
│                                                             │
│  [🔍 Chercher]  [Trier ▼]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ EMPTY STATE (si 0 brouillon) ────────────────────────────┐
│                                                           │
│                      📝 Aucun brouillon                    │
│                                                           │
│         Vous n'avez pas de recette en cours.             │
│                                                           │
│  [+ Créer une nouvelle recette]                         │
│                                                           │
└─────────────────────────────────────────────────────────────┘

┌─ AVEC BROUILLONS ─────────────────────────────────────────┐
│                                                           │
│  📊 3 brouillons trouvés                                  │
│                                                           │
│  Grille 3 colonnes (responsive: 1 mobile, 2 tablet)      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────┐│
│  │ 🖼️             │  │ 🖼️             │  │ 🖼️      ││
│  │                │  │                │  │         ││
│  │ Pâtes          │  │ Salade grecque │  │ Tarte...││
│  │ Carbonara      │  │                │  │         ││
│  │                │  │ Salade         │  │ 80%     ││
│  │ (pas d'image)  │  │ • 3 ingrédients│  │ complet ││
│  │                │  │ • Aucune étape │  │         ││
│  │ 0% complet     │  │                │  │ Modifié││
│  │ Modifié hier   │  │ Modifiée auj.  │  │ à 14:30 ││
│  │                │  │                │  │         ││
│  │ [Reprendre]    │  │ [Reprendre]    │  │[Reprend││
│  │ [Supprimer]    │  │ [Supprimer]    │  │ [Suppr ││
│  └─────────────────┘  └─────────────────┘  └──────────┘│
│                                                           │
│  [< Précédent]  1  2  [Suivant >]                       │
│                                                           │
└─────────────────────────────────────────────────────────────┘

┌─ BROUILLON CARD DÉTAIL ─────────────────────────────────┐
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🖼️  [Pas d'image]      [Cov. image: X]         │  │
│  │                                                  │  │
│  │ Pâtes Carbonara                                 │  │
│  │                                                  │  │
│  │ 📊 Complétude: 45%                              │  │
│  │ ├─ Titre: ✅                                    │  │
│  │ ├─ Description: ❌                              │  │
│  │ ├─ Catégorie: ✅                                │  │
│  │ ├─ Ingrédients (2/5): 🟡                       │  │
│  │ ├─ Étapes (1/5): 🟡                            │  │
│  │ └─ Difficulté: ✅                               │  │
│  │                                                  │  │
│  │ 📝 Dernière modification: Hier à 15:30         │  │
│  │ 🕐 Crée le: 2026-05-10                         │  │
│  │                                                  │  │
│  │ [Reprendre l'édition]  [Supprimer...]         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Layout & Structure

```
Header Section:
├── h1: "Mes brouillons"
├── p: "Continuez vos recettes en cours"
├── Search + Sort controls
└── Count: "X brouillons trouvés"

Content:
├── Empty state (si 0)
│   ├── Icon
│   ├── Message
│   └── [Créer recette] button
└── Grid layout (3 cols desktop, 2 tablet, 1 mobile)
    ├── Draft Card (voir ci-après)
    └── Pagination
```

### Draft Card Component

```
Card (border, rounded, hover-shadow):
├── Image:
│   ├── Placeholder si pas d'image
│   └── Indicateur: "(pas d'image)"
├── Title (bold, text-lg)
├── Completion bar:
│   ├── Progress: 0-100%
│   ├── Visual: progress bar + percentage
│   └── Detail: "45% complet"
├── Last modified: "Modifiée hier à 15:30"
└── Actions:
    ├── [Reprendre l'édition] (primary button)
    └── [Supprimer] (ghost button, destructive on hover)

Hover state:
├── shadow-lg
├── Scale: 1.02
└── Actions become more visible
```

### Completion Calculation

```typescript
completion = (filledFields / totalFields) * 100

Fields requis pour 100%:
├── title: ✓ (requis)
├── description: ✗ (optionnel, mais compte)
├── category: ✓ (requis)
├── difficulty: ✓ (requis)
├── prepTime + cookTime: ✓ (requis)
├── baseServings: ✓ (requis)
├── coverImageUrl: ✗ (optionnel, mais compte)
├── ingredients: ✓ (minimum 1)
└── steps: ✓ (minimum 1)

Scoring:
- 0-25%: 🔴 À peine commencé
- 25-50%: 🟡 Bien avancé
- 50-75%: 🟢 Presque fini
- 75-100%: 🟢 Presque prêt à publier
```

### Tri & Filtres

```
Tri options:
├── Récent (défaut)
├── Ancien
├── Alphabétique
└── % complétude

Recherche:
├── Par titre
├── Debounced (300ms)
├── Temps réel
```

### Couleurs & Style

```
Draft card:
- Border: border-border
- Background: bg-card
- Hover: bg-card + shadow-lg

Completion bar:
- 0-25%: bg-red-500
- 25-50%: bg-yellow-500
- 50-75%: bg-blue-500
- 75-100%: bg-green-500

Actions:
- Reprendre: primary variant
- Supprimer: ghost variant (destructive on hover)

Text:
- Title: text-foreground bold
- Metadata: text-sm text-muted-foreground
```

### Interactions

```
Clic [Reprendre]:
├── Navigate: /recipe/my/edit/[id]
└── (ouvre l'éditeur de recette existant)

Clic [Supprimer]:
├── Show confirm dialog
├── "Êtes-vous sûr? Cette action est irréversible"
├── [Annuler] [Supprimer brouillon]
└── Si oui: DELETE /api/recipes/[id]

Hover card:
├── shadow-lg
├── scale: 1.02
└── Actions visible

Search:
├── Debounced 300ms
├── Live results
├── URL param: ?search=...

Completion bar:
├── Hover: Show tooltip avec détails
│   └─ "45%: Title ✓, Cat ✓, Ingrédients (2/5) 🟡"
└── Click: Scroll to missing fields (future)
```

### Responsive

```
Mobile (< 768px):
- Grid: 1 colonne
- Card: Full width, compact
- Actions: Boutons empilés (column)
- Completion bar: Simplified

Tablet (768px - 1024px):
- Grid: 2 colonnes
- Card: Normal
- Actions: Side by side

Desktop (> 1024px):
- Grid: 3 colonnes
- Card: Full details visible
- Actions: Inline
```

---

## Notes de développement

### API utilisée

```typescript
// Récupérer les brouillons de l'utilisateur
GET /api/recipes/my/drafts?search=x&sort=recent&page=1&limit=12
Response: {
  recipes: [{
    id, title, description, category, difficulty,
    prepTime, cookTime, baseServings,
    coverImageUrl,
    ingredientCount, stepCount,
    createdAt, updatedAt,
    isDraft: true
  }],
  total, page, totalPages
}

// Supprimer un brouillon
DELETE /api/recipes/[id]
Response: {success: true}

// Reprendre un brouillon (navigate vers edit)
GET /api/recipes/[id]
Response: {recipe avec tous les détails}
```

### Fichiers impliqués

```
app/(private)/recipe/my/drafts/page.tsx
components/recipe/
  ├── draft-card.tsx
  ├── draft-grid.tsx
  └── draft-empty-state.tsx
lib/recipe-utils.ts (calculateCompletion)
api/recipes/my/drafts (GET)
```

### Considérations

1. **Auto-save dans l'éditeur**:
   - Quand user édite, sauvegarder auto-save chaque 30 sec
   - Toast "Brouillon sauvegardé" discret

2. **Completion percentage**:
   - Calculer côté client pour l'instant
   - Future: Optionnel, calculer côté serveur

3. **Images**:
   - Les brouillons peuvent avoir ou pas une image
   - Indicator "(pas d'image)" aide l'utilisateur

4. **Performance**:
   - Paginer par 12 (comme mes recettes)
   - Lazy load si beaucoup de brouillons

5. **Cas limites**:
   - Utilisateur supprime brouillon depuis page detail?
   - Utilisateur supprime en cours d'édition?
   - → Rediriger vers /recipe/my/drafts avec toast

6. **UX:**
   - Clear call-to-action pour "Reprendre"
   - Completion bar guide l'utilisateur sur quoi compléter
   - Destruction clear (confirm dialog avec message fort)

---

## Checklist d'implémentation

### Page Structure
- [ ] Create /recipe/my/drafts route
- [ ] Fetch user's drafts
- [ ] Implement pagination

### Draft Card Component
- [ ] Display draft title
- [ ] Show image or placeholder
- [ ] Calculate completion percentage
- [ ] Display last modified date
- [ ] Render completion bar with color
- [ ] Add [Reprendre] button
- [ ] Add [Supprimer] button

### Search & Sort
- [ ] Implement search input (debounced)
- [ ] Implement sort dropdown
- [ ] Update URL params
- [ ] Reload on filter change

### Empty State
- [ ] Show when 0 drafts
- [ ] Display icon + message
- [ ] Add [Créer recette] button

### Interactions
- [ ] Reprendre: Navigate to /recipe/my/edit/[id]
- [ ] Supprimer: Show confirm dialog
- [ ] Delete on confirm
- [ ] Show toast feedback
- [ ] Hover effects (shadow + scale)

### Responsive Design
- [ ] Mobile: 1 column grid
- [ ] Tablet: 2 columns
- [ ] Desktop: 3 columns
- [ ] Test on all sizes

### Edge Cases
- [ ] Handle long titles (truncate)
- [ ] Handle missing images
- [ ] Handle network errors
- [ ] Handle permission denied
- [ ] Handle draft deleted by other session

### Accessibility
- [ ] Focus management
- [ ] ARIA labels for buttons
- [ ] Keyboard navigation
- [ ] Screen reader friendly
- [ ] Color contrast (completion bar)

---

## Dépendances

- ✅ API endpoints: `/api/recipes/my/drafts`, `DELETE /api/recipes/[id]`
- ✅ DATA-MODELS.md: Support pour `isDraft` flag
- ✅ 04-creer-recette.md: "Sauvegarder en brouillon" button
- ⏳ 03-mes-recettes.md: Link vers /recipe/my/drafts

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Priorité**: 🔴 CRITIQUE (prévention perte de données)  
**Estimé**: 4-6 heures (component + page + API)  
**Dépendances**: Édition recette, API drafts
