# 🔗 MVP Dependencies & Implementation Order

**Critical Path Analysis**: Identifies which features must be built first, and their dependencies.

---

## 🏗️ Dependency Graph

```
┌──────────────────────────────────────────────────────────────────────┐
│                    DATABASE & AUTH (Foundation)                       │
│                                                                       │
│  Prisma Schema  ←  User Model  ←  Better Auth Setup                 │
│                 ←  Recipe Model ←  Ingredients Model                │
│                 ←  Sessions    ←  Message Model                      │
└──────────┬───────────────────────────────────────────────────────────┘
           │
           ├─────────────────────────────────────────────────────────────┐
           │                                                               │
           ▼                                                               ▼
    ┌─────────────┐                                              ┌──────────────────┐
    │   LOGIN     │                                              │  RECIPE CREATE   │
    │  REGISTER   │                                              │   (4-step form)  │
    │  (Auth)     │                                              │   (Drafts)       │
    └─────┬───────┘                                              └────────┬─────────┘
          │                                                              │
          │  (Needed by all protected features)                        │
          │                                                              │  (Core feature)
          │  ┌────────────────┐  ┌─────────────────┐                   │
          │  ▼                ▼  ▼                 ▼                   │
          │ ┌────────────┐ ┌────────────┐ ┌─────────────────┐         │
          │ │  PROFILE   │ │ FAVORITES  │ │ CONTACT FORM    │         │
          │ │  (Private) │ │            │ │ (Public)        │         │
          │ └────────────┘ └────────────┘ └─────────────────┘         │
          │                    ▲
          │                    │  (Depends on recipe feature)
          │                    │
          └────────────────┬───┘
                           │
                           ▼
              ┌─────────────────────────────┐
              │   RECIPE DISCOVERY          │
              │   (Shared Recipes Page)     │
              │   (Search, Filters)         │
              └──────────────┬──────────────┘
                             │
                             ├─────────────────────────────────┐
                             │                                 │
                             ▼                                 ▼
              ┌──────────────────────────┐    ┌──────────────────────────┐
              │  PUBLIC PROFILE          │    │  ADMIN DASHBOARD         │
              │  (View other users)      │    │  (User, Recipe, Message  │
              │                          │    │   Management)            │
              └──────────────────────────┘    └──────────────────────────┘
```

---

## 📋 Implementation Order (Critical Path)

### 🔴 **TIER 0: Foundation** (Must do first)
```
1. Database Schema (Prisma)
   └─ Prerequisite for EVERYTHING
   
2. Better Auth Setup
   └─ Prerequisite for all protected features
   
3. API Structure & Middleware
   └─ Authentication checks, validation, error handling
```

**Block?** Don't start Tier 1 until these are done.

---

### 🟠 **TIER 1: Core MVP** (Without these, app doesn't work)

```
1. AUTH PAGES (Login, Register, Forgot Password)
   ├─ Dependencies: TIER 0
   ├─ Blocks: Everything else (protected routes)
   └─ Effort: 8h
   
2. RECIPE CREATION (4-step wizard)
   ├─ Dependencies: TIER 0 + Login
   ├─ Blocks: Discovery, Favorites, Profiles
   └─ Effort: 12h

3. RECIPE RETRIEVAL APIs
   ├─ Dependencies: TIER 0 + Recipe Creation
   ├─ GET /recipes/my
   ├─ GET /recipes/my/drafts
   ├─ GET /recipes/{id}
   └─ Effort: 5h

4. DRAFTS MANAGEMENT
   ├─ Dependencies: Recipe Creation + GET APIs
   ├─ Auto-save
   ├─ Reprendre draft
   ├─ Delete draft
   └─ Effort: 3h
```

**Block?** Don't do Tier 2 features until these are done.

---

### 🟡 **TIER 2: Discovery & Engagement** (Show value)

