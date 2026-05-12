# 🎭 Interaction Patterns & Standards

## Vue d'ensemble

Documentation des patterns d'interaction standards utilisés à travers FamilyCook. Cela assure la cohérence et la prévisibilité pour l'utilisateur.

**Utilité**: Référence pour l'implémentation consistante des interactions, animations, et feedback utilisateur.

---

## 📢 Toast Notifications

### Usage Guidelines

**Quand utiliser des toasts:**
- ✅ Action réussie (200-201 response)
- ✅ Warning ou info important
- ✅ Timeout/rate limit warnings
- ❌ Ne pas utiliser pour errors bloquants (use error messages dans le form)

### Types & Styling

```typescript
// Type 1: Success
Toast.success({
  title: "Brouillon sauvegardé",
  description: "Votre recette est sauvegardée automatiquement",
  duration: 3000, // 3 seconds
  position: "bottom-right"
})

Example usage:
├─ "Recette créée avec succès"
├─ "Ajouté aux favoris"
├─ "Profil mis à jour"
├─ "Message envoyé"
└─ "Brouillon sauvegardé"

Styling:
├─ Icon: ✅ (green check)
├─ Background: bg-green-50
├─ Border: border-green-200
├─ Text: text-green-900
└─ Duration: 3-5 seconds

---

// Type 2: Error
Toast.error({
  title: "Erreur lors de l'upload",
  description: "Le fichier est trop volumineux (max 5MB)",
  duration: 5000, // 5 seconds
  position: "bottom-right"
})

Example usage:
├─ "Erreur lors du chargement"
├─ "Connexion perdue"
├─ "Fichier trop volumineux"
└─ "Impossible de supprimer"

Styling:
├─ Icon: ❌ (red X)
├─ Background: bg-destructive/10
├─ Border: border-destructive
├─ Text: text-destructive
└─ Duration: 4-6 seconds

---

// Type 3: Info
Toast.info({
  title: "Lien copié",
  description: "Le lien a été copié dans le presse-papiers",
  duration: 2000,
  position: "bottom-right"
})

Example usage:
├─ "Lien copié dans le presse-papiers"
├─ "Vous avez X messages non lus"
├─ "Mise à jour disponible"
└─ "Mode hors-ligne"

Styling:
├─ Icon: ℹ️ (info circle)
├─ Background: bg-blue-50
├─ Border: border-blue-200
├─ Text: text-blue-900
└─ Duration: 2-4 seconds

---

// Type 4: Warning
Toast.warning({
  title: "Brouillon expirant",
  description: "Vous n'avez pas modifié cette recette depuis 7 jours",
  duration: 6000,
  position: "bottom-right"
})

Example usage:
├─ "Session expirant bientôt"
├─ "Quota d'upload atteint"
├─ "Action non réversible"
└─ "Plusieurs tentatives échouées"

Styling:
├─ Icon: ⚠️ (warning triangle)
├─ Background: bg-yellow-50
├─ Border: border-yellow-200
├─ Text: text-yellow-900
└─ Duration: 4-6 seconds
```

### Placement & Animation

```
Position options:
├─ bottom-right (défaut, moins intrusive)
├─ bottom-center
├─ top-right
└─ top-center

Animation:
├─ Enter: Slide-in from bottom-right (200ms)
├─ Exit: Fade-out (200ms)
└─ Stacking: Multiple toasts = stack verticalement

Max toasts: 3 visible at once
Overflow: Queue les autres
```

---

## 🔲 Confirmation Dialogs

### Usage & Patterns

**Quand utiliser:**
- ✅ Actions destructives (delete, remove, logout)
- ✅ Irréversibles ou à haut impact
- ❌ Ne pas pour actions reversibles
- ❌ Ne pas pour confirmations triviales

### Dialog Structure

