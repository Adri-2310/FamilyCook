# 📋 PRD (Product Requirements Document) - FamilyCook

**Dernière mise à jour**: 2026-05-12  
**Version**: 1.0 (MVP)  
**Statut**: En développement

---

## 🎯 Executive Summary

**FamilyCook** est une application web de partage de recettes en petit comité (famille, amis, communauté fermée). Les utilisateurs se connectent, créent des recettes, les partagent avec leur réseau, et découvrent de nouvelles idées cuisinées par leurs pairs.

**Cible**: Petites communautés fermées (NOT un marketplace public)  
**Modèle**: Freemium (optionnel future)  
**MVP Timeline**: Q2-Q3 2026

---

## 🎨 Vision Produit

### Objectif Principal

Créer une **plateforme privée de partage de recettes** où une communauté fermée (famille, amis) peut:
- Centraliser sa collection personnelle de recettes
- Partager avec les autres membres du groupe
- Découvrir et s'inspirer des créations de chacun
- Collaborer autour de la cuisine

### Valeur Unique

❌ **NOT** une marketplace publique (Recettly, Marmiton)  
✅ **EST** un réseau social fermé pour la cuisine  
✅ **EST** un gestionnaire centralisé de recettes  
✅ **EST** un lieu d'inspiration communautaire

### Positionnement

```
Pour: Familles, groupes d'amis, communautés fermées
Besoin: Partager et découvrir des recettes ensemble
Solution: Plateforme privée + centralisée + sociale
Différenciation: Fermé + simple + communautaire (vs open marketplace)
```

---

## 📦 Fonctionnalités MVP

### 🔐 Authentification & Accès
- ✅ Inscription libre (email + password)
- ✅ Connexion sécurisée (Better Auth)
- ✅ Sessions multi-appareils
- ✅ Mot de passe oublié / reset
- ✅ Rôles: USER + ADMIN
- ⏳ 2FA (future)
- ⏳ OAuth (Google, GitHub) - optionnel

**Accès**: Ouvert à l'inscription (pas d'invitation requise pour MVP)

---

### 📝 Gestion des Recettes

#### Créer & Éditer
- ✅ Formulaire 4-étapes
  1. Infos de base (titre, description, catégorie, difficulté, timing)
  2. Image de couverture (upload + crop)
  3. Ingrédients (liste, quantité, unité)
  4. Étapes (numérotées, images optionnelles)
- ✅ Auto-save en brouillon à chaque étape
- ✅ Validation en temps réel
- ✅ Reprendre un brouillon inachevé
- ❌ Édition collaborative (future)

#### Publier & Partager
- ✅ Visibilité: PRIVATE (juste moi) ou PUBLIC (tout le groupe)
- ✅ Éditabilité: Seulement l'auteur peut modifier
- ✅ Suppression: Auteur seulement
- ⏳ Partage avancé (invitations, permissions) - future

#### Découverte
- ✅ Page "Recettes Partagées" (communauté)
- ✅ Recherche par titre
- ✅ Filtres: Catégorie, Difficulté
- ✅ Tri: Populaire (likes), Récent, Bien noté
- ✅ Affichage: Grille responsive (3 colonnes desktop)
- ⏳ Tags / Collections - future

---

### ❤️ Favoris

- ✅ Ajouter/Retirer des favoris
- ✅ Accès rapide à ses favoris
- ✅ Compteur de likes (public)
- ✅ Affichage: Grille (same as shared)

---

### 👥 Profils Utilisateurs

#### Profil Privé (moi)
- ✅ Affichage du profil personnel
- ✅ Statistiques: Nb recettes, favoris reçus
- ✅ Modifier nom/avatar
- ✅ Gestion des paramètres
  - Langue (FR / EN)
  - Notifications (email preferences)
  - Profil public oui/non
- ✅ Sécurité
  - Changer mot de passe
  - Gestion des sessions (logout device)
  - Suppression de compte (cascade)
- ⏳ 2FA / Sign in options

