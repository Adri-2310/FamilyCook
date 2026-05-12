# 🚀 Plan de Développement FamilyCook - Implémentation Détaillée

**Date**: 2026-05-12  
**Basé sur**: MVP-SCOPE.md, MVP-DEPENDENCIES.md, MVP-TIMELINE.md, MVP-CHECKLIST.md  
**État actuel**: Partiellement implémenté (~40% complet)

---

## 📊 État du Projet

### ✅ Déjà Implémenté

#### Pages UI (19/27 = 70%)
- ✅ Landing page (public) - `app/(public)/page.tsx` (209 lignes)
- ✅ Auth login - `app/auth/login/page.tsx` (113 lignes)
- ✅ Auth register - `app/auth/register/page.tsx` (154 lignes)
- ✅ Recipe creation wizard - `app/recipe/my/new/page.tsx` + form component (31 lignes + 2622 lignes recipe-form.tsx)
- ✅ Recipe list (mes recettes) - `app/recipe/my/page.tsx` (157 lignes)
- ✅ Recipe detail (show/edit) - `app/recipe/my/show/[id]/page.tsx` (242 lignes)
- ✅ Recipe edit - `app/recipe/my/edit/[id]/page.tsx` (98 lignes)
- ✅ Shared recipes (discovery) - `app/recipe/shared/page.tsx` (141 lignes)
- ✅ Recipe detail (shared) - `app/recipe/shared/show/[id]/page.tsx` (199 lignes)
- ✅ Favorites - `app/recipe/favorites/page.tsx` (149 lignes)
- ✅ User profile (private) - `app/profile/page.tsx` (101 lignes)
- ✅ Profile settings - `app/profile/settings/page.tsx` (118 lignes)
- ✅ Profile security - `app/profile/security/page.tsx` (120 lignes)
- ✅ Admin dashboard - `app/admin/dashboard/page.tsx` (60 lignes)
- ✅ Admin users - `app/admin/users/page.tsx` (97 lignes)
- ✅ Admin recipes - `app/admin/recipes/page.tsx` (82 lignes)

#### API Routes (8/25 = 32%)
- ✅ Auth (Better Auth) - `app/api/auth/[...all]/route.ts`
- ✅ Recipes GET - `app/api/recipes/route.ts`
- ✅ Recipes GET shared - `app/api/recipes/shared/route.ts`
- ✅ Recipes GET my - `app/api/recipes/my/route.ts`
- ✅ Recipes GET by ID - `app/api/recipes/[id]/route.ts`
- ✅ Recipe search - `app/api/recipes/search/route.ts`
- ✅ Upload image - `app/api/upload/route.ts`
- ✅ Profile - `app/api/profile/route.ts`

#### Base de Données (Prisma Schema)
- ✅ User model
- ✅ Recipe model (sans isDraft)
- ✅ Ingredient model
- ✅ Step model
- ✅ Favorite model
- ✅ Session/Account/Verification models (Better Auth)
- ✅ Tag/RecipeTag models
- ⚠️ **MANQUE**: Message model (pour formulaire contact)

#### Composants & Utilitaires
- ✅ Recipe form (complet)
- ✅ Navbar & Footer
- ✅ Recipe cards (grille)
- ✅ Theme provider
- ✅ Auth utilities
- ✅ Toast notifications
- ✅ Fractions converter

---

## ❌ À Implémenter (Priorité Haute)

### PHASE 1: Foundation (Corrections Base)

#### 1.1 Schéma Prisma - Ajouts manquants
- [ ] Ajouter `isDraft` boolean à Recipe model
- [ ] Ajouter Message model pour formulaire contact
- [ ] Ajouter `messageStatus` enum (PENDING, RESOLVED)
- [ ] Ajouter `contactType` enum (BUG, FEEDBACK, QUESTION)
- [ ] Migrations Prisma
- **Effort**: 1-2h

#### 1.2 Modèle Message Prisma
```prisma
model Message {
  id        String   @id @default(cuid())
  email     String
  name      String
  subject   String
  message   String
  type      ContactType
  status    MessageStatus @default(PENDING)
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("messages")
}

enum ContactType {
  BUG
  FEEDBACK
  QUESTION
}

enum MessageStatus {
  PENDING
  RESOLVED
}
```