```typescript
// Pattern 1: Simple Confirmation
ConfirmDialog.show({
  title: "Supprimer ce brouillon?",
  description: "Cette action est irréversible. Êtes-vous sûr?",
  cancelText: "Annuler",
  confirmText: "Supprimer",
  confirmVariant: "destructive", // red button
  onConfirm: async () => {
    await deleteRecipe(id)
    showToast.success("Brouillon supprimé")
  }
})

Common usage:
├─ Delete recipe
├─ Delete account
├─ Remove from favorites
├─ Logout all devices
└─ Clear cache

---

// Pattern 2: Confirmation with Input
ConfirmDialog.show({
  title: "Êtes-vous absolument sûr?",
  description: "Type 'supprimer' pour confirmer la suppression du compte",
  inputPlaceholder: "Tapez 'supprimer'",
  confirmDisabled: inputValue !== 'supprimer',
  onConfirm: deleteAccount
})

Usage:
├─ Delete account (permanent)
└─ Clear all data

---

// Pattern 3: Multi-action Confirmation
ConfirmDialog.show({
  title: "Choisir un action",
  description: "Comment voulez-vous gérer ce brouillon?",
  actions: [
    {text: "Continuer l'édition", variant: "primary", action: editDraft},
    {text: "Publier", variant: "outline", action: publishDraft},
    {text: "Supprimer", variant: "destructive", action: deleteDraft},
    {text: "Annuler", variant: "ghost", action: closeDialog}
  ]
})
```

### Styling

```
Dialog:
├─ Backdrop: bg-black/50 (semi-opaque)
├─ Card: bg-card border-border
├─ Border-radius: rounded-lg
└─ Padding: p-6

Title:
├─ Font: font-bold text-lg
├─ Color: text-foreground
└─ Margin: mb-2

Description:
├─ Font: text-sm
├─ Color: text-muted-foreground
└─ Margin: mb-6

Buttons:
├─ Confirm: variant-destructive (red) si delete
├─ Cancel: variant-ghost (outline)
└─ Gap: space-x-3

Animation:
├─ Fade-in backdrop (150ms)
├─ Scale-in dialog (200ms)
├─ Ease-out timing
```

---

## ⏳ Loading States

### Types of Loading

```
// Type 1: Button Loading
<Button disabled loading>
  Uploading... ⟳
</Button>

When to use:
├─ Form submission
├─ Image upload
├─ API call (1-5 sec)
└─ File processing

Styling:
├─ Disabled state: opacity-50
├─ Icon: spinner (animate-spin)
├─ Text: "Action... ⟳"
└─ Cursor: cursor-not-allowed

---

// Type 2: Skeleton Loading
<RecipeCard.Skeleton /> // Placeholder
<RecipeCard /> // Real content

When to use:
├─ Loading list items
├─ Grid/table cells
├─ Content swap on load
└─ Performance feel better

Styling:
├─ Background: bg-muted/50
├─ Rounded: rounded-lg
├─ Animation: shimmer (pulse)
└─ Duration: 1-3 sec per card

---

// Type 3: Progress Bar
<ProgressBar value={progress} />
"Uploading: 45%"

When to use:
├─ Multi-step forms
├─ File uploads (large)
├─ Recipe creation completion %
└─ Batch operations

Styling:
├─ Height: h-2
├─ Background: bg-muted
├─ Fill: bg-primary
├─ Border-radius: rounded-full
└─ Animation: width transition (200ms)
```

### Loading Duration

```
< 500ms: Show nothing (too fast)
500ms - 1s: Show spinner
1-3s: Show spinner + optional progress
3-5s: Show progress bar + estimated time
> 5s: Show detailed progress + cancel option
```

---

## ❌ Error Messages & Validation

### Inline Validation Errors

```typescript
// Placement: Below input field
<Input
  value={email}
  error={!isValidEmail(email)}
  errorMessage="Email invalide"
/>

Styling:
├─ Border: border-destructive
├─ Error text: text-sm text-destructive
├─ Spacing: mt-1 below input
└─ Icon: Optional ❌ icon

Timing:
├─ Real-time validation: On blur
├─ Submit validation: Show all errors
├─ Discard on fix: Real-time
```

### Form-level Errors

```typescript
// Placement: Top of form in red box
<FormError
  message="Impossible de créer la recette. Vérifiez vos informations."
  details={["La description est trop courte", "Vous n'avez pas d'ingrédients"]}
/>

Styling:
├─ Background: bg-destructive/10
├─ Border: border-destructive
├─ Text: text-destructive
├─ Icon: ⚠️
└─ Padding: p-4 rounded-lg
```

### Server Errors

```
Toast.error({
  title: "Erreur serveur",
  description: "Impossible de sauvegarder. Réessayez plus tard.",
  retryButton: true
})

Common errors:
├─ 400: Validation error → Show inline errors
├─ 401: Unauthorized → Redirect to /auth/login
├─ 403: Forbidden → Show "Vous n'avez pas accès"
├─ 404: Not found → Show 404 page
├─ 429: Rate limit → "Trop de tentatives. Réessayez plus tard"
└─ 500: Server error → Show toast with "Réessayer"
```

