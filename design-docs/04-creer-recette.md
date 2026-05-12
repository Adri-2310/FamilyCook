# ✏️ Créer/Éditer Recette

## Description

La page de création/édition de recette est le cœur du produit. C'est ici que les utilisateurs créent leurs recettes avec un formulaire structuré et intuitif sous forme de **wizard en 4 étapes**.

**Statut**: Connecté  
**URL**: `/recipe/my/new` (création) ou `/recipe/my/edit/[id]` (édition)  
**Authentification**: ✅ Oui  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Guidage clair** : Wizard en steps pour ne pas surcharger
- 🎯 **Intuitivité** : Drag & drop, images, validation live
- 🎯 **Flexibilité** : Ajouter/supprimer ingrédients et étapes facilement
- 🎯 **Sécurité** : Brouillon pour ne pas perdre le travail
- 🎯 **Confirmation** : Preview avant validation finale

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Structure formulaire** | Wizard 4 steps |
| **Gestion images** | Drag&drop + Preview + Crop + URL |
| **Ingrédients/Étapes** | Add/Remove buttons |
| **Steps** | 1. Basique → 2. Ingrédients → 3. Étapes → 4. Images |
| **Preview** | Oui, à la fin (step 4) |
| **Draft** | Bouton [Sauvegarder en brouillon] |
| **Post-création** | Retour à "Mes Recettes" |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

┌─ WIZARD HEADER ────────────────────────────────────────────┐
│                                                             │
│  Créer une recette                                          │
│                                                             │
│  Step 1: Basique       Step 2: Ingrédients   Step 3: ...   │
│  ●────────────────●           ○──────────●    ○──────  ○   │
│                                                             │
│  Étape 1: Informations de base                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ STEP 1: BASIQUE ──────────────────────────────────────────┐
│                                                             │
│  ┌─ Titre ────────────────────────────────────────┐       │
│  │ [Titre de la recette]                          │       │
│  └────────────────────────────────────────────────┘       │
│                                                             │
│  ┌─ Description ──────────────────────────────────┐       │
│  │ [Description courte de la recette]             │       │
│  │ [Environ 2-3 lignes]                           │       │
│  └────────────────────────────────────────────────┘       │
│                                                             │
│  Catégorie            Difficulté                           │
│  [Plat principal ▼]   [Moyen ▼]                           │
│                                                             │
│  Temps de préparation  Temps de cuisson                    │
│  [30 min]              [20 min]                            │
│                                                             │
│  Portions (base)       Visibilité                          │
│  [4 ▼]                 [Privée ▼]                         │
│                                                             │
│                                                             │
│  [Brouillon]  [Annuler]              [Continuer →]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ STEP 2: INGRÉDIENTS ─────────────────────────────────────┐
│                                                             │
│  Étape 2: Ingrédients                                      │
│                                                             │
│  ┌──────────────────────────────────────────────┐         │
│  │ Ingrédient 1   Quantité    Unité             │         │
│  │ [Farine]       [200]       [g ▼]             │ [🗑️]   │
│  └──────────────────────────────────────────────┘         │
│                                                             │
│  ┌──────────────────────────────────────────────┐         │
│  │ Ingrédient 2   Quantité    Unité             │         │
│  │ [Sucre]        [100]       [g ▼]             │ [🗑️]   │
│  └──────────────────────────────────────────────┘         │
│                                                             │
│  ┌──────────────────────────────────────────────┐         │
│  │ Ingrédient 3   Quantité    Unité             │         │
│  │ [...]          [...]       [...]             │ [🗑️]   │
│  └──────────────────────────────────────────────┘         │
│                                                             │
│  [+ Ajouter un ingrédient]                                │
│                                                             │
│                                                             │
│  [Brouillon]  [← Retour]              [Continuer →]       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ STEP 3: ÉTAPES ───────────────────────────────────────────┐
│                                                             │
│  Étape 3: Préparation                                      │
│                                                             │
│  ┌──────────────────────────────────────────────┐         │
│  │ 1. [Étape 1: Préparation des ingrédients]   │ [🗑️]   │
│  │    [Dans ce champ, décrivez votre étape]    │         │
│  └──────────────────────────────────────────────┘         │
│                                                             │
│  ┌──────────────────────────────────────────────┐         │
│  │ 2. [Étape 2: ...]                            │ [🗑️]   │
│  │    [...]                                      │         │
│  └──────────────────────────────────────────────┘         │
│                                                             │
│  [+ Ajouter une étape]                                    │
│                                                             │
│                                                             │
│  [Brouillon]  [← Retour]              [Continuer →]       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ STEP 4: IMAGES & PREVIEW ────────────────────────────────┐
│                                                             │
│  Étape 4: Photos et aperçu                                │
│                                                             │
│  ┌─ IMAGES ────────────────────────────────────┐           │
│  │                                              │           │
│  │  ╔════════════════════════════════════╗    │           │
│  │  ║  🖼️  Drag & drop une image ici     ║    │           │
│  │  ║     ou [Parcourir] [Depuis URL]    ║    │           │
│  │  ║                                      ║    │           │
│  │  ║  (JPG, PNG - Max 5MB)              ║    │           │
│  │  ╚════════════════════════════════════╝    │           │
│  │                                              │           │
│  │  Image sélectionnée:                        │           │
│  │  ┌──────────────────┐                       │           │
│  │  │    PREVIEW       │  [Crop] [Retirer]    │           │
│  │  │     IMAGE        │                       │           │
│  │  │                  │                       │           │
│  │  └──────────────────┘                       │           │
│  └──────────────────────────────────────────────┘          │
│                                                             │
│  ┌─ PREVIEW RECETTE ────────────────────────────┐          │
│  │                                               │          │
│  │  Ratatouille                                 │          │
│  │  par Jean Dupont                             │          │
│  │                                               │          │
│  │  ┌──────────────────┐                        │          │
│  │  │      IMAGE       │  Ratatouille           │          │
│  │  │                  │  Plat principal        │          │
│  │  │                  │  Moyen                 │          │
│  │  │                  │  ⏱ 50 min             │          │
│  │  │                  │  👥 4 pers            │          │
│  │  └──────────────────┘                        │          │
│  │                                               │          │
│  │  Description: Une délicieuse...              │          │
│  │                                               │          │
│  │  INGRÉDIENTS:                                │          │
│  │  • 200g Farine                               │          │
│  │  • 100g Sucre                                │          │
│  │  ...                                          │          │
│  │                                               │          │
│  │  ÉTAPES:                                     │          │
│  │  1. Préparer les ingrédients...             │          │
│  │  2. Mélanger...                              │          │
│  │  ...                                          │          │
│  │                                               │          │
│  └───────────────────────────────────────────────┘         │
│                                                             │
│  [Brouillon]  [← Retour]              [✓ Publier]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Wizard Structure

