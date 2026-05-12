# 📅 MVP Timeline & Phases

**Total Duration**: 6-8 weeks  
**Start**: Immediately (W1 = 2026-05-13)  
**Target Launch**: 2026-06-24 to 2026-07-08 (W7-W8)

---

## 📊 Timeline Overview

```
Week 1-2:   Setup + Foundation     (10 days)
Week 2-3:   Core Features         (10 days)
Week 3-4:   Features + Auth       (10 days)
Week 4-5:   Profiles + Social     (10 days)
Week 5-6:   Admin + Polish        (10 days)
Week 6-7:   Testing + Deploy      (7 days)
Week 7-8:   Buffer / Bug Fixes    (7 days)

Total: 64 working days (~95-130 hours)
```

---

## 🏗️ PHASE 1: Setup & Foundation (Week 1-2)

**Duration**: 10 days  
**Effort**: 15-18 hours  
**Focus**: Project setup, database, basic infrastructure

### Tasks:

- [ ] **Project Setup** (3h)
  - Next.js 16 with TypeScript
  - Tailwind CSS v4
  - shadcn/ui components
  - ESLint + Prettier
  - Git structure

- [ ] **Database Setup** (2h)
  - Neon PostgreSQL connection
  - Prisma ORM initialization
  - .env configuration
  - Database creation

- [ ] **Prisma Schema** (3h)
  - User model
  - Recipe + Ingredient + Step models
  - Favorite + Rating models
  - Message model
  - Session model
  - Migrations

- [ ] **Authentication Setup** (4h)
  - Better Auth integration
  - User model + role enum
  - Session management
  - Password hashing

- [ ] **Image Storage Setup** (2h)
  - Vercel Blob configuration
  - Upload utility functions
  - Image processing (crop)

- [ ] **Email Service Setup** (1h)
  - SendGrid or Resend API
  - Email templates (password reset, contact)

- [ ] **API Structure** (2h)
  - Route organization
  - Error handling patterns
  - Middleware (auth, validation)
  - Rate limiting setup

**Deliverables**:
- ✅ Project runs locally
- ✅ Database connected
- ✅ Basic API structure ready
- ✅ Auth system initialized

---

## 🔐 PHASE 2: Core Features - Auth & Basic Recipes (Week 2-3)

**Duration**: 10 days  
**Effort**: 30-35 hours  
**Focus**: Authentication, recipe creation framework

### Tasks:

- [ ] **Authentication Pages** (8h)
  - Login page (/auth/login)
  - Register page (/auth/register)
  - Forgot password page (/auth/forgot-password)
  - Reset password page (/auth/reset-password/[token])
  - Logout functionality

- [ ] **Recipe Creation Wizard** (12h)
  - Step 1: Basic info (title, description, category, difficulty, timing)
  - Step 2: Image upload + crop
  - Step 3: Ingredients (add, remove, reorder)
  - Step 4: Steps (add, remove, reorder)
  - Form validation
  - Auto-save to drafts
  - Save & publish flow

- [ ] **Recipe Retrieval** (5h)
  - GET /recipes/{id}
  - GET /recipes/my
  - GET /recipes/my/drafts
  - Pagination + filtering

- [ ] **Draft Management** (3h)
  - List drafts page (/recipe/my/drafts)
  - Reprendre draft flow
  - Publish draft
  - Delete draft

- [ ] **User Profile Basic** (4h)
  - GET /user/profile
  - Display profile info
  - Edit name/avatar
  - Avatar upload

- [ ] **Navbar & Navigation** (3h)
  - Top navbar layout
  - Dropdowns (Recettes menu, User menu)
  - Responsive mobile nav
  - Login/Logout links

**Deliverables**:
- ✅ Users can register & login
- ✅ Users can create recettes (4-step wizard)
- ✅ Drafts auto-save & retrievable
- ✅ Basic profile view
- ✅ Navigation works on all pages

---

## 📝 PHASE 3: Content & Discovery (Week 3-4)

**Duration**: 10 days  
**Effort**: 25-30 hours  
**Focus**: Recipe sharing, discovery, favorites

### Tasks:

- [ ] **Shared Recipes Page** (5h)
  - GET /recipes/shared (all public recipes)
  - Grille responsive (1/2/3 columns)
  - Search by title
  - Filters: Category, Difficulty
  - Sort: Popular, Recent, Rated
  - Pagination (12 per page)