#### Profil Public (autres users)
- ✅ Voir le profil d'un autre utilisateur
- ✅ Afficher ses recettes publiques
- ✅ Voir ses statistiques (recettes, avg rating)
- ⏳ Suivre / Ajouter en amis - future

---

### 📊 Interactions & Engagement

#### Ratings & Commentaires
- ✅ Noter une recette (1-5 étoiles)
- ⏳ Commenter les recettes - future
- ⏳ Marquer comme favorite (❤️) pour sauvegarder
- ⏳ Voir moyenne des ratings

#### Portioning
- ✅ Ajuster les portions (2x, ÷2, custom)
- ✅ Conversion automatique des ingrédients
- ✅ Checkboxes pour cocher les ingrédients (en cuisine)

---

### 📧 Contact & Support

- ✅ Formulaire de contact (public)
  - Accessibles même sans compte
  - Types: Bug, Feedback, Question
  - Reference number pour suivi
- ✅ Admin dashboard pour répondre aux messages
- ⏳ Système de support/ticketing

---

### 🛡️ Admin Dashboard

- ✅ Vue d'ensemble (statistiques)
- ✅ Gestion des utilisateurs
  - Lister, chercher, filtrer
  - Changer rôle (USER ↔ ADMIN)
  - Bloquer/supprimer utilisateur
- ✅ Modération des recettes
  - Lister, chercher, filtrer
  - Supprimer recettes inappropriées
  - Signaler (future)
- ✅ Gestion des messages de contact
  - Lister, filtrer par type/statut
  - Marquer comme résolu
  - Supprimer

---

## 🗺️ Roadmap Future (Priorités)

### Phase 2 (Q3-Q4 2026) - **Social Features**

#### Commentaires & Engagement
- 💬 Système de commentaires sur recettes
- 👍 Likes/Reactions
- 📊 Statistiques détaillées par recette
- ✉️ Notifications (nouvelle recette du groupe, commentaire)

**Effort**: ~3-4 semaines  
**Impact**: High (engagement)

---

### Phase 3 (Q4 2026) - **Meal Planning & Shopping**

#### Planification de Repas
- 📅 Calendrier de planification (drag-drop)
- 📋 Listes de courses générées automatiquement
- ✅ Cases à cocher (courses faites)
- 🔗 Grouper par ingrédient (utilisation commune)
- 📤 Export PDF/partage liste

**Effort**: ~4-5 semaines  
**Impact**: Medium (convenience)

**Note**: Feature killer pour engagement utilisateur

---

### Phase 4 (Q1 2027) - **API Recettes Externes**

#### Importer de l'Internet
- 🌐 Intégration Spoonacular API
  - Rechercher par nom
  - Importer recette complète
  - Adapter au format FamilyCook
- 📱 Support autres APIs (future):
  - TheMealDB
  - Edamam
  - Custom RSS feeds
- 🔄 Synchronisation (mise à jour auto?)

**Effort**: ~3-4 semaines (dépend API choisie)  
**Impact**: High (catalog growth)

---

### Phase 5 (2027+) - **Advanced Sharing & Permissions**

#### Partage Granulaire
- 👥 Groupes (family, friends, colleagues)
- 🔐 Permissions par groupe
  - Private (moi seul)
  - Semi-private (groupe spécifique)
  - Public (tous)
- 🔗 Partage via lien (expirant?)
- 📌 Collections/Recueil thématiques

**Effort**: ~5-6 semaines  
**Impact**: High (flexibility)

---

### Phase 6 (2027+) - **Collaborative Features**

#### Édition Collaborative
- ✍️ Historique des versions
- 👥 Co-editing (real-time?)
- 💬 Discussions (versions, variantes)
- 🏷️ Tags (diétaires, allergènes, etc)

**Effort**: ~6-8 semaines  
**Impact**: Medium

---

## 📈 Success Metrics (KPIs)

