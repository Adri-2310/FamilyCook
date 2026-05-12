# 📧 Page Contact

## Description

La page de contact permet à tous les visiteurs (connectés ou non) de soumettre des messages, bugs reports, feedback et questions. C'est un canal de communication directe avec l'équipe.

**Statut**: Publique  
**URL**: `/contact`  
**Authentification**: ❌ Non (mais amélioré si connecté)  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Accessibilité** : Ouvert à tous, pas de friction
- 🎯 **Guidance** : Catégoriser les messages pour triage rapide
- 🎯 **Efficacité** : Pré-remplir pour users connectés
- 🎯 **Clarté** : Qu'est-ce qu'un bug vs feedback vs question
- 🎯 **Confirmation** : Feedback utilisateur après envoi

---

## Maquette ASCII

### Non-connecté
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    [Login]   │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  Nous écrire                                                │
│  Une question? Un bug? Une idée?                           │
│  On adore avoir de vos nouvelles!                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FORMULAIRE CONTACT ──────────────────────────────────────┐
│                                                           │
│  ┌─ Votre nom ────────────────────────────┐             │
│  │ [Votre nom complet]                    │             │
│  └────────────────────────────────────────┘             │
│                                                           │
│  ┌─ Votre email ──────────────────────────┐             │
│  │ [votre@email.com]                      │             │
│  └────────────────────────────────────────┘             │
│                                                           │
│  ┌─ Type de message ──────────────────────┐             │
│  │ [Choisir un type ▼]                    │             │
│  │ 🐛 Bug report                          │             │
│  │ 💡 Feedback/Suggestion                 │             │
│  │ ❓ Question/Support                    │             │
│  └────────────────────────────────────────┘             │
│                                                           │
│  ┌─ Message ──────────────────────────────┐             │
│  │ Décrivez votre message en détail...    │             │
│  │                                         │             │
│  │ [Ajoutez autant de détails que vous    │             │
│  │  le souhaitez, cela nous aide vraiment]│             │
│  │                                         │             │
│  └────────────────────────────────────────┘             │
│                                                           │
│  ☐ J'accepte d'être contacté par email                 │
│                                                           │
│  [Envoyer mon message]                                 │
│                                                           │
└─────────────────────────────────────────────────────────────┘
```

### Connecté (pré-rempli)
```
┌─ FORMULAIRE CONTACT (Simplifié) ──────────────────────────┐
│                                                           │
│  Bienvenue Jean Dupont!                                  │
│  jean@example.com                                        │
│  (Pas toi? [Changer utilisateur])                        │
│                                                           │
│  ┌─ Type de message ──────────────────────┐             │
│  │ [Choisir un type ▼]                    │             │
│  │ 🐛 Bug report                          │             │
│  │ 💡 Feedback/Suggestion                 │             │
│  │ ❓ Question/Support                    │             │
│  └────────────────────────────────────────┘             │
│                                                           │
│  ┌─ Message ──────────────────────────────┐             │
│  │ [Focus ici - votre message]             │             │
│  │                                         │             │
│  │                                         │             │
│  └────────────────────────────────────────┘             │
│                                                           │
│  ☐ Me contacter par email avec réponse                  │
│                                                           │
│  [Envoyer mon message]                                  │
│                                                           │
└─────────────────────────────────────────────────────────────┘