---

## 🎯 Button States & Feedback

### Button States

```typescript
// Normal
<Button variant="primary">
  Créer une recette
</Button>

// Hover
<Button className="hover:shadow-lg hover:scale-105">

// Disabled
<Button disabled>
  Action indisponible
</Button>

// Loading
<Button loading>
  Chargement...
</Button>

// With Icon
<Button>
  <Plus /> Ajouter
</Button>

// Icon Only
<Button size="icon">
  <Heart /> {/* favorite button */}
</Button>
```

### Color Coding

```
Primary: bg-primary (noir/dark gray)
├─ Main actions (Create, Save, Publish)
└─ Default for CTAs

Secondary: bg-secondary (light gray)
├─ Secondary actions
└─ Less important buttons

Outline: border-border bg-background
├─ Cancel, Go back
└─ Neutral actions

Ghost: no-bg text-foreground
├─ Additional options
├─ Links-like buttons
└─ Minimal visual weight

Destructive: bg-destructive (red)
├─ Delete, Remove, Leave
└─ High-impact destructive actions
```

---

## 📋 Form Patterns

### Input Focus & Validation

```
// Normal state
<Input
  className="border-border"
/>

// Focus state
<Input
  className="focus:ring-2 focus:ring-primary focus:border-primary"
/>

// Error state
<Input
  error
  className="border-destructive"
/>

// Disabled state
<Input
  disabled
  className="opacity-50 bg-muted"
/>

// Success state (optional)
<Input
  className="border-green-500"
  icon={<Check className="text-green-500" />}
/>
```

### Textarea Behavior

```
<Textarea
  minHeight="h-40"
  maxLength={5000}
  showCharCount
  placeholder="Décrivez votre message..."
  resize="vertical" // Allow resize
/>

Features:
├─ Min height: h-40 (160px)
├─ Max height: scrollable (no max)
├─ Resize: Vertical only
├─ Char counter: "2345/5000"
└─ Placeholder: Helpful hint
```

### Select/Dropdown

```typescript
<Select
  value={category}
  onValueChange={setCategory}
  disabled={isLoading}
>
  <SelectTrigger className="border-border">
    <SelectValue placeholder="Choisir une catégorie" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="appetizer">Entrée</SelectItem>
    <SelectItem value="main">Plat principal</SelectItem>
    <SelectItem value="dessert">Dessert</SelectItem>
  </SelectContent>
</Select>

Trigger:
├─ Border: border-border
├─ Focus: ring-primary
└─ Indicator: Chevron down

Content:
├─ Background: bg-card
├─ Border: border-border
├─ Hover item: bg-muted
└─ Selected: Check mark icon
```

---

## 🔄 Empty States & Placeholders

### Empty State Pattern

```
<EmptyState
  icon={<BookOpen />}
  title="Aucune recette"
  description="Vous n'avez pas encore créé de recette. Commencez maintenant!"
  action={<Button>+ Créer une recette</Button>}
/>

Styling:
├─ Icon: text-muted-foreground size-16
├─ Title: text-lg font-bold
├─ Description: text-sm text-muted-foreground
├─ Action: Primary button
└─ Container: Centered, min-height: 40vh

When to use:
├─ 0 items in list
├─ 0 search results
├─ 0 favorites
└─ 0 public recipes
```

### No Results

```
<NoResults
  query="pâtes"
  title="Aucune recette trouvée"
  description="Essayez une autre recherche ou explorez les recettes populaires"
  suggestions={[
    {text: "Voir populaires", action: viewPopular},
    {text: "Réinitialiser filtres", action: resetFilters}
  ]}
/>
```

---

## 🎨 Hover & Interactive Effects

### Card Hover

```css
/* Recipe Card */
.recipe-card {
  transition: all 200ms ease-in-out;
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }
}

/* Admin Table Row */
.table-row {
  &:hover {
    background-color: var(--color-muted-50);
  }
}
```

### Button Hover

```css
/* Primary Button */
.button-primary {
  transition: all 200ms ease-in-out;
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: scale(1.02);
  }
}

/* Outline Button */
.button-outline {
  &:hover {
    background-color: var(--color-muted-50);
    border-color: var(--color-primary);
  }
}
```

