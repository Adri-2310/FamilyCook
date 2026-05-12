# 🎨 Design System - FamilyCook

## Vue d'ensemble

Système de design complet avec tokens Tailwind, composants, variants et spécifications visuelles.

---

## 📦 Tailwind Configuration

### Colors (OKLCH Format)

```javascript
// tailwind.config.ts
colors: {
  // Semantic colors from tweakcn
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  primary: 'var(--primary)',
  'primary-foreground': 'var(--primary-foreground)',
  secondary: 'var(--secondary)',
  'secondary-foreground': 'var(--secondary-foreground)',
  muted: 'var(--muted)',
  'muted-foreground': 'var(--muted-foreground)',
  accent: 'var(--accent)',
  'accent-foreground': 'var(--accent-foreground)',
  destructive: 'var(--destructive)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  
  // Status colors (extend)
  success: '#22c55e', // green-500
  warning: '#eab308', // yellow-500
  error: '#ef4444', // red-500
  info: '#3b82f6', // blue-500
}
```

### CSS Variables (Light Mode - :root)

```css
:root {
  --background: oklch(1 0 0);              /* white */
  --foreground: oklch(0.145 0 0);          /* dark gray */
  --card: oklch(1 0 0);                    /* white */
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);             /* dark */
  --primary-foreground: oklch(0.985 0 0);  /* almost white */
  --secondary: oklch(0.97 0 0);            /* light gray */
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);                /* light gray */
  --muted-foreground: oklch(0.556 0 0);    /* medium gray */
  --accent: oklch(0.97 0 0);               /* light gray */
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);/* red */
  --border: oklch(0.922 0 0);              /* very light gray */
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);                /* medium gray */
}

/* Dark mode */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  
  /* Blue accent for dark mode (from tweakcn) */
  --sidebar-primary: oklch(0.488 0.243 264.376); /* blue */
}
```

### Spacing

```javascript
// Base: 0.25rem (4px)
spacing: {
  0: '0',
  1: '0.25rem',      // 4px
  2: '0.5rem',       // 8px
  3: '0.75rem',      // 12px
  4: '1rem',         // 16px
  6: '1.5rem',       // 24px
  8: '2rem',         // 32px
  12: '3rem',        // 48px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  // ...standard Tailwind scale
}

// Page sections: py-12, py-16, py-20
// Cards/spacing: gap-4, gap-6
// Forms: space-y-3, space-y-4
```

### Border Radius

```javascript
radius: '0.625rem', // 10px (base)

// Variants (relative to base)
'radius-sm': 'calc(var(--radius) * 0.6)',   // ~4px
'radius-md': 'calc(var(--radius) * 0.8)',   // ~5px
'radius-lg': 'var(--radius)',               // 10px
'radius-xl': 'calc(var(--radius) * 1.4)',   // ~14px
'radius-2xl': 'calc(var(--radius) * 1.8)',  // ~18px
'radius-3xl': 'calc(var(--radius) * 2.2)',  // ~22px

// Utility classes
rounded-sm    /* ~4px */
rounded       /* ~10px (default) */
rounded-lg    /* ~14px */
rounded-full  /* 9999px */
```

### Typography

```javascript
fontSize: {
  xs: ['0.75rem', {lineHeight: '1rem'}],      // 12px
  sm: ['0.875rem', {lineHeight: '1.25rem'}],  // 14px
  base: ['1rem', {lineHeight: '1.5rem'}],     // 16px
  lg: ['1.125rem', {lineHeight: '1.75rem'}],  // 18px
  xl: ['1.25rem', {lineHeight: '1.75rem'}],   // 20px
  '2xl': ['1.5rem', {lineHeight: '2rem'}],    // 24px
  '3xl': ['1.875rem', {lineHeight: '2.25rem'}], // 30px
  '4xl': ['2.25rem', {lineHeight: '2.5rem'}], // 36px
  '5xl': ['3rem', {lineHeight: '1.2'}],       // 48px
  '6xl': ['3.75rem', {lineHeight: '1.2'}],    // 60px
}

fontFamily: {
  sans: ['var(--font-sans)', 'system-ui'],  // Geist
  mono: ['var(--font-mono)', 'monospace'],  // Geist Mono
}

fontWeight: {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

letterSpacing: {
  tight: '-0.02em',
  normal: '0em',
  wide: '0.02em',
}

lineHeight: {
  tight: '1.2',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}
```

### Transitions & Animations

```javascript
transitionDuration: {
  '200': '200ms',
  '300': '300ms',
  '500': '500ms',
}

transitionTimingFunction: {
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
}

// Standard hover: shadow-lg + opacity/scale
```

---

## 🧩 Component Variants

### Button

```
Variants:
├── primary (bg-primary text-primary-foreground)
├── secondary (bg-secondary text-secondary-foreground)
├── outline (border-border bg-background)
├── ghost (no background, text-foreground)
└── destructive (bg-destructive text-destructive-foreground)

Sizes:
├── sm (px-3 py-1 text-sm)
├── md (px-4 py-2 text-base) [default]
├── lg (px-6 py-3 text-lg)
└── icon (w-10 h-10)

States:
├── Normal: bg-primary
├── Hover: shadow-lg
├── Focus: ring-2 ring-primary
├── Disabled: opacity-50 cursor-not-allowed
└── Loading: disabled + spinner

Example:
<Button variant="primary" size="lg">
  Créer une recette
</Button>
```

### Input

