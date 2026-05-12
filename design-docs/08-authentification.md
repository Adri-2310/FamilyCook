# 🔐 Authentification (Login & Register)

## Description

Les pages d'authentification permettent aux utilisateurs de créer un compte et se connecter. Deux pages : `/auth/login` et `/auth/register`.

**Statut**: Non connecté  
**URL**: `/auth/login` et `/auth/register`  
**Authentification**: ❌ Non  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Facilité d'accès** : OAuth options + Email/Password
- 🎯 **Clarté** : Formulaires simples et explicites
- 🎯 **Confiance** : Design professionnel et sécurisé
- 🎯 **Pas de friction** : Redirection intelligente post-login
- 🎯 **Responsive** : Fonctionne sur mobile

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Méthodes** | Email/Password + OAuth (Google, GitHub) |
| **Layout** | Moitié gauche image + moitié droite form |
| **Register** | Une page simple (Email, Password, Nom) |

---

## Maquette ASCII - LOGIN

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │              │  │                              │   │
│  │   ILLUSTRATION  │  Connexion                    │   │
│  │    / IMAGE     │                              │   │
│  │               │  Bienvenue sur FamilyCook!    │   │
│  │   (left side)  │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ [Google] [GitHub]        │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  ─── Ou ───                 │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ Email                    │ │   │
│  │               │  │ [user@example.com]       │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ Mot de passe             │ │   │
│  │               │  │ [••••••••••]             │ │   │
│  │               │  │ [👁️ Afficher]            │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  [☐ Se souvenir de moi]     │   │
│  │               │  [Mot de passe oublié?]     │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ [Se connecter]           │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  Pas encore de compte?      │   │
│  │               │  [Créer un compte]          │   │
│  │               │                              │   │
│  └──────────────┘  └──────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Maquette ASCII - REGISTER

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │              │  │                              │   │
│  │   ILLUSTRATION  │  Créer un compte             │   │
│  │    / IMAGE     │                              │   │
│  │               │  Bienvenue! Rejoignez        │   │
│  │   (left side)  │  la communauté FamilyCook    │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ [Google] [GitHub]        │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  ─── Ou ───                 │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ Nom complet              │ │   │
│  │               │  │ [Jean Dupont]            │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ Email                    │ │   │
│  │               │  │ [user@example.com]       │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ Mot de passe             │ │   │
│  │               │  │ [••••••••••]             │ │   │
│  │               │  │ [👁️ Afficher]            │ │   │
│  │               │  │                          │ │   │
│  │               │  │ ⬚⬜⬜ Force: Faible    │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  ☐ J'accepte les conditions │   │
│  │               │  ☐ Recevoir des emails      │   │
│  │               │                              │   │
│  │               │  ┌──────────────────────────┐ │   │
│  │               │  │ [Créer mon compte]       │ │   │
│  │               │  └──────────────────────────┘ │   │
│  │               │                              │   │
│  │               │  Vous avez déjà un compte?  │   │
│  │               │  [Se connecter]             │   │
│  │               │                              │   │
│  └──────────────┘  └──────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Login Page

```
Layout:
├── Left column (40%):
│   └── Illustration/Image (responsive)
└── Right column (60%):
    ├── Logo + Brand (top)
    ├── Heading: "Connexion"
    ├── Subheading: "Bienvenue sur FamilyCook!"
    ├── OAuth buttons (Google, GitHub)
    ├── Divider: "─── Ou ───"
    ├── Form:
    │   ├── Email input
    │   ├── Password input (with toggle show/hide)
    │   ├── Checkbox: "Se souvenir de moi"
    │   ├── Link: "Mot de passe oublié?"
    │   └── Submit button: "Se connecter"
    └── Footer:
        ├── Text: "Pas encore de compte?"
        └── Link: "Créer un compte"

Validation:
├── Email: required, valid email format
├── Password: required, min 8 chars
└── Live feedback on errors
```

### Register Page

```
Layout:
├── Left column (40%):
│   └── Illustration/Image
└── Right column (60%):
    ├── Logo + Brand (top)
    ├── Heading: "Créer un compte"
    ├── Subheading: "Rejoignez la communauté FamilyCook"
    ├── OAuth buttons (Google, GitHub)
    ├── Divider: "─── Ou ───"
    ├── Form:
    │   ├── Name input
    │   ├── Email input
    │   ├── Password input (with show/hide)
    │   │   └── Password strength indicator
    │   ├── Checkbox: "J'accepte les conditions"
    │   ├── Checkbox: "Recevoir des emails"
    │   └── Submit button: "Créer mon compte"
    └── Footer:
        ├── Text: "Vous avez déjà un compte?"
        └── Link: "Se connecter"

Validation:
├── Name: required, min 2 chars
├── Email: required, valid email, not already used
├── Password: required, min 8 chars, strength indicator
├── Terms: required checkbox
└── Live feedback + strength meter
```

### Couleurs

```
Form Inputs:
- Border: border-border
- Focus: ring-primary
- Background: bg-background

Buttons:
- Primary (Login/Register): bg-primary text-primary-foreground
- OAuth: bg-card border-border (Google blue, GitHub black)

Links:
- Color: text-primary hover:underline
- Forgot password: text-muted-foreground

Errors:
- Color: text-destructive
- Border: border-destructive
- Background: bg-destructive/5

Success:
- Color: text-green-600 (ou variant)

Password Strength:
- Weak: bg-red-500
- Medium: bg-yellow-500
- Strong: bg-green-500
```

### Composants

