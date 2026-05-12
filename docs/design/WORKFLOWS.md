# 🔄 User Workflows & Journeys

## Vue d'ensemble

Documentation des flux utilisateur complets (user journeys) pour les opérations principales de FamilyCook. Cela décrit les parcours end-to-end du point de vue utilisateur.

**Utilité**: Comprendre les flows complets, identifier les gaps, valider la couverture des pages design.

---

## 🔐 Workflow 1: Authentification & Onboarding

### 1.1 Inscription (Register)

```
START: Landing page /
  ↓
[Page: 01-page-accueil.md]
Clic [S'inscrire] ou [Commencer] button
  ↓
Navigate → /auth/register
  ↓
[Page: 08-authentification.md - Formulaire Register]
User remplit: name, email, password, password confirm
  ↓
Validation côté client:
├─ Email format valid ✓
├─ Passwords match ✓
├─ Password strong (8+ chars, majuscule, etc) ✓
└─ Name min 2 chars ✓
  ↓
POST /api/auth/register
  ↓
Server validation + hash password
  ↓
USER CRÉÉ → Auto-login
  ↓
Redirect → /user/dashboard
  ↓
[Page: 02-dashboard.md]
Welcome message "Bienvenue, [Name]!"
  ↓
User vu dashboard vide (pas de recettes)
  ↓
CTA: [Créer ma première recette]
  ↓
[Page: 04-creer-recette.md]
END
```

**Timing**: 2-3 minutes  
**Points critiques**: Email validation, password strength  
**Error paths**: Email existe déjà, password faible

---

### 1.2 Connexion (Login)

```
START: /auth/login
  ↓
[Page: 08-authentification.md - Formulaire Login]
User remplit: email, password
Option: Remember me (checkbox)
  ↓
POST /api/auth/login
  ↓
Server validation:
├─ Email existe ✓
├─ Password correct ✓
└─ User not blocked ✓
  ↓
Session créée (cookie + token)
Si "Remember me": Extended expiration
  ↓
Redirect → /user/dashboard
  ↓
[Page: 02-dashboard.md]
User vu son dashboard
  ↓
END
```

**Timing**: 30 seconds  
**Points critiques**: Rate limiting (5 attempts/15 min), email case-insensitive  
**Error paths**: Email pas trouvé, password incorrect, account locked

---

### 1.3 Mot de Passe Oublié (Recovery)

```
START: /auth/login
  ↓
[Page: 08-authentification.md]
Clic [Mot de passe oublié?]
  ↓
Navigate → /auth/forgot-password
  ↓
[Page: 08a-mot-de-passe-oublie.md - Page 1]
User remplit email
  ↓
POST /api/auth/forgot-password
  ↓
Server:
├─ Valide email format
├─ Génère token (32 chars random)
├─ Store token + expiration (30 min)
└─ Envoie email avec lien
  ↓
[Page: 08a - Page 2: Email Sent]
Show "Vérifiez votre email"
Auto-redirect 5 sec → /auth/login
  ↓
User reçoit email:
"Réinitialiser votre mot de passe"
[Cliquez ici pour réinitialiser]
  ↓
Clic lien → /auth/reset-password/[token]
  ↓
[Page: 08a - Page 3: Reset Form]
Server validate token (not expired, exists)
  ↓
User remplit nouveau password + confirm
  ↓
POST /api/auth/reset-password
Body: {token, newPassword}
  ↓
Server:
├─ Validate token
├─ Hash new password
├─ Update user password
├─ Invalidate token (one-time use)
└─ Invalidate all sessions (force re-login)
  ↓
[Page: 08a - Page 4: Success]
"Mot de passe réinitialisé!"
Auto-redirect 3 sec → /auth/login
  ↓
User se connecte avec nouveau password
  ↓
[Page: 08-authentification.md]
POST /api/auth/login
  ↓
Redirect → /user/dashboard
  ↓
[Page: 02-dashboard.md]
END
```

**Timing**: 5-10 minutes (dépend email delivery)  
**Points critiques**: Email delivery, token expiration (30 min), one-time use  
**Error paths**: Token expired, email pas trouvé, token invalid

---

## 📝 Workflow 2: Création & Publication de Recette

### 2.1 Créer une Recette (Full Flow)

