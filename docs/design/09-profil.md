# 👤 Profil Utilisateur

## Description

La page profil permet à l'utilisateur de voir et modifier ses informations personnelles, préférences et sécurité. Organisée en 3 onglets : Profil, Paramètres, Sécurité.

**Statut**: Connecté  
**URL**: `/user/profile` (avec tabs)  
**Authentification**: ✅ Oui  
**Responsive**: ✅ Mobile-first

---

## Objectifs UX

- 🎯 **Contrôle** : Utilisateur maître de ses données
- 🎯 **Sécurité** : Gestion des mots de passe et 2FA
- 🎯 **Personnalisation** : Langue, notifications
- 🎯 **Clarté** : Organisation logique par onglets
- 🎯 **Confiance** : Affichage transparent des settings

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Sections** | Avatar + Nom + Stats éditable |
| **Navigation** | Tabs: Profil \| Paramètres \| Sécurité |
| **Tab 1** | Profil: Avatar + Nom + Stats |
| **Tab 2** | Paramètres: Notifications + Langue |
| **Tab 3** | Sécurité: Password + 2FA |
| **Avatar** | Gravatar ou initiales (pas upload) |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Nom👤 [☰] │
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  Profil                                                     │
│  Gérez vos informations personnelles                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TABS ──────────────────────────────────────────────────────┐
│                                                             │
│  [Profil]  [Paramètres]  [Sécurité]                        │
│  ────────                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 1: PROFIL ────────────────────────────────────────────┐
│                                                             │
│  Avatar & Identité                                          │
│                                                             │
│  ┌─ Avatar ─────────────┐                                  │
│  │                      │  JD                              │
│  │   (initiales ou      │  Jean Dupont                    │
│  │    gravatar 64x64)   │                                  │
│  │                      │                                  │
│  └──────────────────────┘  Basé sur votre email           │
│                            (Gravatar.com)                  │
│                                                             │
│  ┌─ Nom complet ─────────────────────────────┐            │
│  │ Jean Dupont                                │  [✏️ Éditer]│
│  └────────────────────────────────────────────┘            │
│                                                             │
│  ┌─ Email (non-modifiable) ───────────────────┐           │
│  │ jean@example.com                           │            │
│  │ (Connecté via [Google] ou [Email])         │            │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Statistiques                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────┐          │
│  │   📝 4      │  │   ⭐ 12      │  │  🌐 2   │          │
│  │  Recettes   │  │   Favoris    │  │ Publiques│          │
│  └─────────────┘  └──────────────┘  └─────────┘          │
│                                                             │
│  Membre depuis: 15 mars 2024                              │
│                                                             │
│                                   [Supprimer mon compte]   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 2: PARAMÈTRES ────────────────────────────────────────┐
│                                                             │
│  Notifications                                              │
│  ┌─────────────────────────────────────────┐              │
│  │ ☑ Emails de bienvenue                   │              │
│  │ ☑ Récap hebdomadaire des recettes      │              │
│  │ ☐ Notifications de nouvelles recettes  │              │
│  │ ☐ Suggestions personnalisées           │              │
│  └─────────────────────────────────────────┘              │
│                                                             │
│  Langue                                                    │
│  ┌──────────────────────────┐                             │
│  │ Langue de l'app: [FR ▼]  │                             │
│  │ Français ✓               │                             │
│  │ English                  │                             │
│  └──────────────────────────┘                             │
│                                                             │
│  Autres paramètres                                         │
│  ☑ Profil public (autres peuvent voir vos recettes)      │
│                                                             │
│                              [Sauvegarder]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 3: SÉCURITÉ ──────────────────────────────────────────┐
│                                                             │
│  Mot de passe                                              │
│  [Modifier le mot de passe]                               │
│  Dernière modification: 15 mars 2024                      │
│                                                             │
│  Authentification à deux facteurs (2FA)                   │
│  ☐ Désactivé                                              │
│  [Activer 2FA]                                            │
│                                                             │
│  Sessions actives                                          │
│  ┌─ Appareil actuel ─────────────────────┐               │
│  │ Chrome • Windows • Connecté           │               │
│  │ Dernière activité: À l'instant       │               │
│  │ Adresse IP: 192.168.1.100            │  [Déconnecter]│
│  └───────────────────────────────────────┘               │
│                                                             │
│  ┌─ iPhone ──────────────────────────────┐               │
│  │ Safari Mobile • iOS • Connecté        │               │
│  │ Dernière activité: Il y a 2 heures   │  [Déconnecter]│
│  └───────────────────────────────────────┘               │
│                                                             │
│                    [Déconnecter partout]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FOOTER ───────────────────────────────────────────────────┐
│ © 2026 FamilyCook | À propos | Contact | Mentions légal   │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Tab 1: Profil