```
1. RECIPE DISCOVERY (Shared Recipes)
   ├─ Dependencies: TIER 1 (Recipe Creation + GET /recipes/my)
   ├─ Needs: Published recipes to show
   ├─ Blocks: Favorites feature
   └─ Effort: 5h

2. SEARCH & FILTERS
   ├─ Dependencies: Discovery page
   ├─ Search by title
   ├─ Filter by category, difficulty
   ├─ Sort: popular, recent, rated
   └─ Effort: 3h

3. RECIPE DETAIL PAGE
   ├─ Dependencies: Discovery + GET /recipes/{id}
   ├─ Show full recipe
   ├─ Portioning + checkboxes
   └─ Effort: 6h

4. FAVORITES SYSTEM
   ├─ Dependencies: TIER 1 + Recipe Detail
   ├─ POST /recipes/{id}/favorite
   ├─ DELETE /recipes/{id}/favorite
   ├─ My Favorites page
   └─ Effort: 4h
```

**Can start**: In parallel with TIER 1 Phase 2.

---

### 🟢 **TIER 3: User Management** (Polish)

```
1. PROFILE PAGE (Private)
   ├─ Dependencies: Login
   ├─ Display profile info
   ├─ Edit name/avatar
   └─ Effort: 4h

2. SETTINGS TAB
   ├─ Dependencies: Profile page
   ├─ Language, notifications, public profile toggle
   └─ Effort: 2h

3. SECURITY TAB
   ├─ Dependencies: Login
   ├─ Change password
   ├─ Session management
   ├─ Delete account
   └─ Effort: 5h

4. PUBLIC PROFILE (View other users)
   ├─ Dependencies: Profile page + Discovery
   ├─ Link from recipe detail
   ├─ Show user's public recipes
   └─ Effort: 3h
```

**Can start**: Week 4 (after Tier 2 basics).

---

### 🔵 **TIER 4: Support & Admin** (Operational)

```
1. CONTACT FORM (Public)
   ├─ Dependencies: Email service only (not auth-dependent!)
   ├─ Can implement anytime
   ├─ Public = good early marketing
   └─ Effort: 5h

2. ADMIN DASHBOARD
   ├─ Dependencies: Login + Admin Role
   ├─ Stats overview
   ├─ User management
   ├─ Recipe moderation
   ├─ Message management
   └─ Effort: 12h

3. LANDING PAGE
   ├─ Dependencies: Landing page only (static mostly)
   ├─ Can do early for marketing
   └─ Effort: 3h
```

**Can start**: Week 3-4 (Contact page, Landing) or Week 5+ (Admin).

---

## 🔗 Feature Dependencies Matrix

| Feature | Depends On | Needed By | Start Week | Duration |
|---------|-----------|-----------|------------|----------|
| Database Schema | Nothing | EVERYTHING | W1 | 3h |
| Better Auth | Database | Auth pages | W1 | 2h |
| API Structure | Database + Auth | All APIs | W1 | 2h |
| Auth Pages | API + Auth | Protected routes | W2 | 8h |
| Recipe Create | API | Discovery, Favorites | W2 | 12h |
| GET APIs | Database | Discovery, Detail | W2 | 5h |
| Drafts | GET APIs + Create | Management | W3 | 3h |
| Discovery | GET APIs | Everything user-facing | W3 | 5h |
| Search/Filters | Discovery | UX (but MVP works without) | W3 | 3h |
| Recipe Detail | GET APIs + Discovery | Favorites, profiles | W3 | 6h |
| Favorites | Recipe Detail | Engagement | W3 | 4h |
| Profile | Auth | Settings, public profile | W4 | 4h |
| Settings | Profile | UX (but MVP works without) | W4 | 2h |
| Security | Auth | Account safety | W4 | 5h |
| Public Profile | Profile + Discovery | Engagement | W4 | 3h |
| Contact Form | Email service | Support | W3 | 5h |
| Admin | Auth + Admin role | Moderation | W5 | 12h |
| Landing Page | Nothing | Marketing | W3 | 3h |

---

## ⏱️ Critical Path Timeline

**Minimum critical sequence**:

```
Week 1:
  ├─ Database Schema (3h)
  ├─ Better Auth (2h)
  └─ API Structure (2h)

Week 2:
  ├─ Auth Pages (8h)
  └─ Recipe Create (12h)
  └─ GET APIs (5h)

Week 3:
  ├─ Drafts (3h)
  ├─ Discovery (5h)
  └─ Recipe Detail (6h)
  └─ Search/Filters (3h)

Week 4:
  ├─ Favorites (4h)
  ├─ Profile (4h)
  ├─ Settings (2h)
  ├─ Security (5h)
  └─ Public Profile (3h)

Week 5:
  ├─ Admin (12h)
  ├─ Contact Form (5h if not done before)
  └─ Polish (5h)

Week 6-7:
  ├─ Testing (10h)
  └─ Deployment (5h)

Week 7-8:
  └─ Buffer (10h)
```

---

## 🚧 Parallel Work Opportunities

### Can do in parallel:
- **Landing Page** (Week 3, no dependencies)
- **Contact Form** (Week 3-4, only needs email service)
- **Navbar** (Week 2, during auth development)
- **Responsive Design** (Week 3+, during feature building)

### CANNOT do in parallel (must be sequential):
- Recipe Create → Discovery (need recipes to show)
- Auth → Protected pages (auth must come first)
- Discovery → Favorites (need published recipes)

---

## 🔴 Blocking Dependencies

**If these are NOT done, you're stuck**:

```
Database Schema
  ↓
  └─ Everything depends on this

Better Auth Setup
  ↓
  └─ All protected routes need this

Recipe Creation API
  ↓
  ├─ Discovery (need recipes to show)
  ├─ Favorites (need recipes to favorite)
  └─ Profiles (need user's recipes)
```

**Action**: Do Foundation (Tier 0) first, don't move to Tier 1 until done.

---

## 📊 Effort per Week (Recommended)

| Week | Focus | Total Hours | Notes |
|------|-------|-------------|-------|
| 1 | Foundation + Auth | 14-18h | Setup heavy, auth pages |
| 2 | Core MVP | 20-25h | Recipe create, APIs |
| 3 | Discovery + Polish | 18-22h | Search, detail, filters |
| 4 | Profiles + Settings | 16-20h | User management |
| 5 | Admin + Final features | 18-22h | Admin dashboard |
| 6 | Testing + Deploy | 12-15h | QA, launch prep |
| 7 | Buffer + Early access | 10-12h | Buffer for overruns |
| **TOTAL** | MVP Complete | **95-130h** | 6-8 weeks @15-20h/week |

---

## 🎯 Go/No-Go Checkpoints

### End of Week 2:
- ✅ Users can register & login
- ✅ Users can create recipes (4-step wizard)
- **NO GO IF**: Auth not working or recipe create doesn't save

### End of Week 3:
- ✅ Discovery page shows recipes
- ✅ Search & filters work
- **NO GO IF**: Discovery page empty or crashes

### End of Week 4:
- ✅ All user-facing features done
- ✅ Profiles work
- **NO GO IF**: Users can't manage profiles or settings

### End of Week 6:
- ✅ Admin dashboard done
- ✅ Testing complete
- ✅ Deployed to Vercel
- **NO GO IF**: Critical bugs found

### End of Week 8:
- ✅ MVP live and stable
- ✅ Early users testing
- **GO**: Launch Phase 2 planning

---

## 🔄 What If You Get Blocked?

**Common blockers and solutions**:

| Blocker | Solution | Time |
|---------|----------|------|
| Database slow | Optimize indexes | 1h |
| Auth token issues | Debug Better Auth setup | 2-3h |
| Image upload fails | Check Vercel Blob config | 1h |
| Email not sending | Check SendGrid/Resend API | 1h |
| Search is slow | Add database index | 1h |
| UI looks ugly | Apply DESIGN-SYSTEM.md | 2-3h |
| Performance bad | Image optimization + code split | 2-3h |

**Budget for unknowns**: Week 7 buffer (10h) accounts for these.

---

## 📝 Dependency Checklist

Before starting each feature, verify:

```
☐ All BLOCKING dependencies done?
☐ Do I have the data/APIs needed?
☐ Is the database schema complete?
☐ Are parent features working?
☐ Do I have test data to work with?
☐ Have I updated MVP-CHECKLIST.md?
```

---

**Created**: 2026-05-12  
**Last Updated**: 2026-05-12  
**Owner**: Adrien Mertens  
**Status**: ✅ APPROVED FOR DEVELOPMENT