```
START: /user/dashboard
  ↓
[Page: 02-dashboard.md]
User clique [+ Créer une recette]
  ↓
Navigate → /recipe/my/create
  ↓
[Page: 04-creer-recette.md - Étape 1]
STEP 1: Info de base
├─ Title (required, 3-255 chars)
├─ Description (optional, max 5000 chars)
├─ Category (required, select)
├─ Difficulty (required, select)
└─ Timing: prepTime, cookTime, baseServings
  ↓
[Next button disabled until required fields filled]
  ↓
Clic [Suivant]
Auto-save: POST /api/recipes/draft
Status: isDraft = true
  ↓
[Page: 04-creer-recette.md - Étape 2]
STEP 2: Image de couverture
├─ Drag-drop zone
├─ Ou [Parcourir fichiers]
└─ Preview + Crop tool
  ↓
Upload: POST /api/upload (FormData)
  ↓
Optional: Crop image with tool
  ↓
Save image URL to draft
  ↓
Clic [Suivant]
  ↓
[Page: 04-creer-recette.md - Étape 3]
STEP 3: Ingrédients
├─ Add rows (each row: name, quantity, unit)
├─ Min 1 ingrédient (required)
├─ Max 100 ingrédients (soft limit)
├─ Drag-drop to reorder
└─ [+ Ajouter ingrédient]
  ↓
Valeur champ par champ:
├─ Name: required, 1-255 chars
├─ Quantity: required, > 0
└─ Unit: required, from enum (G, ML, CUP, etc)
  ↓
Auto-save après chaque modification
  ↓
Clic [Suivant]
  ↓
[Page: 04-creer-recette.md - Étape 4]
STEP 4: Étapes de préparation
├─ Add rows (each row: text, optional image)
├─ Min 1 étape (required)
├─ Max 50 étapes (soft limit)
├─ Drag-drop to reorder
└─ [+ Ajouter étape]
  ↓
Validation champ par champ:
├─ Content: required, 10-5000 chars
├─ Image: optional, upload same as step 2
└─ Position: auto-assigned
  ↓
Auto-save après chaque modification
  ↓
Clic [Publier]
  ↓
PUBLISH DIALOG
├─ Visibility: [Privée] ou [Publique]
├─ Info: "Privée = visible que par vous"
└─ [Annuler] [Publier]
  ↓
Si Privée: isDraft = false, visibility = PRIVATE
Si Publique: isDraft = false, visibility = PUBLIC
  ↓
PUT /api/recipes/[id]
Body: {all fields + isDraft=false, visibility}
  ↓
[Page: 04-creer-recette.md - Success]
"Recette créée!"
Reference: "Votre recette '[Title]' a été créée"
  ↓
[Voir la recette] ou [Créer une autre]
  ↓
Clic [Voir]
Navigate → /recipe/shared/show/[id] ou /recipe/my/show/[id]
  ↓
[Page: 07-detail-recette.md]
View recipe with all details
  ↓
END
```

**Timing**: 10-30 minutes  
**Brouillons**: À chaque étape, auto-save en tant que draft  
**Points critiques**: 
- Image upload (5MB limit)
- Validation en temps réel
- Persistance des brouillons
- Navigation étapes

**Error paths**: 
- Upload image échoue
- Network error (auto-save retry)
- User quit sans sauvegarder (brouillon sauvegardé)

---

### 2.2 Reprendre un Brouillon

```
START: /user/dashboard
  ↓
[Page: 02-dashboard.md]
Clic [Mes brouillons] (optional link in navbar)
  ↓
Navigate → /recipe/my/drafts
  ↓
[Page: 12-mes-brouillons.md]
Show liste brouillons avec % complet
  ↓
User voit: "Pâtes Carbonara - 45% complet"
  ↓
Clic [Reprendre l'édition]
  ↓
Navigate → /recipe/my/edit/[id]
  ↓
[Page: 04-creer-recette.md - Éditeur]
Show draft avec tous les champs existants
  ↓
User continue l'édition
  ↓
Auto-save à chaque modification
  ↓
Clic [Publier]
  ↓
PUT /api/recipes/[id]
Status: isDraft = false
  ↓
Navigate → /recipe/shared/show/[id]
  ↓
[Page: 07-detail-recette.md]
Recette publiée
  ↓
END
```

---

### 2.3 Éditer une Recette Existante

```
START: /recipe/my/show/[id]
  ↓
[Page: 07-detail-recette.md]
User clique [✏️ Éditer]
  ↓
Navigate → /recipe/my/edit/[id]
  ↓
[Page: 04-creer-recette.md - Éditeur]
Load recette (non-draft, déjà publiée)
  ↓
User modifie champs
  ↓
Auto-save: PUT /api/recipes/[id]
  ↓
Toast: "Recette sauvegardée"
  ↓
User termine édition
  ↓
[Enregistrer et retour]
  ↓
Navigate → /recipe/my/show/[id]
  ↓
Show modified recette
  ↓
END
```

