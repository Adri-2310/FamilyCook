# 📦 MVP Scope - FamilyCook

**Version**: 1.0  
**Date**: 2026-05-12  
**Status**: APPROVED for Development

---

## 🎯 MVP Objective

Créer une **plateforme de partage de recettes** fonctionnelle pour une communauté fermée (famille, amis) où les utilisateurs peuvent créer, partager et découvrir des recettes.

**Target**: Q3 2026 (Été 2026)  
**Estimated Effort**: 95-130 heures (1 développeur)

---

## ✅ IN SCOPE (Inclus dans le MVP)

### 1. 🔐 **Authentification & Accès** (12h)
- ✅ Inscription (email + password)
- ✅ Connexion sécurisée
- ✅ Mot de passe oublié / reset (2 pages + email)
- ✅ Logout
- ✅ Gestion des sessions (multi-device)
- ✅ Rôles: USER (défaut), ADMIN (manual)
- ❌ OAuth (Google, GitHub) → Post-MVP
- ❌ 2FA → Post-MVP

---

### 2. 📝 **Gestion des Recettes** (35h)
- ✅ Créer une recette
  - Formulaire 4-étapes (info, image, ingrédients, étapes)
  - Auto-save en brouillon
  - Validation en temps réel
  - Upload image + crop
- ✅ Éditer une recette (auteur seulement)
- ✅ Supprimer une recette (auteur seulement)
- ✅ Publier/Dépublier (statut DRAFT → PUBLIC/PRIVATE)
- ✅ Reprendre un brouillon inachevé
- ✅ Page détail avec tous les détails
- ✅ Portioning (ajuster portions → conversion ingrédients)
- ✅ Checkboxes (cocher ingrédients en cuisine)

**Exclusions**:
- ❌ Édition collaborative
- ❌ Historique des versions
- ❌ Variantes/Fork de recette
- ❌ Duplication de recette

---

### 3. ❤️ **Favoris** (8h)
- ✅ Ajouter aux favoris
- ✅ Retirer des favoris
- ✅ Page "Mes Favoris" (grille)
- ✅ Compteur de favoris (public)
- ✅ Toggle button [♡ Ajouter / ❤️ Retirer]

**Exclusions**:
- ❌ Listes/Collections multiples
- ❌ Partage de listes de favoris

---

### 4. 👥 **Profils Utilisateurs** (15h)

#### Profil Privé (Moi)
- ✅ Affichage du profil personnel
- ✅ Statistiques: Recettes créées, favoris reçus
- ✅ Modifier nom d'affichage
- ✅ Modifier avatar (upload + crop)
- ✅ Paramètres:
  - Langue (FR / EN) [affichage UI]
  - Notifications (email preferences)
  - Profil public ON/OFF
- ✅ Sécurité:
  - Changer mot de passe
  - Voir sessions actives
  - Logout d'un device spécifique
  - Logout de tous les devices
  - Supprimer compte (cascade delete)

#### Profil Public (Autres Users)
- ✅ Voir le profil d'un autre user
- ✅ Afficher ses recettes publiques
- ✅ Statistiques (recettes publiques)

**Exclusions**:
- ❌ Bio/Description personnelle
- ❌ Suivre un user
- ❌ Messages directs
- ❌ Statistiques avancées (rating avg, etc)

---

### 5. 🌍 **Découverte de Contenu** (12h)
- ✅ Page "Recettes Partagées" (communauté)
- ✅ Grille de recettes (responsive: 1/2/3 colonnes)
- ✅ Recherche par titre (debounced)
- ✅ Filtres:
  - Catégorie (APPETIZER, MAIN, DESSERT, etc)
  - Difficulté (EASY, MEDIUM, HARD)
- ✅ Tri:
  - Populaires (par favoris)
  - Récentes
  - Bien notées
- ✅ Pagination (12 par page)
- ✅ Empty states

**Exclusions**:
- ❌ Tags
- ❌ Collections thématiques
- ❌ Recherche avancée (allergènes, calories)
- ❌ Recommandations IA

---

