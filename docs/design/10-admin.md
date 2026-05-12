# 🛡️ Admin Dashboard

## Description

Le dashboard administrateur donne une vue d'ensemble de l'application avec statistiques clés, gestion des utilisateurs, modération de contenu et gestion des messages de contact.

**Statut**: Admin uniquement  
**URL**: `/admin/dashboard`  
**Authentification**: ✅ Oui (admin required)  
**Responsive**: ✅ Desktop-first (focus on large screens)

---

## Objectifs UX

- 🎯 **Vue d'ensemble** : Statistics clés en un coup d'œil
- 🎯 **Gestion efficace** : Gérer utilisateurs, contenu, messages
- 🎯 **Modération** : Valider/supprimer rapidement
- 🎯 **Alertes** : Voir les messages non traités
- 🎯 **Analytics** : Comprendre la santé de l'app

---

## Questions posées & Réponses

| Question | Réponse |
|----------|---------|
| **Contenu** | Stats + Messages (contact) + Utilisateurs + Recettes |
| **Layout** | Tabs/Cards (comme profil) |
| **Messages** | Messages de contact (bugs, feedback, etc.) |

---

## Maquette ASCII

```
┌─────────────────────────────────────────────────────────────┐
│  🍳 FamilyCook    [≡ Recettes ▼]    [Favoris]    Admin [☰]│
└─────────────────────────────────────────────────────────────┘

┌─ PAGE HEADER ───────────────────────────────────────────────┐
│                                                             │
│  Admin Dashboard                                            │
│  Gestion de l'application FamilyCook                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TABS ──────────────────────────────────────────────────────┐
│                                                             │
│  [Aperçu]  [Utilisateurs]  [Recettes]  [Messages]         │
│  ────────                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 1: APERÇU ────────────────────────────────────────────┐
│                                                             │
│  Statistics                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   👥         │  │   📝         │  │   📊         │   │
│  │   1,245      │  │   3,892      │  │   8,234      │   │
│  │ Utilisateurs │  │   Recettes   │  │   Total likes│   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │   🌐         │  │   🔒         │                       │
│  │   2,134      │  │   1,758      │                       │
│  │  Recettes    │  │   Recettes   │                       │
│  │   publiques  │  │   privées    │                       │
│  └──────────────┘  └──────────────┘                       │
│                                                             │
│  Messages par type                                         │
│  ┌──────────────────────────────────────────────────┐    │
│  │ 🔴 Bugs: 3 nouveaux                             │    │
│  │ 🟡 Feedback: 8 nouveaux                         │    │
│  │ 🟢 Autres: 2 nouveaux                           │    │
│  │ ⚪ Résolus: 45                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                             │
│  [👁️  Voir tous les messages]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 2: UTILISATEURS ──────────────────────────────────────┐
│                                                             │
│  Recherche & Filtres                                       │
│  [🔍 Chercher utilisateur]  [Rôle ▼]  [Trier ▼]          │
│                                                             │
│  1,245 utilisateurs                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────┐     │
│  │ Utilisateur      │ Email              │ Rôle    │ A   │
│  ├─────────────────────────────────────────────────┤     │
│  │ Jean Dupont      │ jean@example.com   │ User    │ [⋮] │
│  │ Marie Leclerc    │ marie@example.com  │ User    │ [⋮] │
│  │ Pierre Dubois    │ pierre@example.com │ Admin   │ [⋮] │
│  │ Sophie Martin    │ sophie@example.com │ User    │ [⋮] │
│  └─────────────────────────────────────────────────┘     │
│                                                             │
│  [< Précédent]  1  2  3  [Suivant >]                     │
│                                                             │
│  Menu [⋮] options: Voir profil, Changer rôle, Bloquer    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 3: RECETTES ──────────────────────────────────────────┐
│                                                             │
│  Modération de contenu                                     │
│  [🔍 Chercher recette]  [Visibilité ▼]  [Trier ▼]       │
│                                                             │
│  3,892 recettes (2,134 publiques | 1,758 privées)        │
│                                                             │
│  ┌───────────────────────────────────────────────────┐   │
│  │ Recette          │ Auteur      │ Visibilité │ A   │   │
│  ├───────────────────────────────────────────────────┤   │
│  │ Coq au vin       │ Jean        │ Public     │ [⋮] │   │
│  │ Tarte Tatin      │ Marie       │ Public     │ [⋮] │   │
│  │ Boeuf bourguignon│ Pierre      │ Private    │ [⋮] │   │
│  │ Crème brûlée     │ Sophie      │ Public     │ [⋮] │   │
│  └───────────────────────────────────────────────────┘   │
│                                                             │
│  Menu [⋮] options: Voir recette, Éditer, Supprimer       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ TAB 4: MESSAGES ──────────────────────────────────────────┐
│                                                             │
│  Messages de contact                                       │
│  [🔍 Chercher]  [Type ▼]  [Statut ▼]  [Trier ▼]         │
│                                                             │
│  13 messages (3 🔴 bugs, 8 🟡 feedback, 2 🟢 autres)     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 🔴 │ Sujet          │ Auteur      │ Date    │ A    │  │
│  ├────────────────────────────────────────────────────┤  │
│  │    │ Impossible de  │ Jean        │ Auj.    │ [⋮]  │  │
│  │    │ se connecter   │ Dupont      │ 10:30   │      │  │
│  │    │                │ (jean@ex)   │         │      │  │
│  ├────────────────────────────────────────────────────┤  │
│  │ 🟡 │ Ajouter un     │ Marie       │ Hier    │ [⋮]  │  │
│  │    │ système de     │ Leclerc     │ 14:20   │      │  │
│  │    │ partage        │ (marie@ex)  │         │      │  │
│  ├────────────────────────────────────────────────────┤  │
│  │ ⚪ │ Merci pour     │ Pierre      │ 2j      │ [⋮]  │  │
│  │    │ cette app!     │ Dubois      │ ago     │      │  │
│  │    │                │ (pierre@ex) │         │      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                             │
│  Menu [⋮] options: Voir détail, Marquer comme résolu,    │
│                    Supprimer, Contacter auteur             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FOOTER ───────────────────────────────────────────────────┐
│ © 2026 FamilyCook | Logs | Support | Quitter admin        │
└─────────────────────────────────────────────────────────────┘
```