---

## 💬 Workflow 3: Contact Form & Admin Management

### 3.1 User Soumet Contact Form

```
START: Anywhere on site
  ↓
User clique [Nous contacter] (in footer or menu)
  ↓
Navigate → /contact
  ↓
[Page: 11-contact.md - Non-connecté]
Si user non connecté:
├─ Show form avec tous champs
├─ Name input (required, 2-255)
├─ Email input (required, valid format)
├─ Type select (BUG / FEEDBACK / QUESTION)
├─ Message textarea (required, 10-5000 chars)
└─ Consent checkbox "M'envoyer une réponse par email"
  ↓
Si user connecté:
├─ Auto-fill Name + Email (read-only)
├─ Show link [Changer utilisateur]
├─ Focus on Message textarea
└─ Consent checkbox pre-checked
  ↓
Validation:
├─ Name: 2+ chars
├─ Email: valid format
├─ Type: not empty
├─ Message: 10+ chars, max 5000
└─ Honeypot: empty (spam prevention)
  ↓
Rate limiting check (5 per day per IP)
  ↓
POST /api/contact
Body: {
  name, email, type, message,
  userId (if logged in),
  consentEmail,
  ipAddress, userAgent
}
  ↓
Server:
├─ Generate referenceNumber: #MSG-2026-0512-001
├─ Store in DB (Message model)
├─ Send email to admin
└─ Send confirmation email to user (if consent=true)
  ↓
Response: {success: true, referenceNumber}
  ↓
[Page: 11-contact.md - Success Page]
Show success message with reference number
├─ ✅ "Votre message a été envoyé"
├─ "Nous vous répondrons dès que possible"
├─ Display reference number
└─ [Retour à l'accueil]
  ↓
Auto-redirect 5 sec → /
  ↓
END
```

**Timing**: 2-3 minutes  
**Points critiques**: 
- Spam prevention (rate limit, honeypot)
- Email validation
- Reference number generation
- Admin notification

---

### 3.2 Admin Gère Messages

```
START: Admin Dashboard /admin/dashboard
  ↓
[Page: 10-admin.md - Tab 4: Messages]
Admin vu:
├─ Messages count (3 🔴 bugs, 8 🟡 feedback)
├─ Table avec colonnes:
│  ├─ Type badge (colored)
│  ├─ Subject/Preview
│  ├─ Author name + email
│  ├─ Date
│  └─ Actions menu [⋮]
└─ Filters: Type, Status, Search
  ↓
Admin clique sur message row
  ↓
[Page: 10-admin.md - Message Detail Modal]
Show full message:
├─ From: [Name] [Email]
├─ Type: Bug / Feedback / Question (badge)
├─ Subject (title)
├─ Date + IP (optional)
├─ Full message body
├─ Status: NEW → VIEWED (auto on open)
└─ Action buttons:
    ├─ [Marquer comme résolu]
    ├─ [Envoyer réponse] (future)
    └─ [Supprimer]
  ↓
Admin peut:
├─ Lire le message
├─ Clic [Marquer résolu]:
│  └─ PUT /api/admin/messages/[id]
│     Status: NEW → RESOLVED
│     Toast: "Message marqué comme résolu"
│
├─ Clic [Supprimer]:
│  ├─ Confirm dialog
│  ├─ DELETE /api/admin/messages/[id]
│  └─ Toast: "Message supprimé"
│
└─ Clic [Envoyer réponse] (future):
   └─ Send email to sender
  ↓
Modal closes
  ↓
Table refreshed
  ↓
Admin vu message status updated
  ↓
END
```

---

## ❤️ Workflow 4: Favoris

### 4.1 Ajouter aux Favoris

```
START: /recipe/shared/show/[id]
  ↓
[Page: 07-detail-recette.md]
User vu recette avec bouton [♡ Ajouter aux favoris]
  ↓
Si user NON connecté:
├─ Clic button
├─ Redirect → /auth/login
└─ Login, puis redirect back
  ↓
Si user connecté:
├─ Clic [♡ Ajouter]
├─ POST /api/recipes/[id]/favorite
├─ Server crée Favorite entry
├─ Heart becomes filled: [❤️ Favoris]
└─ Toast: "Ajouté aux favoris"
  ↓
User peut voir dans /recipe/my/favorites
  ↓
[Page: 06-favoris.md]
Recette apparaît dans la grille
  ↓
User peut retirer du clic [❤️ Retirer]
  ↓
DELETE /api/recipes/[id]/favorite
  ↓
Favorite entry deleted
  ↓
END
```