### 6. 📧 **Contact & Support** (6h)
- ✅ Formulaire de contact (publique)
  - Accessible sans connexion
  - Types: BUG, FEEDBACK, QUESTION
  - Validation des champs
  - Reference number générée
  - Email de confirmation (optionnel)
- ✅ Rate limiting (5 per day per IP)
- ✅ Honeypot (spam prevention)
- ✅ Email admin notifié

**Exclusions**:
- ❌ Système de ticketing
- ❌ Auto-réponse Email
- ❌ Support chat/live

---

### 7. 🛡️ **Admin Dashboard** (12h)
- ✅ Vue d'ensemble (statistiques)
  - Total users
  - Total recipes
  - Public vs Private count
  - New messages count
- ✅ Gestion des utilisateurs
  - Lister/Paginer
  - Chercher par nom/email
  - Filtrer par rôle
  - Changer rôle (USER ↔ ADMIN)
  - Supprimer un utilisateur (cascade)
  - Logout un user (future)
- ✅ Modération des recettes
  - Lister/Paginer
  - Chercher par titre
  - Filtrer par visibilité
  - Supprimer une recette
- ✅ Gestion des messages
  - Lister/Paginer
  - Filtrer par type, statut
  - Chercher par contenu/email
  - Voir détail (modal)
  - Marquer comme RESOLVED
  - Supprimer
  - Voir IP/User agent

**Exclusions**:
- ❌ Modération batch
- ❌ Ban/Blocking users
- ❌ Signalement de contenu
- ❌ Audit logs

---

