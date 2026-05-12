# 🔑 Récupération de Mot de Passe

## Description

Flux complet de récupération de mot de passe en 2 étapes: demande par email et reset password. Permet aux utilisateurs qui ont oublié leur mot de passe de créer un nouveau en toute sécurité.

**Statut**: Public  
**URL**: `/auth/forgot-password` + `/auth/reset-password/[token]`  
**Authentification**: ❌ Non requise  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Sécurité** : Vérification par email, token expirant
- 🎯 **Simplicité** : 2 étapes claires et efficaces
- 🎯 **Guidance** : Messages clairs à chaque étape
- 🎯 **Accessibilité** : Pas de friction pour utilisateurs bloqués
- 🎯 **Clarté** : Distinction email valide vs token invalide

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Après reset réussi, redirection?** | Vers /auth/login (user se reconnecte) |
| **Expiration du token?** | 30 minutes (standard) |
| **Tentatives limites?** | Non mentionné, gérer côté serveur |
| **Email pas trouvé?** | Message "Vérifiez votre email" quand même (sécurité) |

---

## Flux Utilisateur

```
User clique "Mot de passe oublié?" sur login
        ↓
Page 1: Saisir email
        ↓
Valider email (POST /auth/forgot-password)
        ↓
Page success: "Vérifiez votre email" (20 sec auto-redirect)
        ↓
User reçoit email avec lien reset
        ↓
Clic lien email → Page 2: /auth/reset-password/[token]
        ↓
Formulaire: nouveau password + confirm
        ↓
POST /auth/reset-password avec token
        ↓
Success page
        ↓
Auto-redirect vers /auth/login après 3 sec
        ↓
User se connecte avec nouveau password
```

---

## Maquette ASCII

### Page 1: Demande de Récupération

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    [Login]   │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE CONTAINER ──────────────────────────────────────────┐
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                                                     │ │
│  │  🔐 Récupérer mon mot de passe                    │ │
│  │                                                     │ │
│  │  Pas de souci! Entrez votre email et nous vous    │ │
│  │  enverrons un lien pour réinitialiser votre       │ │
│  │  mot de passe en sécurité.                        │ │
│  │                                                     │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │ Adresse email                               │  │ │
│  │  │ [votre@email.com]                           │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  │                                                     │ │
│  │  [Envoyer lien de réinitialisation]               │ │
│  │                                                     │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │ Vous avez votre mot de passe?               │  │ │
│  │  │ [Retour à la connexion]                     │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
└─────────────────────────────────────────────────────────────┘

ERROR STATE (email invalide):
┌────────────────────────────────────────────────────────────┐
│  ❌ Email invalide                                         │
│  Veuillez entrer une adresse email valide                 │
└────────────────────────────────────────────────────────────┘
```

### Page 2: Lien Envoyé (Success)

```
┌─ SUCCESS STATE ────────────────────────────────────────────┐
│                                                           │
│                    ✅ Email envoyé!                      │
│                                                           │
│  Nous avons envoyé un lien de réinitialisation à:       │
│  [votre@email.com]                                       │
│                                                           │
│  Vérifiez votre boîte mail et cliquez sur le lien       │
│  pour réinitialiser votre mot de passe.                 │
│                                                           │
│  Le lien expirera dans 30 minutes.                       │
│                                                           │
│  [Retour à la connexion]                                │
│                                                           │
│  Vous ne trouvez pas l'email?                           │
│  [Vérifiez les spams] ou [Renvoyer le lien]            │
│                                                           │
│  (Auto-redirect dans 5 secondes...)                     │
│                                                           │
└─────────────────────────────────────────────────────────────┘
```

### Page 3: Réinitialisation (Reset Password)

```
┌─ PAGE RESET PASSWORD ─────────────────────────────────────┐
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                                                     │ │
│  │  🔑 Créer un nouveau mot de passe                 │ │
│  │                                                     │ │
│  │  Créez un mot de passe fort pour sécuriser votre  │ │
│  │  compte.                                           │ │
│  │                                                     │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │ Nouveau mot de passe                        │  │ │
│  │  │ [••••••••••••]                              │  │ │
│  │  │                                             │  │ │
│  │  │ ✓ Au moins 8 caractères                    │  │ │
│  │  │ ✗ Au moins 1 majuscule                     │  │ │
│  │  │ ✗ Au moins 1 chiffre                       │  │ │
│  │  │ ✓ Au moins 1 caractère spécial             │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  │                                                     │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │ Confirmer mot de passe                      │  │ │
│  │  │ [••••••••••••]                              │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  │                                                     │ │
│  │  [Réinitialiser mon mot de passe]                │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Token invalide ou expiré?                              │
│  [Demander un nouveau lien]                             │
│                                                           │
└─────────────────────────────────────────────────────────────┘