```
Form Input:
├── Label
├── Input field
├── Icon (password eye)
├── Error message (if any)
└── Helper text (optional)

OAuth Buttons:
├── Icon + Text
├── Hover effect
└── Loading state (spinner)

Password Strength Meter:
├── Bar (visual)
├── Text: "Faible", "Moyen", "Fort"
└── Requirements check (optional)

Divider:
├── "─── Ou ───"
└── Styled divider

Links:
├── "Mot de passe oublié?"
├── "Créer un compte"
├── "Se connecter"
└── Conditions d'utilisation (links)
```

### Interactions

```
OAuth Click:
- Redirect to provider
- Provider auth flow
- Create/update user
- Redirect to dashboard on success

Login Form Submit:
- Validate fields
- Show loading spinner
- POST /api/auth/login
- On success: Redirect to dashboard
- On error: Show error message

Register Form Submit:
- Validate all fields
- Check email not taken
- Show loading spinner
- POST /api/auth/register
- On success: Auto-login + redirect dashboard
- On error: Show error message

Password Field:
- Click eye icon: Toggle show/hide
- Maintain focus/cursor position

"Se souvenir de moi":
- Remember device for auto-login (future)

Links:
- Hover: Underline + color change
- Click: Smooth navigation
```

### Responsive

```
Mobile (< 768px):
- Hide left image
- Full width form
- Form centered with padding
- Buttons: full width
- Text: smaller but readable

Tablet (768px - 1024px):
- Image reduced (30%)
- Form full right side
- Normal layout

Desktop (> 1024px):
- Full 2-column layout
- Large illustration
- Form optimized
```

---

## Notes de développement

### API utilisée

```typescript
// Login
POST /api/auth/login
Body: {email, password, rememberMe}
Response: {user, token, redirectTo}

// Register
POST /api/auth/register
Body: {name, email, password}
Response: {user, token}

// OAuth callback
POST /api/auth/oauth/[provider]
Body: {code, state}
Response: {user, token}

// Check email exists
GET /api/auth/check-email?email=user@example.com
Response: {exists: boolean}

// Forgot password (future)
POST /api/auth/forgot-password
Body: {email}
```

### Better Auth Integration

```typescript
// Login with Better Auth
await signIn.password({
  email: userEmail,
  password: userPassword,
  onSuccess: () => redirect('/user/dashboard'),
  onError: (err) => showError(err.message)
})

// Sign up
await signUp.password({
  name: fullName,
  email: userEmail,
  password: userPassword,
  onSuccess: () => redirect('/user/dashboard')
})

// OAuth (Google/GitHub)
await signIn.oauth2({
  provider: 'google', // or 'github'
  onSuccess: () => redirect('/user/dashboard')
})
```

### Fichiers impliqués

```
app/auth/login/page.tsx
app/auth/register/page.tsx
app/auth/layout.tsx
components/auth/login-form.tsx
components/auth/register-form.tsx
components/auth/oauth-buttons.tsx
lib/auth.ts (Better Auth config)
api/auth/* (Better Auth routes)
```

### Considérations

1. **Sécurité**:
   - HTTPS only
   - CSRF protection
   - Rate limiting on endpoints
   - Password hashing
   - Secure cookies

2. **UX**:
   - Clear error messages
   - Loading states
   - Auto-focus first field
   - Enter key submits
   - Remember me functionality

3. **Accessibilité**:
   - Semantic labels
   - ARIA labels
   - Keyboard navigation
   - Focus states visible
   - Color not only indicator

4. **Email Verification**:
   - Optional: Verify email on signup
   - Send verification link
   - Expire after 24h
```

---

## Email Templates (Future)

```
- Verification email
- Password reset email
- Welcome email
- Account deletion email
```

---

## Features à Implémenter

### Phase 1 (MVP)
- [x] Email/Password login
- [x] Email/Password register
- [x] OAuth Google
- [x] OAuth GitHub
- [x] Form validation
- [x] Error handling

### Phase 2 (Enhancements)
- [ ] Remember me (device recognition)
- [ ] Email verification
- [ ] Forgot password flow
- [ ] Account deletion
- [ ] 2FA (future)
```

---

## Checklist d'implémentation

### Login Page

- [ ] Layout 2 colonnes
- [ ] Left: Illustration
- [ ] Logo/brand top
- [ ] Heading + subheading
- [ ] OAuth buttons (Google, GitHub)
- [ ] Divider
- [ ] Email input
- [ ] Password input with toggle
- [ ] "Se souvenir" checkbox
- [ ] "Mot de passe oublié" link
- [ ] Login button
- [ ] Register link
- [ ] Form validation
- [ ] Error display
- [ ] Loading state
- [ ] API integration

### Register Page

- [ ] Same layout as login
- [ ] Name input field
- [ ] Email input
- [ ] Password input with strength meter
- [ ] Password strength indicator
- [ ] Terms checkbox
- [ ] Newsletter checkbox
- [ ] Register button
- [ ] Login link
- [ ] Form validation
- [ ] Email availability check (live)
- [ ] Error display
- [ ] Loading state
- [ ] API integration
- [ ] Auto-login after register

### General

- [ ] Responsive design (mobile/tablet)
- [ ] OAuth integration (Better Auth)
- [ ] Error handling & toasts
- [ ] Loading states with spinners
- [ ] Forgot password link (future)
- [ ] Terms of service link
- [ ] Privacy policy link
- [ ] Remember me functionality (future)

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 6-8 heures (avec OAuth setup)  
**Dépendances**: Better Auth configured, OAuth providers (Google, GitHub)