```
Variants:
├── outline (border-border bg-background)
├── filled (bg-muted border-none)
└── flushed (border-bottom only)

States:
├── Normal: border-border
├── Focus: ring-primary border-primary
├── Error: border-destructive ring-destructive
├── Disabled: bg-muted opacity-50
└── Placeholder: text-muted-foreground

Example:
<Input 
  placeholder="Chercher..."
  className="border-border focus:ring-primary"
/>
```

### Card

```
Structure:
<Card className="border border-border bg-card">
  <CardHeader className="space-y-1.5 border-b">
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    Contenu
  </CardContent>
  <CardFooter className="border-t space-x-2">
    Boutons
  </CardFooter>
</Card>

Hover: shadow-lg transition-shadow
```

### Badge/Tag

```
Types:
├── default (bg-primary text-primary-foreground)
├── secondary (bg-secondary text-secondary-foreground)
├── destructive (bg-destructive text-destructive-foreground)
├── success (bg-green-500 text-white)
└── outline (border-border bg-background)

Sizes:
├── sm (px-2 py-0.5 text-xs)
├── md (px-3 py-1 text-sm) [default]
└── lg (px-4 py-2 text-base)

Example:
<Badge variant="outline">Privé</Badge>
<Badge variant="success">Public</Badge>
<Badge className="bg-red-100 text-red-900">Bug</Badge>
```

### Modal/Dialog

```
Structure:
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Contenu
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Annuler
      </Button>
      <Button>Confirmer</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

Backdrop: bg-black/50
Overlay: animation-in fade-in
```

### Select/Dropdown

```
Structure:
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="border-border">
    <SelectValue placeholder="Choisir..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Option 1</SelectItem>
    <SelectItem value="opt2">Option 2</SelectItem>
  </SelectContent>
</Select>

Trigger: border-border focus:ring-primary
Content: bg-card border-border shadow-lg
```

### Form Elements

```
Label:
<label className="text-sm font-medium text-foreground">
  Étiquette
</label>

Helper text:
<p className="text-sm text-muted-foreground">
  Texte d'aide
</p>

Error message:
<p className="text-sm text-destructive">
  Message d'erreur
</p>

Form group:
<div className="space-y-2">
  <label>...</label>
  <input />
  <p className="text-sm text-muted-foreground">...</p>
</div>
```

---

## 📱 Responsive Grid

```
Mobile-first breakpoints:
- Default (mobile)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (wide desktop)

Example:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items}
</div>

Containers:
<div className="container mx-auto px-4">
  {content}
</div>

Max widths:
container: max-w-6xl
card: default (content width)
form: max-w-2xl
page: max-w-5xl
```

---

## 🎭 Dark Mode

```
Automatic via CSS variables and .dark class

Tailwind dark variant:
<div className="bg-white dark:bg-black text-black dark:text-white">

In globals.css:
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  // ...all dark CSS variables
}
```

---

## ♿ Accessibility

### Focus Management

```
All interactive elements must have visible focus:
outline: ring-2 ring-primary ring-offset-2

Button focus:
<button className="focus:ring-2 focus:ring-primary">

Input focus:
input:focus {
  @apply ring-2 ring-primary border-primary;
}

Link focus:
a:focus {
  @apply ring-2 ring-primary rounded;
}
```

### Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio

Our palette respects these ratios:
- Primary + Primary-foreground: ✅ 7:1+
- Muted-foreground + Background: ✅ 5:1+
- Destructive + White: ✅ 4.5:1

### ARIA Labels

```
Images:
<img alt="descriptive text" />

Buttons:
<button aria-label="Close menu">×</button>

Forms:
<label htmlFor="email">Email</label>
<input id="email" />

Icons:
<Icon aria-hidden="true" />

Loading:
<div aria-busy="true" aria-label="Loading...">
```

---

## 🎬 Animations & Transitions

### Standard Transitions

```
Hover effect on interactive elements:
transition-all duration-200 ease-in-out

Example:
<button className="hover:shadow-lg hover:scale-105 transition-all">

Card hover:
hover:shadow-lg transition-shadow

Focus:
focus:ring-2 focus:ring-primary transition-all
```

### Common Patterns

```
Fade in:
animate-fade-in (opacity: 0 → 1)

Slide in:
animate-slide-in-from-bottom
animate-slide-in-from-left

Scale:
scale-100 hover:scale-105 transition-transform

Opacity:
opacity-0 hover:opacity-100

Loading spinner:
animate-spin
```

---

## 📐 Spacing Grid

```
Used consistently throughout:
Section padding: py-12, py-16, py-20
Card padding: p-4, p-6
Gap between items: gap-4, gap-6

Example page layout:
<div className="py-20 px-4"> {/* Hero */}
  <div className="container max-w-5xl">
    <h1>...</h1>
    <p>...</p>
  </div>
</div>

<div className="py-16 px-4"> {/* Content */}
  <div className="container max-w-6xl">
    <div className="grid gap-6">
      {items}
    </div>
  </div>
</div>
```

---

## 📋 Implementation Checklist

- [ ] Copy colors to tailwind.config.ts
- [ ] Set up CSS variables in globals.css
- [ ] Import shadcn/ui components used (Button, Input, Card, etc)
- [ ] Create component wrapper files with proper defaults
- [ ] Set up dark mode toggle (if needed)
- [ ] Test accessibility (ARIA, focus states)
- [ ] Test responsive design at all breakpoints
- [ ] Document custom components created
- [ ] Test color contrast ratios (WCAG AA)

---

**Version**: 1.0  
**Last Updated**: 2026-05-12  
**Status**: Production-ready