- [ ] **Recipe Detail Page** (6h)
  - Full recipe display
  - Ingredients with portioning
  - Checkboxes for ingredients
  - Numbered steps
  - Author info
  - Stats (views, favorites, ratings)
  - [Add to favorites] button

- [ ] **Favorites System** (4h)
  - POST /recipes/{id}/favorite
  - DELETE /recipes/{id}/favorite
  - My Favorites page (/recipe/favorites)
  - Favorite count display
  - Toggle button UI

- [ ] **Recipe Editing** (3h)
  - PUT /recipes/{id}
  - Edit existing recipe
  - Save changes
  - Autosave in drafts

- [ ] **Landing Page** (3h)
  - Hero section
  - Features highlights
  - CTAs (Register, Login)
  - Responsive

- [ ] **Public Profile Page** (3h)
  - /user/profile/[userId]
  - Show user info + public recipes
  - Link from recipe detail

**Deliverables**:
- ✅ Users can discover recipes
- ✅ Full recipe detail viewing
- ✅ Favorites system works
- ✅ Landing page live
- ✅ Public profiles visible

---

## 👥 PHASE 4: User Profiles & Settings (Week 4-5)

**Duration**: 10 days  
**Effort**: 20-25 hours  
**Focus**: Profile management, settings, security

### Tasks:

- [ ] **Profile Page Expansion** (5h)
  - Tab 1: Profile info (name, avatar, stats)
  - Tab 2: Settings (language, notifications, public profile)
  - Tab 3: Security (password change, sessions, delete account)
  - All forms with validation

- [ ] **Session Management** (3h)
  - List active sessions
  - Logout specific device
  - Logout all devices
  - Device info display

- [ ] **Password Management** (2h)
  - Change password (auth)
  - Forgot password (public)
  - Reset password flow (email)

- [ ] **Account Deletion** (2h)
  - Delete account endpoint
  - Cascade delete (recipes, favorites, etc)
  - Confirmation dialog
  - Email confirmation

- [ ] **Contact Form** (5h)
  - /contact page (public)
  - Form: name, email, type, message
  - Validation
  - Submit to API
  - Success page with reference number
  - Email to admin

- [ ] **Password Reset Email Flow** (3h)
  - Send email with reset link
  - Email template
  - Token generation + expiration
  - Token validation

**Deliverables**:
- ✅ Complete profile system
- ✅ Settings management
- ✅ Security features (password, sessions)
- ✅ Contact form working
- ✅ Email notifications functional

---

## 🛡️ PHASE 5: Admin & Polish (Week 5-6)

**Duration**: 10 days  
**Effort**: 20-25 hours  
**Focus**: Admin dashboard, polishing, optimization

### Tasks:

- [ ] **Admin Dashboard Setup** (3h)
  - /admin/dashboard route
  - Role-based access control
  - Stats overview cards
  - Navigation tabs

- [ ] **User Management** (4h)
  - List users table
  - Search + filtering
  - Change role (USER → ADMIN)
  - Delete user
  - Pagination

- [ ] **Recipe Moderation** (3h)
  - List recipes table
  - Search + filtering
  - Delete inappropriate recipe
  - Pagination

- [ ] **Message Management** (4h)
  - List contact messages
  - Filter by type, status
  - View message detail (modal)
  - Mark as resolved
  - Delete message

- [ ] **Design System & Interactions** (5h)
  - Toast notifications (4 types)
  - Confirmation dialogs
  - Loading states
  - Error messages
  - Empty states
  - Animations

- [ ] **Responsive Optimization** (2h)
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Touch-friendly spacing

- [ ] **Performance Optimization** (3h)
  - Image optimization (WebP, srcset)
  - Code splitting
  - Lazy loading
  - Database query optimization

**Deliverables**:
- ✅ Admin dashboard functional
- ✅ All admin features working
- ✅ Design patterns consistent
- ✅ Responsive on all devices
- ✅ Performance optimized

---

## 🧪 PHASE 6: Testing & Deployment (Week 6-7)

**Duration**: 7 days  
**Effort**: 15-20 hours  
**Focus**: Quality assurance, bug fixes, launch

### Tasks:

- [ ] **Manual Testing** (5h)
  - Test all features end-to-end
  - Test on Chrome, Firefox, Safari
  - Test on mobile, tablet, desktop
  - Test all user flows (registration, create, share, favorite, etc)