### Utilisation
- 📊 Utilisateurs actifs mensuels (MAU)
- 🔄 Recettes créées par utilisateur (avg)
- ❤️ Taux de favoris (avg favorites per recipe)
- 📝 Engagement: Messages, commentaires (future)

### Rétention
- 📅 Taux de rétention 7j / 30j / 90j
- 🔁 Fréquence de visite (weekly active users)
- 📈 Croissance semaine-sur-semaine

### Contenu
- 📚 Nombre total de recettes
- 🌍 Public vs Private ratio
- ⭐ Rating moyen des recettes

### Technique
- ⏱️ Performance (Lighthouse score > 90)
- 🐛 Taux de bugs / erreurs
- 👥 Satisfaction utilisateur (feedback)

---

## 👥 User Personas

### Persona 1: **Marie (35) - La Mère de Famille**
**Objectif**: Centraliser ses recettes préférées, les partager avec sa famille  
**Pain points**:
- Recettes dispersées (cahier, téléphone, Pinterest)
- Difficile de retrouver une recette
- Veut partager avec ses enfants
- Pas tech-savvy

**Needs**:
- Interface simple et intuitive
- Recherche facile
- Pas de pubs, pas de distraction

**Behaviors**:
- Utilise 1-2x par semaine
- Crée quelques recettes personnelles
- Cherche l'inspiration chez les autres

---

### Persona 2: **Thomas (28) - Le Geek Cuisinier**
**Objectif**: Partager ses expériences culinaires, découvrir de nouvelles techniques  
**Pain points**:
- Veut montrer ses créations
- Aime la communauté et le feedback
- Cherche de l'inspiration technique

**Needs**:
- Plateforme collaborative
- Ratings et commentaires
- Statistiques détaillées

**Behaviors**:
- Utilise 3-4x par semaine
- Crée souvent (1-2 recettes par mois)
- Interagit beaucoup (comments, likes)

---

### Persona 3: **Sophie (55) - La Grands-Mère**
**Objectif**: Transmettre ses recettes familiales à la génération suivante  
**Pain points**:
- Ses recettes vont se perdre quand elle n'sera plus là
- Veut laisser un héritage
- Difficile de partager avec toute la famille dispersée

**Needs**:
- Sauvegarde des recettes (backup)
- Partage facile avec famille
- Historique et documentation claire

**Behaviors**:
- Utilise 2-3x par mois
- Documente ses vieilles recettes
- Peu d'interaction, focus contenu

---

## 🚫 Non-Objectifs