---

### PHASE 2: Pages Manquantes (12h)

#### 2.1 Pages d'Authentification (3h)
- [ ] `/auth/forgot-password` - Formulaire demande reset
- [ ] `/auth/reset-password/[token]` - Page de réinitialisation
- [ ] Implémenter endpoint email oubli mot de passe
- [ ] Implémenter endpoint réinitialisation mot de passe

#### 2.2 Page Formulaire Contact (3h)
- [ ] `/contact` - Page publique (accessible sans connexion)
  - Champs: nom, email, type (select), message
  - Validation côté client (React Hook Form + Zod)
  - Validation côté serveur
  - Honeypot (champ caché antibot)
  - Rate limiting (5 par jour par IP)
  - Afficher numéro de référence après soumission

#### 2.3 Profil Public Utilisateur (3h)
- [ ] `/user/profile/[userId]` - Affichage profil public
  - Récupérer infos utilisateur (name, image, stats)
  - Afficher recettes publiques de l'utilisateur
  - Si profil=public, afficher statistiques
  - Lien depuis détail recette

#### 2.4 Gestion Brouillons (3h)
- [ ] `/recipe/my/drafts` - Liste des brouillons
  - Implémenter isDraft sur création/sauvegarde
  - Filtrer recipes avec isDraft=true
  - Bouton "Continuer le brouillon"
  - Bouton "Supprimer le brouillon"
  - Auto-save lors de navigation (débounced)

---

### PHASE 3: API Routes Manquantes (10h)

#### 3.1 Contact API (2h)
- [ ] `POST /api/contact` - Soumettre formulaire contact
  - Validation Zod (name, email, type, message)
  - Honeypot check
  - Rate limiting par IP (5/jour)
  - Envoyer email admin
  - Retourner numéro de référence
  - Sauvegarder en base (Message model)

#### 3.2 Favoris API (1h)
- [ ] `POST /api/favorites/[recipeId]` - Ajouter aux favoris
- [ ] `DELETE /api/favorites/[recipeId]` - Retirer des favoris
- [ ] `GET /api/favorites` - Récupérer mes favoris (optionnel, pagination)

#### 3.3 Profil Public API (1h)
- [ ] `GET /api/user/profile/[userId]` - Récupérer infos publiques utilisateur
  - Affichage name, image, stats
  - Si public, afficher recettes publiques

#### 3.4 Brouillons API (1h)
- [ ] `GET /api/recipes/my/drafts` - Récupérer brouillons
- [ ] `PUT /api/recipes/[id]/draft` - Auto-save brouillon
- [ ] `DELETE /api/recipes/[id]/draft` - Supprimer brouillon

#### 3.5 Messages Admin API (2h)
- [ ] `GET /api/admin/messages` - Lister messages (paginated)
- [ ] `GET /api/admin/messages/[id]` - Détail message
- [ ] `PATCH /api/admin/messages/[id]` - Marquer comme RESOLVED
- [ ] `DELETE /api/admin/messages/[id]` - Supprimer message

#### 3.6 Email Password Reset (1h)
- [ ] `POST /api/auth/forgot-password` - Envoyer email reset
- [ ] `POST /api/auth/reset-password` - Réinitialiser mot de passe

#### 3.7 Endpoints Utilisateurs (1h)
- [ ] `GET /api/admin/users` - Lister users (paginated)
- [ ] `PUT /api/admin/users/[id]/role` - Changer rôle user
- [ ] `DELETE /api/admin/users/[id]` - Supprimer user (cascade)

#### 3.8 Endpoints Recettes Complétude (1h)
- [ ] `PUT /api/recipes/[id]` - Éditer recette
- [ ] `DELETE /api/recipes/[id]` - Supprimer recette
- [ ] `PATCH /api/recipes/[id]/visibility` - Publier/Dépublier

---

### PHASE 4: Fonctionnalités Manquantes (8h)

#### 4.1 Recherche & Filtres (2h)
- [ ] Améliorer recherche dans Discovery
  - Recherche par titre (debounced)
  - Filtrer par catégorie
  - Filtrer par difficulté
  - Tri: populaire, récent, bien noté
  - Pagination (12 par page)