ERROR STATE (token invalid/expired):
┌────────────────────────────────────────────────────────────┐
│  ⚠️  Lien invalide ou expiré                             │
│  Ce lien n'est plus valide (expiré ou déjà utilisé)     │
│  [Demander un nouveau lien]                             │
└────────────────────────────────────────────────────────────┘

ERROR STATE (password mismatch):
┌────────────────────────────────────────────────────────────┐
│  ❌ Les mots de passe ne correspondent pas               │
│  Veuillez vérifier que les deux champs sont identiques   │
└────────────────────────────────────────────────────────────┘
```

### Page 4: Success

```
┌─ RESET SUCCESS ────────────────────────────────────────────┐
│                                                           │
│                    ✅ Réinitialisation réussie!          │
│                                                           │
│  Votre mot de passe a été changé avec succès.           │
│  Vous pouvez maintenant vous connecter.                 │
│                                                           │
│  [Aller à la connexion]                                 │
│                                                           │
│  (Auto-redirect dans 3 secondes...)                     │
│                                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Page 1: Forgot Password Form

```
Layout:
├── Card container (max-w-md)
├── Icon: 🔐
├── Title: "Récupérer mon mot de passe"
├── Description: Explanation text
├── Form:
│   ├── Email input (required, validated)
│   ├── Submit button (primary)
│   └── Link "Retour à la connexion"
└── Responsive: Center on all screens
```

### Form Validation

```
Email field:
├── Required: yes
├── Format: Valid email (RFC 5322)
├── Real-time validation: On blur
├── Error message: "Email invalide"
├── Focus state: ring-primary

Submit button:
├── Disabled: If email invalid
├── Loading state: Show spinner + disable
├── On submit: POST /auth/forgot-password
```

### Page 2: Email Sent Confirmation

```
Success state:
├── Icon: ✅ (green)
├── Title: "Email envoyé!"
├── Message: "Nous avons envoyé un lien à [email]"
├── Details: "Expirera dans 30 minutes"
├── Actions:
│   ├── [Retour à la connexion]
│   └─ [Renvoyer le lien]
└── Auto-redirect: 5 sec → /auth/login

Email obfuscation (security):
└── votre@email.com → vo***@email.com
```

### Page 3: Reset Password Form

```typescript
Input validation:
├── Password:
│   ├── Min 8 characters
│   ├── At least 1 uppercase
│   ├── At least 1 number
│   ├── At least 1 special char
│   └── Real-time strength indicator
│
├── Confirm password:
│   ├── Must match password field
│   └── Real-time validation
│
└── Submit button:
    ├── Disabled: If form invalid
    ├── Loading state: Show spinner
    └── On submit: POST /auth/reset-password

Token handling:
├── Extract from URL: /reset-password/[token]
├── Validate token format
├── Send with request
└── Handle expired/invalid
```

### Password Strength Indicator

```
Display live as user types:
✓ Au moins 8 caractères
✗ Au moins 1 majuscule
✗ Au moins 1 chiffre
✓ Au moins 1 caractère spécial

Color coding:
├── ✗ Red: Not met
├── ✓ Green: Met
└── Submit: Enabled only if ALL checked
```

### Couleurs & Style

```
Forgot password card:
- Background: bg-card
- Border: border-border
- Max-width: max-w-md

Success state:
- Icon: text-green-600
- Background: bg-green-50

Error state:
- Icon: text-destructive
- Background: bg-destructive/10

Form inputs:
- Border: border-border
- Focus: ring-primary
- Error: border-destructive

Password strength:
- Met: text-green-600
- Not met: text-muted-foreground
```

### Interactions

```
Step 1: Forgot Password
├── Enter email
├── Submit: POST /auth/forgot-password
├── Success: Show confirmation page
├── Auto-redirect: 5 sec → /auth/login
└── Or: Manual click [Retour à la connexion]

Step 2: Reset Password
├── Receive email with link
├── Clic lien: Open /auth/reset-password/[token]
├── Validate token on page load
├── If invalid: Show error + [Demander nouveau lien]
├── If valid: Show form
└── Enter new password + confirm

Step 3: Submit Reset
├── POST /auth/reset-password
├── Body: {token, newPassword}
├── Success: Show success message
├── Auto-redirect: 3 sec → /auth/login
└── User logs in with new password
```

### Responsive

```
Mobile (< 768px):
- Card: Full width - px-4
- Inputs: Full width
- Buttons: Full width

Tablet/Desktop (> 768px):
- Card: Centered, max-w-md
- Inputs: Normal
- Buttons: Normal
```

---

## Notes de développement

### API utilisée

```typescript
// Demander un lien de reset
POST /auth/forgot-password
Body: {email: string}
Response: {
  200: {success: true, message: "Email sent"},
  400: "Invalid email format",
  429: "Too many requests"
}
Rate limit: 3 per hour per IP

// Réinitialiser le mot de passe
POST /auth/reset-password
Body: {
  token: string (from email link),
  newPassword: string (min 8, strong)
}
Response: {
  200: {success: true},
  400: "Invalid or expired token",
  422: "Password validation failed"
}

// Valider le token (optionnel, côté client)
GET /auth/reset-password/validate?token=[token]
Response: {
  200: {valid: true},
  400: {valid: false, reason: "expired|invalid"}
}
```