### Heart/Favorite Toggle

```css
.heart-button {
  transition: all 150ms ease-in-out;
  
  &.favorited {
    color: var(--color-red);
    transform: scale(1.2);
  }
}
```

---

## ⌨️ Keyboard Navigation

### Focus Management

```typescript
// Auto-focus first input
<Modal>
  <Input autoFocus />
</Modal>

// Tab order
<Dialog>
  <Input tabIndex={0} /> {/* First */}
  <Select tabIndex={1} /> {/* Second */}
  <Button tabIndex={2} /> {/* Third */}
</Dialog>

// Escape to close
<Modal onKeyDown={(e) => {
  if (e.key === 'Escape') closeModal()
}}>
```

### Common Keyboard Shortcuts

```
Enter: Submit form
Escape: Close modal/dropdown
Tab: Navigate forward
Shift+Tab: Navigate backward
Arrow keys: Navigate list items (optional)
```

---

## 📱 Responsive Interaction Patterns

### Touch Interactions

```
Buttons:
├─ Min size: 44x44px (mobile touch target)
├─ Spacing: min 8px between targets
└─ Feedback: Visual + haptic (optional)

Swipe:
├─ Swipe left: Delete (optional)
├─ Swipe right: Archive (optional)
└─ Confirmation before action

Long-press:
├─ Context menu on long-press
├─ Options: Share, Copy, Edit, Delete
└─ Haptic feedback on trigger
```

### Mobile Optimizations

```
Forms:
├─ Large inputs: h-12 (48px)
├─ Label above input
├─ Clear error messages
└─ Submit button: Full width

Lists:
├─ Card layout (not table)
├─ Touch-friendly spacing
├─ Swipe actions available
└─ Pagination: Load more button

Modals:
├─ Full screen on mobile
├─ Slide from bottom
├─ Dismiss: Swipe down or X button
└─ Keyboard doesn't hide content
```

---

## 🔔 Animations & Transitions

### Standard Durations

```
Quick feedback: 100-150ms
├─ Button press
├─ Hover effects
└─ Small state changes

Standard: 200-300ms (default)
├─ Page transitions
├─ Modal open/close
├─ Form validation feedback
└─ Skeleton to content

Slow: 500-600ms
├─ Complex animations
├─ Tutorial/onboarding
└─ Attention-grabbing
```

### Easing Functions

```
ease-out: Quick start, slow end
├─ Modal open
├─ Content fade-in
└─ Scale-up

ease-in-out: Smooth throughout
├─ Standard transitions
├─ Hover effects
└─ State changes

ease-in: Slow start, quick end
├─ Attention (rarely used)
└─ Specialty cases
```

---

## 🚫 Patterns to Avoid

```
❌ DO NOT:
├─ Auto-playing audio/video
├─ Auto-playing animations
├─ Sudden loud toasts
├─ Misleading button text
├─ Fake loading spinners
├─ Unconfirmed data deletion
├─ Infinite modals (modal in modal)
├─ Frozen UI without indication
├─ Flashing/strobing content
└─ Multiple toasts at once

✅ DO INSTEAD:
├─ User-initiated actions
├─ Honest loading states
├─ Meaningful feedback
├─ Clear call-to-action
├─ Actual progress indication
├─ Confirmation for destructive
├─ Modal + drawer (not nested)
├─ Loading indicator visible
├─ Smooth, respectful animations
└─ Max 3 toasts stacked
```

---

## 📋 Implementation Checklist

- [ ] Define toast component with 4 types (success, error, info, warning)
- [ ] Implement confirm dialog component
- [ ] Add loading states to buttons (spinner, disabled state)
- [ ] Create skeleton loaders for lists
- [ ] Add progress bar component
- [ ] Implement inline field validation
- [ ] Create form-level error component
- [ ] Add empty state component
- [ ] Implement focus management in modals
- [ ] Add keyboard shortcuts (Escape to close)
- [ ] Test tab navigation order
- [ ] Add touch target sizing (44x44px min)
- [ ] Implement swipe actions (optional)
- [ ] Add haptic feedback (optional)
- [ ] Smooth transitions (200-300ms default)
- [ ] Test animations on slow devices
- [ ] Verify color contrast (WCAG AA)
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader

---

**Créé le**: 2026-05-12  
**Status**: 📋 Documentation complète  
**Utilité**: Référence pour interactions cohérentes et prévisibles à travers l'app