#### 4.2 Portioning (Conversion portions) (2h)
- [ ] Ajouter baseServings à form
- [ ] Calculer conversion ingrédients selon portions demandées
- [ ] Afficher checkboxes ingrédients sur détail

#### 4.3 Rating/Évaluation (2h)
- [ ] ✅ Déjà dans modèle ? (vérifier)
- [ ] Affichage rating sur détail
- [ ] Bouton évaluation (1-5 stars)
- [ ] Moyenne affichée

#### 4.4 Interactions UI Polish (2h)
- [ ] Toasts notifications (succès, erreur, info, warning)
- [ ] Confirmation dialogs (suppression, etc.)
- [ ] Loading states sur formulaires
- [ ] Empty states sur listes
- [ ] Animations smooth (200-300ms)

---

### PHASE 5: Dashboard Admin Complet (6h)

#### 5.1 Page Admin Messages (2h)
- [ ] `app/admin/messages/page.tsx`
  - Tableau messages (type, status, date)
  - Chercher par email/contenu
  - Filtrer par type, statut
  - Voir détail (modal ou page)
  - Marquer RESOLVED
  - Supprimer message

#### 5.2 Stats Dashboard (2h)
- [ ] Cards statistiques
  - Total users
  - Total recipes (public vs private count)
  - Messages (resolved vs pending)
- [ ] Graphiques simples (optionnel)

#### 5.3 Modération Avancée (2h)
- [ ] Ajouter actions batch (optionnel)
- [ ] Soft delete (optionnel)
- [ ] Audit logs (optionnel)

---

## 📋 Dépendances & Ordre d'Implémentation

```
Phase 1: Foundation (Prisma)
  └─ isDraft field
  └─ Message model
  └─ Migrations

    ↓

Phase 2: Pages UI
  ├─ Pages auth (forgot-password, reset)
  ├─ Page contact
  ├─ Page profil public
  └─ Page drafts

    ↓

Phase 3: API Routes
  ├─ Contact API
  ├─ Favoris API
  ├─ Brouillons API
  └─ Messages admin API

    ↓

Phase 4: Fonctionnalités
  ├─ Recherche avancée
  ├─ Portioning
  ├─ Rating
  └─ UI Polish

    ↓

Phase 5: Admin complet
  └─ Dashboard messages + stats
```

---

## 🎯 Priorités

### 🔴 CRITICAL (Bloque MVP)
1. **Prisma**: Ajouter isDraft + Message model (1-2h)
2. **Page Contact**: Formulaire public (3h)
3. **API Contact**: Endpoint POST (2h)
4. **Pages Auth**: Forgot/Reset password (3h)

**Total CRITICAL**: ~9-11h

### 🟠 HIGH (Important pour MVP)
1. **API Favoris**: (1h)
2. **API Brouillons**: (1h)
3. **Page Profil Public**: (3h)
4. **Admin Messages**: (2h)

**Total HIGH**: ~7h

### 🟡 MEDIUM (Polish, optionnel)
1. **Recherche avancée**: (2h)
2. **Portioning**: (2h)
3. **UI Interactions**: (2h)

**Total MEDIUM**: ~6h

---

## 📅 Timeline Proposée

### Semaine 1 (30-40h disponible, si développement time-box)

**Jour 1-2: Foundation (3-4h)**
- Modifier Prisma schema
- Ajouter isDraft, Message model
- Créer migrations
- Migration + test DB

**Jour 2-3: Pages Critiques (6-8h)**
- Page contact (3h)
- Pages auth forgot/reset (3-5h)

**Jour 3-4: API Critiques (4-5h)**
- API contact (2h)
- API favoris (1h)
- API brouillons (1-2h)

**Jour 4-5: Pages Restantes (6-8h)**
- Page profil public (3h)
- Page drafts list (2-3h)
- Intégration/tests (1-2h)

**Jour 5: Admin & Polish (3-5h)**
- Admin messages page (2h)
- UI interactions/toasts (1h)
- Tests généraux (1-2h)

---

## 🔧 Checklist Détaillée par Tâche

### Tâche 1: Prisma Schema (2h)