```
Step Indicator:
├── Cercle 1 (Basique) ● ─── Cercle 2 (Ingrédients) ○ ─── ...
├── Step counter: "Étape 1/4"
└── Progression bar sous les cercles

Navigation:
├── Previous button [← Retour] (disabled on step 1)
├── Next button [Continuer →]
├── Skip draft button [Brouillon]
└── Submit button [✓ Publier] (on step 4)
```

### Step 1: Basique

```
Fields:
├── Input: Titre (required, min 3 chars)
├── TextArea: Description (required, max 500 chars)
├── Select: Catégorie (required)
├── Select: Difficulté (required)
├── Input: Temps préparation (minutes, required)
├── Input: Temps cuisson (minutes, optional)
├── Input: Portions (number, required, default 4)
└── Select: Visibilité (PRIVATE/PUBLIC, required)

Validation:
├── Live: Titre (min 3)
├── Live: Description (max 500)
├── On Submit: All required fields
```

### Step 2: Ingrédients

```
Dynamic List:
├── Item 1:
│   ├── Input: Nom ingrédient
│   ├── Input: Quantité (number)
│   ├── Select: Unité (g, kg, ml, l, etc)
│   └── Button: [🗑️] Delete
├── Item 2...
└── [+ Ajouter un ingrédient] button

Validation:
├── Min 1 ingrédient
├── Chaque ligne: nom required
└── Quantité + Unité required ou empty
```

### Step 3: Étapes

```
Dynamic List:
├── Item 1:
│   ├── Number: 1.
│   ├── TextArea: Texte étape
│   └── Button: [🗑️] Delete
├── Item 2...
└── [+ Ajouter une étape] button

Validation:
├── Min 1 étape
├── Chaque étape: texte required
└── Auto-renumber après suppression
```

### Step 4: Images & Preview

```
Upload Section:
├── Drag & Drop Zone
│   ├── Icon: upload
│   ├── Text: "Drag & drop une image"
│   └── Buttons: [Parcourir] [Depuis URL]
├── Input: File upload (hidden)
├── Input: URL paste (if URL selected)
├── Image Preview:
│   ├── Thumbnail with actions
│   ├── Button: [Crop] (Opens crop modal)
│   └── Button: [Retirer]

Preview Section:
├── RecipeCardClient preview
│   ├── Image
│   ├── Title, Description
│   ├── Category, Difficulty
│   ├── Times, Servings
│   ├── Ingredients list
│   └── Steps list
└── Responsive (shows as card user would see)
```

### Couleurs

```
Step Indicator:
- Active step: bg-primary text-primary-foreground
- Completed: bg-primary/60
- Future: bg-muted text-muted-foreground
- Line: border-primary (completed) / border-muted (future)

Form Fields:
- Input: variant="outline"
- Focus: ring-primary
- Error: border-destructive

Buttons:
- [Continuer →]: primary
- [← Retour]: outline
- [Brouillon]: ghost
- [✓ Publier]: primary (green variant?)
- [🗑️]: destructive hover
```

### Interactions