### Email Template

```html
<!-- Email envoyé à l'utilisateur -->
Subject: Réinitialiser votre mot de passe FamilyCook

Bonjour [Name],

Quelqu'un a demandé la réinitialisation du mot de passe pour ce compte.
Si ce n'est pas vous, ignorez cet email.

Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous:

[Réinitialiser mon mot de passe]
https://familycook.app/auth/reset-password/[token]

Ce lien expirera dans 30 minutes.

---
© 2026 FamilyCook
```

### Fichiers impliqués

```
app/auth/forgot-password/page.tsx
app/auth/reset-password/[token]/page.tsx
components/auth/
  ├── forgot-password-form.tsx
  ├── reset-password-form.tsx
  ├── password-strength-indicator.tsx
  └── email-confirmation.tsx
api/auth/forgot-password (POST)
api/auth/reset-password (POST)
lib/email-service.ts (send email)
lib/password-utils.ts (strength check)
```

### Considérations

1. **Sécurité**:
   - Token: cryptographiquement sécurisé (32 chars+ random)
   - Expiration: 30 minutes
   - One-time use: Token invalidé après utilisation
   - Rate limiting: 3 emails par IP par heure
   - Password hashing: bcrypt salt 12

2. **Email Delivery**:
   - Use reliable email service (SendGrid, Resend, etc)
   - Handle bounces
   - Resend link option

3. **UX**:
   - Don't reveal if email exists (security)
   - Always show "Email sent" même si email inconnu
   - Clear token expiration message
   - Auto-redirect after success

4. **Token Storage**:
   - Store hashed token in DB
   - Store expiration timestamp
   - Delete after use

5. **Error Handling**:
   - Invalid email format
   - Email not found (don't reveal)
   - Token invalid/expired
   - Password doesn't match confirmation
   - Password too weak

---

## Checklist d'implémentation

### Page 1: Forgot Password
- [ ] Create /auth/forgot-password route
- [ ] Build email input form
- [ ] Implement email validation
- [ ] Add submit button (disabled when invalid)
- [ ] POST to /auth/forgot-password endpoint
- [ ] Show success confirmation page
- [ ] Auto-redirect after 5 sec
- [ ] Add link to return to login

### Page 2: Email Confirmation
- [ ] Show success message
- [ ] Display obfuscated email
- [ ] Show expiration time (30 min)
- [ ] Add [Retour à la connexion] link
- [ ] Add [Renvoyer le lien] link
- [ ] Implement auto-redirect

### Page 3: Reset Password Form
- [ ] Create /auth/reset-password/[token] route
- [ ] Extract token from URL
- [ ] Validate token format
- [ ] Build password input form
- [ ] Add password strength indicator
- [ ] Add confirm password field
- [ ] Real-time validation
- [ ] Show validation errors
- [ ] Disable submit if invalid
- [ ] POST to /auth/reset-password

### Password Strength Indicator
- [ ] Check 8+ characters
- [ ] Check 1+ uppercase
- [ ] Check 1+ number
- [ ] Check 1+ special char
- [ ] Display with checkmarks/crosses
- [ ] Color code (red/green)
- [ ] Update in real-time

### Error Handling
- [ ] Invalid email format
- [ ] Invalid token
- [ ] Expired token
- [ ] Passwords don't match
- [ ] Password too weak
- [ ] Network errors
- [ ] Show helpful messages

### Success State
- [ ] Show success message
- [ ] Display password reset confirmation
- [ ] Auto-redirect after 3 sec
- [ ] Or allow manual click to login

### Email Service
- [ ] Implement email sending
- [ ] Create email template
- [ ] Generate secure token
- [ ] Store token in DB with expiration
- [ ] Handle email delivery failures

### Responsive Design
- [ ] Mobile: Full width forms
- [ ] Tablet: Centered card
- [ ] Desktop: Centered, max-w-md
- [ ] Test all sizes

### Accessibility
- [ ] Focus management
- [ ] ARIA labels
- [ ] Screen reader friendly
- [ ] Keyboard navigation
- [ ] Color contrast

---

## Dépendances

- ✅ API endpoints: `/auth/forgot-password`, `/auth/reset-password`
- ✅ Better Auth setup (token generation, hashing)
- ✅ Email service (SendGrid, Resend, etc)
- ✅ 08-authentification.md: Link "Mot de passe oublié?"

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Priorité**: 🟠 HAUTE (UX essentiel)  
**Estimé**: 4-5 heures (2 pages + email + API)  
**Dépendances**: Email service, Better Auth, token generation