### 8. 🏠 **Landing Page** (5h)
- ✅ Hero section
- ✅ Features highlights
- ✅ Call-to-actions ([S'inscrire], [Se connecter])
- ✅ Note: "Connectez-vous pour voir les recettes"
- ✅ Responsive (mobile-first)

**Exclusions**:
- ❌ Blog
- ❌ Testimonials
- ❌ Pricing (gratuit pour MVP)
- ❌ Documentations/FAQ

---

### 9. 🎨 **UI/UX & Design System** (10h)
- ✅ Design System (Tailwind + shadcn/ui)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark mode (optionnel)
- ✅ Accessibility (WCAG AA)
  - Focus states
  - ARIA labels
  - Keyboard navigation
  - Color contrast
- ✅ Interaction patterns
  - Toasts (success, error, info, warning)
  - Confirmation dialogs
  - Loading states
  - Error messages
- ✅ Animations (smooth, 200-300ms)

---

### 10. 🗄️ **Database & Backend** (15h)
- ✅ Prisma ORM setup
- ✅ Database schema
  - 8 modèles (User, Recipe, Ingredient, Step, Favorite, Rating, Message, Session)
  - Relations et contraintes
  - Indexes pour perf
- ✅ Migrations
- ✅ Seed data (optionnel)

---

### 11. 🔌 **API Endpoints** (25h)
- ✅ 50+ endpoints documentés
- ✅ Authentication endpoints (login, register, logout, reset)
- ✅ Recipe CRUD + Drafts
- ✅ User profile + settings
- ✅ Favorites
- ✅ Search & filtering
- ✅ Contact form
- ✅ Admin endpoints
- ✅ Error handling standardisé
- ✅ Rate limiting
- ✅ Validation (Zod)

---

### 12. 🚀 **Deployment & DevOps** (8h)
- ✅ Vercel deployment (Next.js)
- ✅ Environment variables setup
- ✅ Database (Neon) connection
- ✅ Image storage (Vercel Blob)
- ✅ Email service setup (SendGrid/Resend)
- ✅ CI/CD basic (GitHub Actions optionnel)
- ✅ Monitoring (Sentry optionnel)

---

### 13. 🧪 **Testing & QA** (10h)
- ✅ Manual testing (all features)
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Responsive testing (mobile, tablet, desktop)
- ✅ Performance testing (Lighthouse > 90)
- ✅ Security testing (XSS, CSRF, SQL injection)
- ⏳ Unit tests (optionnel)
- ⏳ E2E tests avec Cypress (optionnel)

---

## ❌ OUT OF SCOPE (Exclus du MVP)

### Social Features (Phase 2)
- ❌ Commentaires sur recettes
- ❌ Réponses à commentaires
- ❌ Mentions (@user)
- ❌ Likes/Reactions (à part favoris)
- ❌ Notifications (email oui, in-app non)

### Advanced Features (Phase 3+)
- ❌ Meal planning / Calendar
- ❌ Shopping list generation
- ❌ Nutrition facts / Calories
- ❌ Allergènes / Restrictions avancées
- ❌ Recipe scaling (stay simple pour MVP)
- ❌ Tagging / Collections
- ❌ Recipe duplications / Forks
- ❌ Collaborative editing
- ❌ Version history

### API Integrations (Phase 4)
- ❌ Spoonacular / TheMealDB
- ❌ Import recettes externes
- ❌ Recipe scraping
- ❌ Nutrition APIs

### Advanced Auth (Phase 2+)
- ❌ OAuth (Google, GitHub)
- ❌ 2FA / MFA
- ❌ Social login
- ❌ Password-less auth

### Advanced Admin (Phase 2+)
- ❌ User analytics
- ❌ Batch operations
- ❌ Ban/Block users
- ❌ Content reporting system
- ❌ Audit logs

### Localization (Phase 2+)
- ❌ Multi-langue (FR/EN UI seulement, pas full i18n)
- ❌ RTL support
- ❌ Regional pricing

### Mobile (Phase 3+)
- ❌ Native iOS app
- ❌ Native Android app
- ❌ App Store deployment
- ❌ Push notifications
- ❌ Offline mode

### Monetization (Phase 4+)
- ❌ Stripe integration
- ❌ Subscription tiers
- ❌ Premium features
- ❌ Ads
- ❌ Affiliate links

### Advanced Features (Future)
- ❌ Video tutorials
- ❌ Live cooking streams
- ❌ AR/VR features
- ❌ AI recipe suggestions
- ❌ Voice commands
- ❌ Blockchain / NFT

---

## 📊 MVP by the Numbers

| Category | Count |
|----------|-------|
| **Pages UI** | 14 |
| **API Endpoints** | 50+ |
| **Database Models** | 8 |
| **User Roles** | 2 (USER, ADMIN) |
| **Recipe Categories** | 10 |
| **Difficulty Levels** | 3 |
| **Contact Types** | 3 (BUG, FEEDBACK, QUESTION) |
| **Estimated Hours** | 95-130h |
| **Timeline** | 6-8 weeks |

---

## 🎯 Success Criteria

MVP est **DONE** quand:

- ✅ Tous les endpoints fonctionnels et testés
- ✅ Toutes les pages UI responsive et complètes
- ✅ Database fonctionnelle avec données de test
- ✅ Authentification sécurisée (Better Auth)
- ✅ Formulaires validés côté client + serveur
- ✅ Deployment sur Vercel (production-ready)
- ✅ Lighthouse score > 90
- ✅ Aucun bug critique
- ✅ Documentation complète
- ✅ Prêt pour accès utilisateurs réels

---

## 📝 Notes

1. **Brouillons**: Feature CRITICAL - auto-save à chaque étape
2. **Auth**: Better Auth utilisé (no custom auth)
3. **Styling**: Tailwind + shadcn/ui (pas de CSS custom)
4. **Images**: Vercel Blob pour stockage
5. **Email**: SendGrid ou Resend pour contact + password reset
6. **Database**: Neon PostgreSQL + Prisma ORM
7. **Hosting**: Vercel (Next.js optimisé)

---

## 🔄 What Happens After MVP

Une fois le MVP lancé:

1. **Recueillir du feedback** utilisateurs réels (2-3 semaines)
2. **Identifier les bugs** et les fixer rapidement
3. **Planifier Phase 2** (Social features)
4. **Prioriser la roadmap** selon usage réel

---

**Created**: 2026-05-12  
**Last Updated**: 2026-05-12  
**Owner**: Adrien Mertens  
**Status**: ✅ APPROVED FOR DEVELOPMENT