---

## 📊 Workflow 5: Découverte de Contenu

### 5.1 Explorer Recettes Publiques

```
START: /
  ↓
[Page: 01-page-accueil.md]
User voit section "Recettes populaires"
  ↓
Clic [Voir toutes les recettes]
  ↓
Navigate → /recipe/shared
  ↓
[Page: 05-recettes-partagees.md]
Show community recipes:
├─ Search box
├─ Filters:
│  ├─ Category select
│  ├─ Difficulty
│  └─ Sort (Popular, Recent, Rated)
└─ Grid 3 columns
  ↓
User peut:
├─ Search par titre
├─ Filter par catégorie
├─ Sort par popularité
└─ Paginate (12 per page)
  ↓
Clic sur recette card
  ↓
Navigate → /recipe/shared/show/[id]
  ↓
[Page: 07-detail-recette.md]
View recette complète avec:
├─ Détails
├─ Ingrédients
├─ Étapes
├─ Rating
├─ Author profile link
└─ [Ajouter aux favoris]
  ↓
Clic sur author name
  ↓
Navigate → /user/profile/[userId]
  ↓
[Page: 13-profil-public.md]
View auteur's public profile avec:
├─ Avatar + name + member since
├─ Toutes les recettes publiques de cet auteur
└─ Explore ses autres recettes
  ↓
END
```

---

## 📱 Workflow 6: Gestion du Profil

### 6.1 Modifier Profil Utilisateur

```
START: /user/dashboard
  ↓
[Page: 02-dashboard.md]
User clique sur [Profil] ou [Settings icon]
  ↓
Navigate → /user/profile
  ↓
[Page: 09-profil.md - Tab 1: Profile]
User vu profil avec:
├─ Avatar (clickable to change)
├─ Name (editable)
├─ Email (display, non-editable)
└─ [Modifier]
  ↓
Clic [Modifier]:
├─ Edit mode
├─ Change name
├─ PUT /api/user/profile
│  Body: {name}
└─ Toast: "Profil mis à jour"
  ↓
Clic [Changer avatar]:
├─ Upload image
├─ POST /api/upload
├─ POST /api/upload/crop (optionnel)
└─ Update user avatar
  ↓
[Page: 09-profil.md - Tab 2: Paramètres]
User configure:
├─ Language (FR / EN)
├─ Notifications preferences
│  ├─ Welcome emails
│  ├─ Weekly recap
│  ├─ New recipes from community
│  └─ Suggestions
├─ Profile public? (toggle)
└─ PUT /api/user/settings
  ↓
[Page: 09-profil.md - Tab 3: Sécurité]
User manage security:
├─ Change password (require current password)
├─ View active sessions
├─ [Logout from device]
├─ [Logout all devices]
└─ DELETE /api/user/delete (delete account)
  ↓
END
```

---

## 🔑 Critical Decision Points

| Workflow | Decision Point | Options | Default |
|----------|---|---|---|
| **Create Recipe** | Step 4 → Publish | Private or Public? | Private |
| **Forgot Password** | Email sent | Return to login or wait? | Auto-redirect 5s |
| **Contact Form** | After submit | Redirect or stay? | Auto-redirect 5s |
| **Add Favorite** | User not logged | Redirect or prompt? | Redirect to login |
| **Brouillon** | Auto-save | Every field or 30s? | Every field + debounce |

---

## 📊 Workflow Summary

```
Total workflows documented: 6
├── Authentification: 3 (register, login, forgot password)
├── Recipe management: 3 (create, resume draft, edit)
├── Contact: 2 (submit, admin manage)
├── Favorites: 1 (add to favorites)
└── Content discovery: 2 (explore public, view author)

Total user journeys: 11+

Critical points:
├── Data persistence (drafts, auto-save)
├── Session management (login, logout, multi-device)
├── Email delivery (password reset, contact confirm)
├── Spam prevention (rate limiting, honeypot)
└── Error recovery (network, validation, expired tokens)
```

---

**Créé le**: 2026-05-12  
**Status**: 📋 Documentation complète  
**Utilité**: Comprendre les flows complets, identifier les gaps, valider la cohérence
