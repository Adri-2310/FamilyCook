# 🏠 Page d'accueil (Landing Page)

## Description

La page d'accueil est la première impression que les visiteurs ont de FamilyCook. Elle doit être accueillante, claire et inciter à l'action tout en restant moderne et audacieuse.

**Statut**: Connecté  
**URL**: `/`  
**Authentification**: ❌ Non (page publique)  
**Responsive**: ✅ Mobile-first  

---

## Objectifs UX

- 🎯 **Comprendre** : En 10 secondes, l'utilisateur comprend ce qu'est FamilyCook
- 🎯 **Convaincre** : Montrer les bénéfices et la communauté (recettes trending)
- 🎯 **Agir** : Créer un CTA clair pour s'inscrire
- 🎯 **Explorer** : Permettre de regarder les recettes avant de s'inscrire

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Message principal** | "Cuisinez ensemble, savourerez ensemble" |
| **Sections clés** | Recettes trending + CTA création |
| **Feeling** | Chaleureuse et rassurante |
| **Affichage recettes** | Grille classique 3-4 colonnes |

---

## Maquette ASCII

```
┌────────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook              [Se connecter] [S'inscrire]        │
└────────────────────────────────────────────────────────────────┘

┌─ HERO SECTION ─────────────────────────────────────────────────┐
│                                                                │
│           Cuisinez ensemble, savourerez ensemble              │
│                                                                │
│      Créez, partagez et retrouvez vos recettes de famille    │
│                                                                │
│      [Rejoindre gratuitement]    [Voir les recettes]         │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌─ SECTION RECETTES ─────────────────────────────────────────────┐
│                                                                │
│  Recettes à découvrir                                         │
│  Les meilleures recettes partagées par notre communauté       │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │              │  │              │  │              │       │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │       │
│  │ (16:9 ratio) │  │ (16:9 ratio) │  │ (16:9 ratio) │       │
│  │              │  │              │  │              │       │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤       │
│  │ Titre        │  │ Titre        │  │ Titre        │       │
│  │ Recette      │  │ Recette      │  │ Recette      │       │
│  │ par User     │  │ par User     │  │ par User     │       │
│  │              │  │              │  │              │       │
│  │ Description  │  │ Description  │  │ Description  │       │
│  │ courte...    │  │ courte...    │  │ courte...    │       │
│  │              │  │              │  │              │       │
│  │ ⏱️ 30 min   │  │ ⏱️ 45 min   │  │ ⏱️ 25 min   │       │
│  │ 👥 4 pers    │  │ 👥 6 pers    │  │ 👥 2 pers    │       │
│  │ [❤️ 12]     │  │ [❤️ 28]     │  │ [❤️ 5]      │       │
│  │              │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │              │  │              │  │              │       │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │       │
│  │ (16:9 ratio) │  │ (16:9 ratio) │  │ (16:9 ratio) │       │
│  │              │  │              │  │              │       │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤       │
│  │ Titre        │  │ Titre        │  │ Titre        │       │
│  │ Recette      │  │ Recette      │  │ Recette      │       │
│  │ par User     │  │ par User     │  │ par User     │       │
│  │              │  │              │  │              │       │
│  │ Description  │  │ Description  │  │ Description  │       │
│  │ courte...    │  │ courte...    │  │ courte...    │       │
│  │              │  │              │  │              │       │
│  │ ⏱️ 30 min   │  │ ⏱️ 45 min   │  │ ⏱️ 25 min   │       │
│  │ 👥 4 pers    │  │ 👥 6 pers    │  │ 👥 2 pers    │       │
│  │ [❤️ 12]     │  │ [❤️ 28]     │  │ [❤️ 5]      │       │
│  │              │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌─ SECTION AVANTAGES ────────────────────────────────────────────┐
│                                                                │
│  Pourquoi FamilyCook ?                                        │
│                                                                │
│  ✓ Sauvegardez toutes vos recettes en un seul endroit        │
│  ✓ Partagez facilement avec votre famille                    │
│  ✓ Ajustez les portions automatiquement                      │
│  ✓ Organisez par catégories et difficultés                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌─ CTA FINAL ────────────────────────────────────────────────────┐
│                                                                │
│      Prêt à commencer votre collection ?                      │
│                                                                │
│           [Créer un compte gratuit]                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ © 2026 FamilyCook  |  À propos  |  Contact  |  Mentions légales│
└────────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Couleurs

#### Hero Section
```
Background: Gradient blanc → transparent
  - Start: #FFFFFF (oklch(1 0 0))
  - End: transparent