```
Avatar Section:
├── Avatar display (gravatar ou initiales)
│   └── Size: 64x64px
├── Text: "Basé sur votre email (Gravatar.com)"
└── No upload, generated from email

Personal Info:
├── Full Name:
│   ├── Display value
│   ├── [✏️ Éditer] button
│   └── Edit mode: Input field + [Sauvegarder] [Annuler]
├── Email:
│   ├── Display only (non-modifiable)
│   └── Note: "Connecté via [Google] ou [Email]"

Stats Section:
├── Card 1: Recettes (count)
├── Card 2: Favoris (count)
├── Card 3: Recettes publiques (count)
└── Each card clickable → navigate to section

Member Since:
└── Display: "Membre depuis: [date]"

Danger Zone:
└── Button: [Supprimer mon compte]
    ├── Red/destructive styling
    └── Opens confirm dialog
```

### Tab 2: Paramètres

```
Notifications:
├── Section title: "Notifications"
├── Checkbox: "Emails de bienvenue"
├── Checkbox: "Récap hebdomadaire"
├── Checkbox: "Nouvelles recettes"
├── Checkbox: "Suggestions personnalisées"
└── Each with description text

Langue:
├── Section title: "Langue"
├── Select: Current language [FR ▼]
├── Language list:
│   ├── Français ✓ (current)
│   └── English (future)

Profile Visibility:
├── Checkbox: "Profil public"
├── Description: "Autres utilisateurs verront vos recettes publiques"

Save Button:
└── [Sauvegarder] (primary, at bottom)
```

### Tab 3: Sécurité

```
Password:
├── Section title: "Mot de passe"
├── Info: "Dernière modification: [date]"
└── Button: [Modifier le mot de passe]
    └── Opens dialog/page with:
        ├── Current password input
        ├── New password input
        ├── Confirm password input
        └── [Sauvegarder] [Annuler]

2FA:
├── Section title: "Authentification à deux facteurs"
├── Status: ☐ Désactivé (or ☑ Activé)
└── Button: [Activer 2FA] ou [Désactiver 2FA]
    └── Opens setup wizard (future)

Active Sessions:
├── Section title: "Sessions actives"
├── Current device badge
├── Session cards:
│   ├── Device name (Chrome, Safari Mobile, etc)
│   ├── OS (Windows, iOS, etc)
│   ├── Status: Connecté
│   ├── Last activity: "À l'instant" / "Il y a X"
│   ├── IP address
│   └── Button: [Déconnecter]
└── Global button: [Déconnecter partout]
```

### Couleurs

```
Tabs:
- Active: text-primary border-primary
- Inactive: text-muted-foreground
- Border: border-border

Cards/Sections:
- Background: bg-card
- Border: border-border
- Hover: shadow-sm

Edit Mode:
- Input: variant="outline" ring-primary

Stats Cards:
- Icon: text-primary/80
- Number: text-2xl font-bold
- Label: text-sm text-muted-foreground

Danger Zone:
- Text: text-destructive
- Button: variant="destructive"

Session Cards:
- Current device: bg-primary/10 border-primary
- Other devices: bg-muted/30
```

### Interactions