- [ ] Lire docs/design/DATA-MODELS.md pour voir le schéma attendu
- [ ] Modifier `prisma/schema.prisma`
  - [ ] Ajouter `isDraft Boolean @default(false)` à Recipe model
  - [ ] Ajouter enums `ContactType`, `MessageStatus`
  - [ ] Ajouter Message model complet
  - [ ] Ajouter relations si nécessaire
  - [ ] Vérifier indexes pour perf
- [ ] Créer migration: `npx prisma migrate dev --name add_drafts_and_messages`
- [ ] Tester schema: `npx prisma studio`
- [ ] Committer changements

### Tâche 2: Page Contact (3h)

- [ ] Créer dossier `app/contact/`
- [ ] Créer `app/contact/page.tsx`
- [ ] Implémenter selon docs/design/11-contact.md
  - [ ] Formulaire: nom, email, type (select), message
  - [ ] Validation React Hook Form + Zod
  - [ ] Honeypot field (hidden input "website")
  - [ ] Submit button disabled during submit
  - [ ] Success message avec ref number
  - [ ] Error handling
- [ ] Styling Tailwind
- [ ] Tester sur mobile/desktop

### Tâche 3: API Contact (2h)

- [ ] Créer `app/api/contact/route.ts`
- [ ] Implémenter POST handler
  - [ ] Valider payload (Zod)
  - [ ] Honeypot check
  - [ ] Rate limiting (Redis optionnel, sinon simple check)
  - [ ] Générer ref number
  - [ ] Sauvegarder Message en DB
  - [ ] Envoyer email admin (mailer.ts)
  - [ ] Retourner {success, refNumber}
- [ ] Tester avec curl/Postman
- [ ] Error handling (400, 429, 500)

### Tâche 4: Pages Auth Forgot/Reset (3h)

- [ ] Créer `app/auth/forgot-password/page.tsx`
  - [ ] Form: email input
  - [ ] Button "Envoyer lien de réinitialisation"
  - [ ] Success message: "Vérifiez votre email"
  - [ ] Validation
- [ ] Créer `app/auth/reset-password/[token]/page.tsx`
  - [ ] Récupérer token du URL
  - [ ] Form: password, confirm password
  - [ ] Validation mot de passe fort
  - [ ] Button "Réinitialiser"
  - [ ] Redirection login après succès
- [ ] Styling Tailwind
- [ ] Vérifier Better Auth setup pour ces flows

### Tâche 5: API Password Reset (1h)

- [ ] Vérifier si Better Auth gère déjà
- [ ] Sinon, créer endpoints:
  - [ ] `POST /api/auth/forgot-password`
  - [ ] `POST /api/auth/reset-password`
- [ ] Intégrer avec mailer pour email

### Tâche 6: API Favoris (1h)

- [ ] Créer `app/api/recipes/[id]/favorite/route.ts`
  - [ ] POST: Ajouter favorite
  - [ ] DELETE: Retirer favorite
  - [ ] Auth check (protected)
  - [ ] Check recipe exists
  - [ ] Return 200 + favorite count
- [ ] Tester endpoints

### Tâche 7: API Brouillons (1h)

- [ ] Créer/modifier endpoints
  - [ ] `GET /api/recipes/my/drafts`
  - [ ] `PUT /api/recipes/[id]/draft` (auto-save)
  - [ ] `DELETE /api/recipes/[id]/draft`
- [ ] Filtrer par isDraft=true
- [ ] Tests

### Tâche 8: Page Profil Public (3h)

- [ ] Créer `app/user/profile/[userId]/page.tsx`
- [ ] Implémenter selon docs
  - [ ] Récupérer user par ID
  - [ ] Afficher: name, image, stats (recettes count, etc.)
  - [ ] Afficher recettes publiques (grille)
  - [ ] Lien "Voir le profil" depuis détail recette
  - [ ] Vérifier si profil public enabled
- [ ] Styling
- [ ] Tests

### Tâche 9: Page Drafts List (2h)

- [ ] Créer `app/recipe/my/drafts/page.tsx`
- [ ] Afficher liste des brouillons
  - [ ] Récupérer recipes avec isDraft=true
  - [ ] Grille/tableau brouillons
  - [ ] Button "Continuer" → `/recipe/my/edit/[id]`
  - [ ] Button "Supprimer"
  - [ ] Vide state