```
Step Navigation:
- Click next: Validate current step
- If error: Scroll to error, highlight field
- Click previous: No validation (go back)
- Click draft: Auto-save & toast "Sauvegardé"

Ingrédients:
- Click [+]: Add new empty line
- Click [🗑️]: Remove line
- Auto-focus new ingredient field

Étapes:
- Click [+]: Add new empty line
- Auto-number (1, 2, 3...)
- Click [🗑️]: Remove line
- Re-number automatically

Images:
- Drag & drop: File input trigger
- Click [Parcourir]: File picker
- Click [Depuis URL]: Switch to URL input
- Upload: Show spinner, then preview
- Click [Crop]: Open modal with cropping UI
- Click [Retirer]: Remove image

Preview:
- Real-time update as user types
- Shows exactly how card will look
- Scroll to see full preview
```

### Responsive

```
Mobile (< 768px):
- Wizard steps: Vertical or collapse (show current step only)
- Form fields: 100% width, stack vertical
- Step counter visible (Étape 1/4)
- Buttons: Full width

Tablet (768px - 1024px):
- Wizard steps: Horizontal but smaller
- Form fields: Single column
- Normal buttons

Desktop (> 1024px):
- Wizard steps: Horizontal, clear
- Form fields: Grid layout (2 cols where possible)
- Preview side-by-side (step 4)
```

---

## Notes de développement

### API utilisée

```typescript
// Create recipe
POST /api/recipes
Body: {
  title, description, category, difficulty,
  prepTime, cookTime, baseServings, visibility,
  ingredients: [{name, quantity, unit}],
  steps: [{content}],
  coverImageUrl
}
Response: Recipe

// Update recipe
PUT /api/recipes/[id]
Body: Same as above
Response: Recipe

// Save as draft
POST /api/recipes/draft
Body: Same as above (partial ok)
Response: Recipe (status: DRAFT)

// Upload image
POST /api/upload
Body: FormData (file)
Response: {url: string}

// Get recipe (for editing)
GET /api/recipes/[id]
Response: Recipe
```

### Components à créer

```
RecipeWizard.tsx (main container)
├── StepIndicator.tsx
├── StepBasic.tsx
├── StepIngredients.tsx
├── StepSteps.tsx
├── StepImages.tsx
└── WizardNavigation.tsx

ImageUpload.tsx
├── DragDropZone.tsx
├── ImageCropModal.tsx
└── ImagePreview.tsx

DynamicList.tsx (generic component)
├── AddButton
├── DeleteButton
└── Auto-numbering for steps

RecipePreview.tsx
└── (Reuse RecipeCardClient)
```

### Fichiers impliqués

```
app/recipe/my/new/page.tsx
app/recipe/my/edit/[id]/page.tsx
components/recipe-form.tsx (REFACTOR)
components/recipe-wizard/
  ├── step-basic.tsx
  ├── step-ingredients.tsx
  ├── step-steps.tsx
  ├── step-images.tsx
  └── wizard-nav.tsx
components/recipe/image-upload.tsx
api/recipes (POST, PUT)
api/upload (POST)
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Créer page /recipe/my/new et /recipe/my/edit/[id]
- [ ] Fetcher recette si édition

### Wizard Component

- [ ] Step indicator (cercles + progression)
- [ ] Step counter (Étape X/4)
- [ ] Navigation buttons (Previous, Next, Draft, Publish)
- [ ] Form state management (step 1-4 data)

### Step 1: Basique

- [ ] Title input
- [ ] Description textarea
- [ ] Category select
- [ ] Difficulty select
- [ ] Prep time input
- [ ] Cook time input
- [ ] Servings input
- [ ] Visibility select (PUBLIC/PRIVATE)
- [ ] Validation live

### Step 2: Ingrédients

- [ ] Dynamic list with add/remove
- [ ] Ingredient name input
- [ ] Quantity input (number)
- [ ] Unit select
- [ ] Delete buttons [🗑️]
- [ ] [+ Add ingredient] button

### Step 3: Étapes

- [ ] Dynamic list with auto-numbering
- [ ] Step text textarea
- [ ] Delete buttons [🗑️]
- [ ] [+ Add step] button
- [ ] Auto re-number after delete

### Step 4: Images & Preview

- [ ] Drag & drop zone
- [ ] File input (hidden)
- [ ] [Parcourir] button
- [ ] [Depuis URL] option
- [ ] Image preview thumbnail
- [ ] [Crop] button → crop modal
- [ ] [Retirer] button
- [ ] RecipePreview component (live update)
- [ ] [✓ Publier] button

### Global

- [ ] Form validation
- [ ] Error handling & toasts
- [ ] Loading states
- [ ] Draft save functionality
- [ ] Post-publish redirect to /recipe/my
- [ ] Responsive layout
- [ ] Image compression/optimization

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 10-14 heures (complexe avec wizard + upload + preview)  
**Dépendances**: Image upload service, form validation, state management  