```
Edit Name:
- Click [✏️ Éditer]: Switch to edit mode
- Input focused automatically
- [Sauvegarder]: Validate, POST, show toast
- [Annuler]: Revert to display mode

Notifications:
- Click checkbox: Toggle + auto-save
- Toast: "Paramètres mis à jour"

Language Select:
- Change: Auto-apply language
- Reload page (or partial update)
- Toast: "Langue changée en Français"

Delete Account:
- Click [Supprimer]: Open confirm dialog
  - Title: "Supprimer mon compte?"
  - Message: "Cette action est irréversible..."
  - Buttons: [Annuler] [Supprimer définitivement]
- On confirm: Delete account + redirect to home

Change Password Dialog:
- Fields: Current, New, Confirm
- Validation: All required, new != old
- On submit: Change + toast + close dialog

Enable 2FA:
- Click [Activer 2FA]: Open setup wizard
- Show QR code for authenticator
- Enter verification code
- Show recovery codes
- Save + toast "2FA activée"

Sessions:
- Click [Déconnecter]: POST to logout device
- Toast: "Appareil déconnecté"
- Remove card with animation
```

### Responsive

```
Mobile (< 768px):
- Tabs: Scroll horizontal if needed
- Cards: Full width
- Avatar: Smaller (48x48)
- Buttons: Full width
- Session cards: Stack vertical

Tablet (768px - 1024px):
- Normal layout
- Cards: 2 per row where possible
- Tabs: Normal

Desktop (> 1024px):
- Full layout
- Content: max-w-2xl centered
- Comfortable spacing
```

---

## Notes de développement

### API utilisée

```typescript
// Get user profile
GET /api/user/profile
Response: {name, email, avatar, stats, memberSince}

// Update user name
PUT /api/user/profile
Body: {name}
Response: {user}

// Update settings
PUT /api/user/settings
Body: {notifications, language, profilePublic}
Response: {settings}

// Change password
POST /api/user/change-password
Body: {currentPassword, newPassword}
Response: {success: boolean}

// Get active sessions
GET /api/user/sessions
Response: Session[]

// Logout device
POST /api/user/sessions/[sessionId]/logout
Response: {success: boolean}

// Delete account
POST /api/user/delete
Body: {password}
Response: {success: boolean}

// Enable 2FA
POST /api/user/2fa/enable
Response: {qrCode, secret, recoveryCodes}

// Verify 2FA
POST /api/user/2fa/verify
Body: {code}
Response: {success: boolean}
```

### Fichiers impliqués

```
app/user/profile/page.tsx
components/profile/profile-tabs.tsx
├── profile-tab.tsx
├── settings-tab.tsx
├── security-tab.tsx
components/profile/edit-name-dialog.tsx
components/profile/change-password-dialog.tsx
components/profile/session-card.tsx
lib/profile-utils.ts
```

### Considérations

1. **Sécurité**:
   - Verify password before changes
   - Session management
   - 2FA implementation
   - Account deletion cascade

2. **UX**:
   - Inline edit (name)
   - Confirm destructive actions
   - Clear feedback (toasts)
   - Loading states

3. **Accessibilité**:
   - Tab labels ARIA
   - Form labels semantic
   - Focus management
   - Keyboard navigation
```

---

## Checklist d'implémentation

### Tab 1: Profil

- [ ] Fetch user profile
- [ ] Display avatar (gravatar + initiales)
- [ ] Display name with [✏️ Éditer]
- [ ] Edit name dialog/inline
- [ ] Display email (non-editable)
- [ ] Show provider (Google/Email)
- [ ] Stats cards (recettes, favoris, publiques)
- [ ] Member since date
- [ ] Delete account button
- [ ] Delete confirmation dialog

### Tab 2: Paramètres

- [ ] Notifications checkboxes
- [ ] Language select dropdown
- [ ] Profile visibility toggle
- [ ] Save button
- [ ] Save settings to API
- [ ] Toast feedback

### Tab 3: Sécurité

- [ ] Password change button/dialog
- [ ] Current password verification
- [ ] 2FA status display
- [ ] Enable 2FA button (future)
- [ ] Active sessions list
- [ ] Session cards (device, time, IP)
- [ ] Logout device button
- [ ] Logout everywhere button

### General

- [ ] Tab navigation/switching
- [ ] Responsive design
- [ ] Error handling
- [ ] Loading states
- [ ] Toast notifications
- [ ] Confirm dialogs for destructive actions
- [ ] Session persistence
- [ ] Edit mode with cancel

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 8-10 heures  
**Dépendances**: API routes, session management, 2FA (future)