---

## Spécifications

### Tab 1: Aperçu

```
Statistics Cards:
├── 👥 Utilisateurs total
├── 📝 Recettes total
├── 📊 Total likes/favoris
├── 🌐 Recettes publiques
└── 🔒 Recettes privées

Messages by Type:
├── 🔴 Bugs: [count] nouveaux
├── 🟡 Feedback: [count] nouveaux
├── 🟢 Autres: [count] nouveaux
└── ⚪ Résolus: [count] total

Quick Links:
├── [👁️  Voir tous les messages]
├── [⚠️  Signalements] (future)
└── [📊 Logs] (future)
```

### Tab 2: Utilisateurs

```
Filters:
├── Search input
├── Role select (User, Admin, Banned)
└── Sort by (Récent, Alphabétique, Actif)

User Table:
├── Columns: Username | Email | Role | Actions
├── Data: User list with pagination
└── Menu [⋮]:
    ├── Voir profil
    ├── Changer rôle (User → Admin)
    ├── Bloquer utilisateur
    └── Supprimer compte
```

### Tab 3: Recettes

```
Filters:
├── Search input
├── Visibility (Public, Private, All)
└── Sort by (Récent, Populaire, Alphabet)

Recipe Table:
├── Columns: Title | Author | Visibility | Actions
├── Data: Recipe list with pagination
└── Menu [⋮]:
    ├── Voir recette
    ├── Éditer
    ├── Supprime
    └── Flag comme iappropriate (future)
```

### Tab 4: Messages

```
Filters:
├── Search input
├── Type (Bug, Feedback, Other, All)
├── Status (New, Viewed, Resolved, All)
└── Sort by (Newest, Oldest, Priority)

Message Table:
├── Columns: Type badge | Subject | Author | Date | Actions
├── Color coding:
│   ├── 🔴 Bug: border-red
│   ├── 🟡 Feedback: border-yellow
│   ├── 🟢 Other: border-green
│   └── ⚪ Resolved: border-gray
└── Menu [⋮]:
    ├── Voir détail (modal)
    ├── Marquer comme résolu
    ├── Supprimer
    └── Contacter auteur (future)

Message Detail Modal:
├── Subject + Type
├── From: Nom + Email
├── Date + IP (optional)
├── Message body (full text)
├── Buttons: [Résolu] [Supprimer] [Répondre]
└── Close button
```

### Couleurs

```
Statistics Cards:
- Card: bg-card border-border
- Icon: text-primary/80
- Number: text-2xl font-bold
- Label: text-sm text-muted-foreground

Message Type Badges:
- Bug: 🔴 bg-red-100 text-red-900
- Feedback: 🟡 bg-yellow-100 text-yellow-900
- Other: 🟢 bg-green-100 text-green-900
- Resolved: ⚪ bg-gray-100 text-gray-900

Tables:
- Header: bg-muted
- Row hover: bg-muted/50
- Border: border-border

Menu Button [⋮]:
- Color: text-muted-foreground
- Hover: text-primary
```

### Interactions