**Hors scope MVP** (au moins pour l'instant):

- ❌ Marketplace (vendre des recettes)
- ❌ Marketplace d'ingrédients (grocery ordering)
- ❌ Nutrition facts (calcul calories)
- ❌ Allergènes/Restrictions avancées
- ❌ Support multi-langue (FR/EN seulement)
- ❌ App mobile native (web seulement, responsive)
- ❌ Streaming vidéo (images/texte seulement)
- ❌ Système de paiement (gratuit pour MVP)
- ❌ AR/VR (future tech)

---

## 💡 Cas d'Usage Clés

### Cas 1: Chercher l'Inspiration
```
User: "Je ne sais pas quoi cuisiner ce soir"
Flow:
1. Ouvre /recipe/shared
2. Browse recettes populaires
3. Filtre par temps (rapide)
4. Consulte détails recette
5. Ajoute aux favoris
6. Plus tard: reprend la recette pour cuisiner
```

### Cas 2: Partager une Création
```
User: "J'ai testé une nouvelle recette de pâtes, j'aime bien!"
Flow:
1. Ouvre /recipe/my/create
2. Remplit 4 étapes (info, image, ingrédients, étapes)
3. Auto-save en brouillon à chaque étape
4. Clique "Publier" → Choisit visibilité PUBLIC
5. Recette visible à tous les users connectés
6. Reçoit ratings et commentaires (future)
```

### Cas 3: Consulter en Cuisine
```
User: "Vais faire la recette de Marie"
Flow:
1. Ouvre /recipe/shared/show/[id]
2. Ajuste portions (2x) → ingrédients changent
3. Coche les ingrédients ✅ pendant la préparation
4. Suit les étapes numérotées
5. Après: ajoute un commentaire "Délicieux!"
```

### Cas 4: Planifier la Semaine
```
User: "Je dois faire mes courses"
Flow:
1. Ouvre /meal-planner (future)
2. Drag-drop 5 recettes dans la semaine
3. App génère liste de courses
4. Coche les ingrédients achetés
5. Export PDF ou partage avec la famille
```

---

## 🔧 Spécifications Techniques

### Stack
- **Frontend**: Next.js 16 + React + TypeScript + Tailwind
- **Backend**: Next.js API Routes
- **Auth**: Better Auth
- **Database**: PostgreSQL (Neon) + Prisma
- **Storage**: Vercel Blob (images)
- **Validation**: Zod
- **UI**: shadcn/ui + custom components

### Architecture
- Server & Client components (Next.js 16 App Router)
- Type-safe end-to-end (TypeScript)
- Rate limiting + spam prevention
- Role-based access control (USER, ADMIN)

### Performance
- Target: Lighthouse > 90
- First paint < 2s
- Interactive < 3.5s
- Images optimized (WebP, responsive)

### Sécurité
- XSS protection (sanitization)
- CSRF tokens
- SQL injection prevention (Prisma)
- Rate limiting (auth, contact)
- Secure session management
- Password hashing (bcrypt)

---

## 📅 Timeline MVP

**Estimé total**: 95-130 heures  
**Team**: 1 developer (vous)

```
Phase 1 (Current): Design & Architecture
├─ ✅ Design docs (19 documents)
├─ ✅ API spec (50+ endpoints)
├─ ✅ Data models
└─ ✅ Interaction patterns

Phase 2: Core Features (6-8 weeks)
├─ Auth (login, register, reset password)
├─ Recipe CRUD (create, edit, publish)
├─ Profiles (private + public)
├─ Favorites
└─ Admin basics

Phase 3: Polish & Launch (2-3 weeks)
├─ Testing
├─ Performance optimization
├─ Deployment
└─ Launch
```

**Go-live target**: Q3 2026 (été 2026)

---

## 🎓 Définitions

### Brouillon
Recette NON finalisée (steps 1-3 du formulaire). Auto-sauvegardé. L'utilisateur peut le reprendre plus tard.

### Recette Privée
Recette finalisée mais non partagée. Visibilité `PRIVATE`. Seulement visible par l'auteur.

### Recette Publique
Recette finalisée et partagée. Visibilité `PUBLIC`. Visible à tous les utilisateurs connectés.

### Communauté
Tous les utilisateurs connectés = "la communauté" FamilyCook. (NOT invitations, inscription libre)

---

## ❓ FAQ

**Q: Est-ce un clone de Recettly?**  
A: Non. Recettly est une marketplace publique. FamilyCook est un réseau fermé pour petites communautés. Voir [Positionnement](#positionnement).

**Q: Pourquoi pas open source?**  
A: Pour l'instant, c'est un projet personnel. Open sourcing = future (post-MVP).

**Q: Coût de l'infrastructure?**  
A: Neon (DB) ~$10-20/mois, Vercel Blob ~$5-10/mois, Hosting ~$5-20/mois = ~$30-50/mois pour MVP.

**Q: Quand les features avancées (meal planning)?**  
A: Q4 2026 (phase 3). MVP = fonctionnalités core. Roadmap = priorités, pas garanties.

---

## 📞 Contacts & Ownership

| Rôle | Personne | Email |
|------|----------|-------|
| Product Owner | Adrien Mertens | adrien231020@gmail.com |
| Designer | (Vous) | - |
| Developer | (Vous) | - |
| Stakeholders | TBD | - |

---

**Document created**: 2026-05-12  
**Next review**: 2026-06-12  
**Status**: DRAFT → APPROVED (pending your feedback)