┌─ POST-ENVOI (Success) ────────────────────────────────────┐
│                                                           │
│  ✅ Merci!                                               │
│                                                           │
│  Votre message a été envoyé avec succès.               │
│  Nous vous répondrons dès que possible.                │
│                                                           │
│  Numéro de référence: #MSG-2026-0512-001               │
│                                                           │
│  [← Retour à l'accueil]                                │
│                                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Layout & Structure

```
Page Header:
├── h1: "Nous écrire"
├── p1: "Une question? Un bug? Une idée?"
└── p2: "On adore avoir de vos nouvelles!"

Form Section:
├── User info block (si connecté):
│   ├── "Bienvenue [Name]!"
│   ├── "[Email]"
│   └── "[Changer utilisateur]" link
├── OR User inputs (si non-connecté):
│   ├── Name input
│   └── Email input
├── Message type select
├── Message textarea
├── Email consent checkbox
└── Submit button

Success State:
├── Checkmark icon
├── Success message
├── Reference number
└── Back link
```

### Formulaire - Non-connecté

```
Fields:
├── Name:
│   ├── Label: "Votre nom"
│   ├── Placeholder: "Votre nom complet"
│   ├── Required: yes
│   └── Min length: 2
├── Email:
│   ├── Label: "Votre email"
│   ├── Type: email
│   ├── Required: yes
│   └── Validation: valid email format
├── Message Type:
│   ├── Label: "Type de message"
│   ├── Required: yes
│   └── Options:
│       ├── 🐛 Bug report
│       ├── 💡 Feedback/Suggestion
│       └── ❓ Question/Support
├── Message:
│   ├── Label: "Message"
│   ├── Placeholder: "Décrivez votre message..."
│   ├── Required: yes
│   ├── Min length: 10
│   └── Max length: 5000
└── Consent:
    ├── Checkbox: "J'accepte d'être contacté par email"
    └── Optional: checked by default
```

### Formulaire - Connecté (Simplifié)

```
Autofilled:
├── Name: user.name (non-modifiable ou read-only)
├── Email: user.email (avec link "Changer utilisateur")

User can change:
├── (Cas rare) Link: [Changer utilisateur]
│   └── Logs out, redirects to /contact (non-connecté)

Same as non-connecté:
├── Message Type
├── Message (textarea)
└── Consent checkbox
```

### Couleurs & Style

```
Form inputs:
- Border: border-border
- Focus: ring-primary
- Background: bg-background

Labels:
- Color: text-foreground
- Font: regular, small

Message type select:
- Options avec emoji
- Hover: bg-muted

TextArea:
- Height: h-40 (minimum)
- Resize: allowed (vertical only)
- Font: mono for better readability

Buttons:
- Submit: primary (bg-primary)
- Back: outline

Success state:
- Checkmark: text-green-600 (ou primary variant)
- Background: bg-green-50/10
- Border: border-green-200
```

### Interactions

```
Form Loading:
- Submit click: Disable button, show spinner
- Duration: 1-3 seconds
- Success: Show success page
- Error: Show error toast + keep form

Form Validation:
- Real-time: On blur (name, email)
- On submit: All fields
- Errors: Red border + error message below

Non-connecté → Connecté:
- Page détecte login (refresh ou state update)
- Refactorise form (pré-remplit)
- Smooth transition (fade?)

Email change link [Changer utilisateur]:
- Click: POST /api/auth/logout
- Redirect: /contact (GET)
- Form vide et prête

Success page:
- Reference number: #MSG-YYYY-MMDD-NNNNN (ex: MSG-2026-0512-001)
- Copy-to-clipboard button (future)?
- Auto-redirect to home après 5 sec (ou user clique [Retour])
```

### Responsive

```
Mobile (< 768px):
- Form inputs: Full width
- Textarea: Smaller height (h-32)
- Buttons: Full width
- Success state: Centered, smaller font

Tablet (768px - 1024px):
- Form: Normal layout
- Success state: Centered card

Desktop (> 1024px):
- Form: max-w-2xl centered
- Success state: Centered card
```

---

## Notes de développement

### API utilisée

```typescript
// Submit contact message
POST /api/contact
Body: {
  name: string (required)
  email: string (required, valid email)
  type: 'BUG' | 'FEEDBACK' | 'QUESTION'
  message: string (required, 10-5000 chars)
  userId?: string (if authenticated)
  consentEmail: boolean
}
Response: {
  success: boolean
  referenceNumber: string // #MSG-YYYY-MMDD-NNNNN
  message: string
}

// Get current user (for pre-fill if logged in)
GET /api/user/profile
Response: {name, email}
```

### Fichiers impliqués

```
app/(public)/contact/page.tsx
components/contact/contact-form.tsx
components/contact/contact-success.tsx
api/contact (POST)
lib/contact-utils.ts
```

### Considérations

1. **Spam Prevention**:
   - Rate limiting: 5 messages per IP per day
   - Honeypot field (hidden field to catch bots)
   - CSRF token validation

2. **Security**:
   - Sanitize user input (XSS protection)
   - Email validation (DNS check?)
   - Verify email domain

3. **UX**:
   - Show success page (not just toast)
   - Reference number for follow-up
   - Email opt-in visible

4. **Email Notification**:
   - Admin receives email with message
   - Reference number in subject
   - Reply-to: sender email

5. **Admin Interface**:
   - Messages visible in /admin/messages tab (doc 10)
   - Filter by type, status, date
   - Mark as read/resolved
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Create /contact route
- [ ] Detect if user is logged in
- [ ] Conditionally render form (full vs simplified)

### Non-connecté Form

- [ ] Name input (required, min 2)
- [ ] Email input (required, valid format)
- [ ] Message type select (Bug, Feedback, Question)
- [ ] Message textarea (required, 10-5000 chars)
- [ ] Email consent checkbox
- [ ] Submit button

### Connecté Form

- [ ] Show user name + email (read-only)
- [ ] [Changer utilisateur] link
- [ ] Same message type select
- [ ] Same message textarea
- [ ] Same consent checkbox
- [ ] Auto-focus textarea

### Form Validation

- [ ] Real-time validation (blur)
- [ ] Submit validation (all fields)
- [ ] Show error messages
- [ ] Disable submit if invalid

### API Integration

- [ ] POST /api/contact endpoint
- [ ] Rate limiting (5 per day per IP)
- [ ] Honeypot field for spam
- [ ] Email sanitization
- [ ] Generate reference number

### Success State

- [ ] Show success page after submit
- [ ] Display reference number
- [ ] Show confirmation message
- [ ] [← Retour] button
- [ ] Auto-redirect after 5 sec (optional)

### Email Notifications

- [ ] Send email to admin with message
- [ ] Include reference number
- [ ] Include sender email
- [ ] Include message type
- [ ] Include timestamp

### Admin Side

- [ ] Messages appear in /admin/messages
- [ ] Can filter by type, status
- [ ] Can mark as resolved
- [ ] Can delete message

### Edge Cases

- [ ] User gets logged out mid-form
- [ ] Very long message (5000 chars)
- [ ] Special characters in message
- [ ] No internet connection (offline)
- [ ] Multiple rapid submissions

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 3-4 heures (form + API + emails)  
**Dépendances**: Email service, rate limiting, spam prevention