```
Statistics Cards:
- Click: Navigate to relevant section (e.g., click Users → Tab 2)
- Hover: shadow-md

Search/Filters:
- Debounced search
- Update URL params
- Reload table

Tables:
- Click row: Open detail modal/drawer
- Menu [⋮]: Dropdown menu with actions
- Pagination: Standard navigation

Message Details:
- Modal/drawer with full content
- Buttons for actions
- Close on backdrop click

Actions:
- Delete: Confirm dialog
- Status change: Immediate update
- Role change: Confirm (changing admin)
```

### Responsive

```
Mobile (< 768px):
- Sidebar nav: Collapse
- Tables: Horizontal scroll or card layout
- Limited columns

Tablet (768px - 1024px):
- Sidebar: Visible
- Tables: Most columns visible
- Some column hiding

Desktop (> 1024px):
- Full sidebar
- All columns
- Full table view
```

---

## Notes de développement

### API utilisée

```typescript
// Get admin statistics
GET /api/admin/stats
Response: {
  userCount, recipeCount, publicRecipes,
  privateRecipes, totalLikes, newMessages
}

// Get users list
GET /api/admin/users?search=x&role=y&sort=z&page=1
Response: {users, total, page, totalPages}

// Get recipes list
GET /api/admin/recipes?search=x&visibility=y&sort=z&page=1
Response: {recipes, total, page, totalPages}

// Get messages list
GET /api/admin/messages?search=x&type=y&status=z&sort=w&page=1
Response: {messages, total, page, totalPages}

// Get message detail
GET /api/admin/messages/[id]
Response: {message with full details}

// Mark message as resolved
PUT /api/admin/messages/[id]
Body: {status: 'RESOLVED'}

// Delete message
DELETE /api/admin/messages/[id]

// Delete user
DELETE /api/admin/users/[id]

// Update user role
PUT /api/admin/users/[id]
Body: {role: 'ADMIN' or 'USER'}

// Delete recipe
DELETE /api/admin/recipes/[id]
```

### Fichiers impliqués

```
app/admin/dashboard/page.tsx
app/admin/layout.tsx
components/admin/
  ├── stats-section.tsx
  ├── users-table.tsx
  ├── recipes-table.tsx
  ├── messages-table.tsx
  ├── message-detail-modal.tsx
  └── admin-nav.tsx
api/admin/* (GET, PUT, DELETE)
```

### Considérations

1. **Sécurité**:
   - Verify admin role
   - Log all admin actions
   - Confirm destructive operations
   - Rate limit admin APIs

2. **Performance**:
   - Paginate all tables
   - Cache statistics
   - Lazy load modals
   - Optimize queries

3. **UX**:
   - Clear action confirmations
   - Toast feedback
   - Loading states
   - Error handling
```

---

## Checklist d'implémentation

### Page Structure

- [ ] Admin layout/sidebar
- [ ] Tabs navigation
- [ ] Fetch statistics

### Tab 1: Aperçu

- [ ] Statistics cards (5)
- [ ] Display counts
- [ ] Make cards clickable
- [ ] Messages by type section
- [ ] Quick link buttons

### Tab 2: Utilisateurs

- [ ] Search input (debounced)
- [ ] Role select filter
- [ ] Sort options
- [ ] User table
  - [ ] Columns: Name | Email | Role | Actions
  - [ ] Pagination
  - [ ] Menu [⋮] dropdown
- [ ] Edit role dialog
- [ ] Delete user confirm
- [ ] Block user option

### Tab 3: Recettes

- [ ] Search input
- [ ] Visibility filter
- [ ] Sort options
- [ ] Recipe table
  - [ ] Columns: Title | Author | Visibility | Actions
  - [ ] Pagination
  - [ ] Menu [⋮] dropdown
- [ ] Delete recipe confirm
- [ ] Edit recipe option

### Tab 4: Messages

- [ ] Search input
- [ ] Type filter (Bug, Feedback, Other)
- [ ] Status filter (New, Viewed, Resolved)
- [ ] Sort options
- [ ] Message table
  - [ ] Columns: Type | Subject | Author | Date | Actions
  - [ ] Color-coded type badges
  - [ ] Pagination
  - [ ] Menu [⋮] dropdown
- [ ] Message detail modal
  - [ ] Full message content
  - [ ] Action buttons
  - [ ] Close functionality
- [ ] Mark as resolved button
- [ ] Delete message confirm

### General

- [ ] Role-based access control
- [ ] Responsive design (desktop-first)
- [ ] Error handling
- [ ] Toast notifications
- [ ] Loading states
- [ ] Confirm dialogs for destructive actions
- [ ] Admin action logging (future)

---

**Créé le**: 2026-05-12  
**Status**: 📝 À implémenter  
**Estimé**: 10-12 heures (complexe avec plusieurs tables)  
**Dépendances**: API routes (admin endpoints), role-based access control