Text: Foreground (#252525)
  - h1: Bold, size-5xl md:size-6xl
  - p: size-xl md:size-2xl, text-muted-foreground
```

#### Recettes Cards
```
Card Background: #FFFFFF
Card Border: #EBEBEB (oklch(0.922 0 0))
Image: object-cover avec hover:scale-105
Text: Foreground avec line-clamp-2
```

#### CTA Buttons
```
Primary (rejoindre): 
  - Background: Primary (#342525)
  - Text: Primary-foreground (#F8F8F8)
  - Hover: shadow-lg

Secondary (voir recettes):
  - Background: transparent
  - Border: 1px border
  - Text: Foreground
  - Hover: shadow-lg
```

### Composants

```
Header:
├── Logo + Brand name (🍳 FamilyCook)
├── Navigation (sticky top-0 z-50)
└── Auth buttons (login/register)

Hero:
├── h1: "Cuisinez ensemble, savourerez ensemble"
├── p: Subtitle
└── Buttons: [Rejoindre] [Voir recettes]

Recipe Grid Section:
├── Title + Subtitle
├── Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6)
└── Recipe Cards × 6

Benefits Section:
├── Title
└── Features List (✓ items)

CTA Section:
├── Title
├── Subtitle
└── Button: [Créer compte]

Footer:
├── Copyright
└── Links (À propos, Contact, Mentions légales)
```

### Interactions

```
Navbar:
- Sticky au top avec z-50
- Hover sur links: text-primary avec transition

Recipe Cards:
- Card: hover:shadow-lg transition-shadow
- Image: group-hover:scale-105 transition-transform
- Title: hover:text-primary

Buttons:
- Tous les buttons: smooth transition au click
- Focus state: ring-primary/50

Pagination (future):
- Active: bg-primary
- Inactive: bg-muted hover:bg-muted/80
```

### Responsive

```
Mobile (< 768px):
- Grid: grid-cols-1
- Hero text: text-4xl (au lieu de text-6xl)
- Buttons: flex-col (stack vertical)
- Padding: px-4

Tablet (768px - 1024px):
- Grid: grid-cols-2
- Hero buttons: side by side

Desktop (> 1024px):
- Grid: grid-cols-3
- Full layout avec containers
```

---

## Notes de développement

### Points à considérer

1. **Images placeholder**: 
   - Utiliser `picsum.photos` ou `placeholder.com` en dev
   - En prod: serveur Blob Vercel
   - Ratio: 16:9 (aspect-ratio ou h-48 fixed)

2. **Performance**:
   - Next.js Image component pour optimization
   - Lazy loading des cards
   - Cache "no-store" car données dynamiques

3. **SEO**:
   - Metadata complète (Open Graph)
   - Alt text sur images
   - Heading hierarchy respectée

4. **Accessibilité**:
   - Color contrast WCAG AA
   - Focus states visibles
   - Alt text sur images
   - Semantic HTML

### API utilisée

```typescript
GET /api/recipes?visibility=PUBLIC&limit=6
Response: Recipe[]
```

### Fichiers impliqués

```
app/(public)/page.tsx      (Server component)
app/(public)/layout.tsx    (Layout public)
components/app-navbar.tsx  (Navbar)
components/footer.tsx      (Footer)
```

---

## Checklist d'implémentation

- [ ] Navbar sticky avec logo et CTA auth
- [ ] Hero section avec gradient et messages clés
- [ ] Fetch des 6 recettes publiques
- [ ] Recipe cards avec image, infos, favoris
- [ ] Benefits section avec 4 avantages
- [ ] CTA final avec button
- [ ] Footer simple
- [ ] Mobile responsive (grid-cols-1 → 3)
- [ ] Animations hover sur cards
- [ ] Accessibilité (focus states, alt text)
- [ ] Tests sur différentes résolutions
- [ ] Performance images (lazy loading)

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 4-6 heures (avec itérations)  
**Dépendances**: Aucune  
