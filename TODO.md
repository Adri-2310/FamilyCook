# 📋 FamilyCook - TODO de Développement

**État Global**: ~65% implémenté | **À faire**: ~15h environ  
**Mise à jour**: 2026-05-12

---

## ✅ PHASE 1: Foundation (TERMINÉE)

### Base de Données & Schéma

- [x] **Ajouter isDraft à Recipe model**
  - Champ: `isDraft Boolean @default(false)`
  - Indices de perf
  - ✅ COMPLÉTÉ
  
- [x] **Créer Message model complet**
  - id, email, name, subject, message, type (enum), status (enum), ipAddress, userAgent, timestamps
  - Enums: `ContactType` (BUG, FEEDBACK, QUESTION), `MessageStatus` (NEW, VIEWED, RESOLVED)
  - ✅ COMPLÉTÉ

- [x] **Migrer Prisma**
  - Migration unique: `20260512125318_initial_schema`
  - Schéma complet et testé
  - ✅ COMPLÉTÉ

---

## 🟠 PHASE 2: Pages Publiques & Auth (12h)

### Pages d'Authentification

- [x] **Page `/auth/forgot-password`** ✅
  - Formulaire avec champ email
  - Validation email Zod
  - Message de succès
  - Notifications Sonner
  - ✅ COMPLÉTÉ

- [x] **Page `/auth/reset-password/[token]`** ✅
  - Récupérer token du URL
  - Formulaire: password + confirm password
  - Validation password fort (min 8, majuscule, chiffre)
  - Redirection login après succès
  - Notifications Sonner
  - ✅ COMPLÉTÉ

### Pages Publiques

- [x] **Page `/contact` - Formulaire public** ✅
  - Champs: nom, email, type (select), message
  - Honeypot field (caché)
  - Validation client (RHF + Zod)
  - Afficher numéro de référence après soumission
  - Styling responsive + notifications Sonner
  - ✅ COMPLÉTÉ (testé et fonctionnel)

- [ ] **Page `/user/profile/[userId]` - Profil public**
  - Récupérer user par ID via API
  - Afficher: name, image, stats
  - Grille des recettes publiques de l'utilisateur
  - Lien depuis détail recette
  - Vérifier si profil public enabled
  - Estimation: 3h

### Gestion des Brouillons

- [ ] **Page `/recipe/my/drafts` - Liste des brouillons**
  - Récupérer recipes avec isDraft=true
  - Affichage grille/tableau
  - Bouton "Continuer" → edit
  - Bouton "Supprimer"
  - Empty state
  - Estimation: 2h

---

## 🟡 PHASE 3: API Routes (10h)

### Endpoints Critiques

- [x] **POST `/api/contact` - Soumettre formulaire** ✅
  - Validation Zod (name, email, type, message)
  - Honeypot check
  - Rate limiting par IP (5/jour)
  - Générer numéro de référence: MSG-YYYYMMDD-XXXXX
  - Sauvegarder en DB (Message model)
  - Retourner {success, refNumber}
  - Error handling (400, 429, 500)
  - ✅ COMPLÉTÉ (testé et fonctionnel)

- [x] **POST/DELETE `/api/recipes/[id]/favorite`** ✅
  - POST: Ajouter aux favoris
  - DELETE: Retirer des favoris
  - Auth check (protected)
  - Vérifier recipe exists
  - Retourner nombre de favoris
  - ✅ COMPLÉTÉ

- [x] **GET/PUT/DELETE `/api/recipes/my/drafts`** ✅
  - GET: Récupérer brouillons (isDraft=true) avec pagination
  - PUT: Auto-save brouillon (champs partiels)
  - DELETE: Supprimer brouillon + données liées
  - Auth check (protected)
  - Ownership check
  - ✅ COMPLÉTÉ

### Endpoints Password Reset

- [x] **POST `/api/auth/forgot-password`** ✅
  - Valider email
  - Générer token (expiration 1h)
  - Sauvegarder dans Verification table
  - Envoyer email avec lien reset (react-email + nodemailer)
  - ✅ COMPLÉTÉ