- [ ] **Security Testing** (3h)
  - XSS protection
  - CSRF protection
  - SQL injection prevention
  - Auth bypass attempts
  - Rate limiting verification

- [ ] **Performance Testing** (2h)
  - Lighthouse audit (target > 90)
  - Core Web Vitals
  - Load testing (basic)
  - Mobile performance

- [ ] **Deployment Setup** (3h)
  - Vercel deployment
  - Environment variables (.env.production)
  - Database migrations (production)
  - Email service configuration
  - Image storage configuration

- [ ] **Pre-Launch Checklist** (2h)
  - All critical bugs fixed
  - No console errors
  - Lighthouse > 90
  - No security issues
  - Terms & Privacy (stub)

**Deliverables**:
- ✅ All bugs fixed
- ✅ Ready for production
- ✅ Deployed to Vercel
- ✅ Live URL working

---

## 🐛 PHASE 7: Buffer & Bug Fixes (Week 7-8)

**Duration**: 7 days  
**Effort**: 10-15 hours  
**Focus**: Buffer for overruns, user testing, final fixes

### Tasks:

- [ ] **Buffer Time** (5h)
  - Unexpected issues
  - Scope creep handling
  - Last-minute fixes

- [ ] **User Feedback** (3h)
  - Early access testing
  - Feedback collection
  - Quick fixes based on feedback

- [ ] **Documentation** (2h)
  - Deployment docs
  - User manual (basic)
  - Troubleshooting guide

- [ ] **Launch Preparation** (2h)
  - Final checks
  - Go/No-Go decision
  - Launch communication

**Deliverables**:
- ✅ MVP live and stable
- ✅ Early users happy
- ✅ Ready for roadmap phase 2

---

## ⏰ Detailed Effort Breakdown

| Phase | Feature | Hours | Week |
|-------|---------|-------|------|
| **1** | Setup & Database | 15-18h | 1-2 |
| **2** | Auth + Recipe Creation | 30-35h | 2-3 |
| **3** | Discovery + Favorites | 25-30h | 3-4 |
| **4** | Profiles + Settings | 20-25h | 4-5 |
| **5** | Admin + Polish | 20-25h | 5-6 |
| **6** | Testing + Deploy | 15-20h | 6-7 |
| **7** | Buffer + Launch | 10-15h | 7-8 |
| **TOTAL** | MVP Complete | **95-130h** | **6-8w** |

---

## 🎯 Weekly Goals

### Week 1-2 (Setup)
- Database ready
- Authentication working
- API structure in place

### Week 2-3 (Auth + Recipes)
- Users can register & login
- Recipe creation wizard works
- Drafts auto-save

### Week 3-4 (Discovery)
- Recipe sharing functional
- Search & filters work
- Favorites system live

### Week 4-5 (Profiles)
- Full profile system
- Settings working
- Contact form live

### Week 5-6 (Admin)
- Admin dashboard functional
- All moderation features
- Design polished

### Week 6-7 (Testing)
- All bugs fixed
- Performance > 90
- Deployed & live

### Week 7-8 (Buffer)
- Early user feedback
- Final polish
- Launch ready

---

## 🚨 Critical Path

Features that **MUST** be done before launch:

1. **Auth** (login, register) - Without this, nothing else matters
2. **Recipe Creation** (4-step wizard) - Core feature
3. **Recipe Sharing** (publish/private) - Core feature
4. **Discovery** (shared recipes page) - Show value
5. **Database** (Prisma schema) - Needed for everything

**Flexibility**: Admin dashboard could be delayed if needed, but core features cannot.

---

## 🔄 Daily Standups (Recommended)

When implementing, track:

- ✅ What's done today?
- 🔄 What's next?
- 🚧 Any blockers?
- 📊 On track for timeline?

---

## 📞 Escalation Points

If **BLOCKED**:
1. Check MVP-SCOPE.md (is it actually needed?)
2. Check MVP-DEPENDENCIES.md (do prerequisite features exist?)
3. Check MVP-CHECKLIST.md (what's the minimum viable version?)
4. Consider **descoping** if necessary

---

**Created**: 2026-05-12  
**Last Updated**: 2026-05-12  
**Owner**: Adrien Mertens  
**Status**: ✅ APPROVED FOR DEVELOPMENT