- [ ] Styling

### Tâche 10: Admin Messages (2h)

- [ ] Créer `app/admin/messages/page.tsx`
- [ ] Tableau messages
  - [ ] Colonnes: email, type, status, date, actions
  - [ ] Pagination
  - [ ] Filtres: type, status
  - [ ] Recherche: email, contenu
  - [ ] Action "Voir détail" (modal)
  - [ ] Action "Marquer RESOLVED"
  - [ ] Action "Supprimer"
- [ ] Styling
- [ ] Vérifier protection ADMIN role

### Tâche 11: Admin Stats (2h)

- [ ] Mettre à jour `app/admin/dashboard/page.tsx`
- [ ] Cards statistiques
  - [ ] Total users
  - [ ] Total recipes (avec count PUBLIC)
  - [ ] Messages pending
- [ ] Requêtes DB optimisées

### Tâche 12: UI Polish (2h)

- [ ] Ajouter toasts notifications (sonner)
  - [ ] Success: Recette créée, Favori ajouté, etc.
  - [ ] Error: Erreur réseau, validation échouée
  - [ ] Warning: Conforme WCAG
- [ ] Confirmation dialogs (suppression recette, account, etc.)
- [ ] Loading states (boutons, skeletons)
- [ ] Empty states (0 recettes, 0 favoris, etc.)
- [ ] Animations (200-300ms transitions)

---

## 📊 Effort Total Estimé

| Phase | Tâche | Effort | Status |
|-------|-------|--------|--------|
| 1 | Prisma Schema | 2h | ⬜ À faire |
| 2 | Page Contact | 3h | ⬜ À faire |
| 2 | Pages Auth (forgot/reset) | 3h | ⬜ À faire |
| 2 | Page Profil Public | 3h | ⬜ À faire |
| 2 | Page Drafts List | 2h | ⬜ À faire |
| 3 | API Contact | 2h | ⬜ À faire |
| 3 | API Password Reset | 1h | ⬜ À faire |
| 3 | API Favoris | 1h | ⬜ À faire |
| 3 | API Brouillons | 1h | ⬜ À faire |
| 3 | API Messages Admin | 2h | ⬜ À faire |
| 4 | Recherche avancée | 2h | ⬜ À faire |
| 4 | Portioning | 2h | ⬜ À faire |
| 4 | UI Interactions | 2h | ⬜ À faire |
| 5 | Admin Messages UI | 2h | ⬜ À faire |
| 5 | Admin Stats | 2h | ⬜ À faire |
| **TOTAL** | | **31h** | |

---

## 🚀 Recommandations

### Ordre Strict Recommandé
1. **Prisma** (Foundation)
2. **Pages Contact + Forgot Password** (Public access, indépendant)
3. **API Contact + Password Reset** (Support endpoints)
4. **API Favoris + Brouillons** (Core features)
5. **Page Profil Public + Drafts List** (UI completeness)
6. **Admin Messages + Stats** (Operations)
7. **Polish UI** (Dernière étape)

### Parallélisation Possible
- Pendant que vous faites Prisma, préparez les pages UI
- Pages et API peuvent être faitesparallèlement après Prisma
- UI Polish peut être fait en dernier après toutes les features

### Tests Recommandés
- Tester chaque API avec curl/Postman
- Tester formulaires (validation client + serveur)
- Tester authentification (protected routes)
- Tester rate limiting (contact form)
- Cross-browser: Chrome, Firefox, Safari
- Responsive: mobile, tablet, desktop

---

## 🎯 Checkpoints Go/No-Go

### ✅ À terminer avant MVP
- [ ] Prisma: isDraft + Message model
- [ ] Page & API contact
- [ ] Pages auth complètes (forgot/reset)
- [ ] API favoris & brouillons
- [ ] Page drafts list
- [ ] Admin messages (basique)

### ⏳ Peut être fait après (Phase 2)
- [ ] Recherche avancée
- [ ] Portioning
- [ ] Rating avancé
- [ ] Audit logs admin
- [ ] Analytics

---

**Prochaines étapes**: Commencer par Phase 1 (Prisma), puis continuer systématiquement.  
**Questions?** Vérifiez docs/design/ pour les spécifications exactes de chaque page.