- [x] **POST `/api/auth/reset-password`** ✅
  - Valider token et nouveau password
  - Vérifier expiration token
  - Hash password avec bcrypt
  - Mettre à jour Account model
  - ✅ COMPLÉTÉ

### API Profil Public & Admin

- [ ] **GET `/api/user/profile/[userId]`**
  - Récupérer user publique (name, image, stats)
  - Estimation: 1h

- [ ] **GET/PATCH/DELETE `/api/admin/messages`**
  - GET: Lister messages (paginated)
  - PATCH: Marquer RESOLVED
  - DELETE: Supprimer message
  - Auth: ADMIN check
  - Estimation: 2h

---

## 🟢 PHASE 4: Fonctionnalités & Polish (8h)

### Recherche Avancée

- [ ] **Améliorer recherche dans Discovery**
  - Recherche par titre (debounced)
  - Filtres: catégorie, difficulté
  - Tri: populaire, récent, noté
  - Pagination (12 par page)
  - Estimation: 2h

### Conversions de Portions

- [ ] **Portioning system**
  - Ajouter baseServings au form
  - Calculer conversion ingrédients
  - Afficher checkboxes ingrédients sur détail
  - Estimation: 2h

### Évaluations

- [ ] **System d'évaluation (si manquant)**
  - Vérifier if dans modèle
  - Affichage sur détail
  - Bouton évaluation (1-5 stars)
  - Moyenne affichée
  - Estimation: 2h

### UI Interactions

- [ ] **Toasts notifications**
  - Succès: Recette créée, Favori ajouté
  - Erreur: Réseau, validation
  - Intégrer sonner
  - Estimation: 1h

- [ ] **Confirmation dialogs**
  - Suppression recette
  - Suppression account
  - Estimation: 0.5h

- [ ] **Loading & Empty states**
  - Loading buttons
  - Skeletons
  - Empty states (0 recettes, etc.)
  - Animations (200-300ms)
  - Estimation: 0.5h

---

## 🔷 PHASE 5: Admin Dashboard Complet (6h)

### Messages Management

- [ ] **Page `/admin/messages`**
  - Tableau messages (email, type, status, date, actions)
  - Pagination
  - Filtres: type, status
  - Recherche: email, contenu
  - Modal détail message
  - Actions: Voir détail, Marquer RESOLVED, Supprimer
  - Vérifier protection ADMIN
  - Estimation: 2h

### Statistiques Dashboard

- [ ] **Mettre à jour `/admin/dashboard`**
  - Card: Total users
  - Card: Total recipes (public count)
  - Card: Messages pending
  - Requêtes DB optimisées
  - Estimation: 2h

### Modération Avancée (Optional)

- [ ] **Actions batch** (optionnel)
- [ ] **Soft delete** (optionnel)
- [ ] **Audit logs** (optionnel)

---

## 📊 Résumé par Effort

| Phase | Effort | État |
|-------|--------|------|
| **1. Foundation** | 2h | ⬜ À faire |
| **2. Pages** | 12h | ⬜ À faire |
| **3. API** | 10h | ⬜ À faire |
| **4. Features** | 8h | ⬜ À faire |
| **5. Admin** | 6h | ⬜ À faire |
| **TOTAL** | **31h** | |

---

## 🎯 Ordre Strict Recommandé

1. ✅ **Terminer Phase 1** (Foundation) → déverrouille tout le reste
2. ✅ **Pages Publiques + Auth** (Phase 2)
3. ✅ **API Routes** (Phase 3)
4. ✅ **Features** (Phase 4)
5. ✅ **Admin** (Phase 5)
6. ✅ **Polish** (Dernier)

---

## 💡 Notes

- **Parallélisation possible**: Pendant Prisma, préparez les pages/templates
- **Rate limiting**: Vous pouvez utiliser Redis ou une solution simple en mémoire pour MVP
- **Email**: Vérifiez que le service mailer est configuré (nodemailer, resend, etc.)
- **Validation**: Utilisez Zod côté client (RHF) ET serveur
- **Tests**: Curl/Postman pour APIs, navigateur pour UI
- **Responsive**: Testez mobile/tablet/desktop pour chaque page

---

**Prochaine étape**: Commencer Phase 1 (Prisma schema + migrations)
