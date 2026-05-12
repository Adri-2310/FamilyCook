# ✅ MVP Implementation Checklist

**Track progress** for each feature implementation.

---

## 🏗️ FOUNDATION (Week 1)

### Database & ORM
- [ ] Create Neon PostgreSQL database
- [ ] Prisma initialization
- [ ] .env configuration
- [ ] Create User model
- [ ] Create Recipe model
- [ ] Create Ingredient model
- [ ] Create RecipeStep model
- [ ] Create Favorite model
- [ ] Create Rating model
- [ ] Create Message model
- [ ] Create Session model
- [ ] Run migrations (dev)
- [ ] Verify schema in database

### Authentication
- [ ] Better Auth setup
- [ ] Password hashing (bcrypt)
- [ ] Session management
- [ ] Role enum (USER, ADMIN)
- [ ] Middleware for auth checks
- [ ] Auth utilities (isAuthenticated, getCurrentUser)

### API Structure
- [ ] API route organization
- [ ] Error handling (standardized responses)
- [ ] Validation middleware (Zod)
- [ ] Rate limiting setup
- [ ] CORS configuration
- [ ] Request logging

### File Storage & Email
- [ ] Vercel Blob setup
- [ ] Image upload utility
- [ ] Image crop utility
- [ ] SendGrid/Resend API setup
- [ ] Email templates

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🔐 AUTHENTICATION (Week 2)

### Login Page (/auth/login)
- [ ] Email input (with validation)
- [ ] Password input
- [ ] Remember me checkbox
- [ ] Form validation (client-side)
- [ ] POST /api/auth/login endpoint
- [ ] Error handling (wrong credentials, locked account)
- [ ] Redirect to dashboard on success
- [ ] "Forgot password?" link
- [ ] "Register" link
- [ ] Responsive design

### Register Page (/auth/register)
- [ ] Name input (2+ chars)
- [ ] Email input (unique, valid)
- [ ] Password input (8+ chars, strong)
- [ ] Confirm password input
- [ ] Form validation (client-side)
- [ ] POST /api/auth/register endpoint
- [ ] Error handling (email exists, weak password)
- [ ] Auto-login after registration
- [ ] Redirect to dashboard
- [ ] "Login" link
- [ ] Responsive design

### Forgot Password Page (/auth/forgot-password)
- [ ] Email input
- [ ] Form validation
- [ ] POST /api/auth/forgot-password endpoint
- [ ] Generate reset token
- [ ] Send email with reset link
- [ ] Rate limiting (3 per hour per IP)
- [ ] Success message ("Check your email")
- [ ] Auto-redirect to login (5 sec)
- [ ] Responsive design

### Reset Password Page (/auth/reset-password/[token])
- [ ] Extract token from URL
- [ ] Validate token (GET /api/auth/reset-password/validate)
- [ ] Show error if token invalid/expired
- [ ] Password input (new)
- [ ] Confirm password input
- [ ] Password strength indicator
- [ ] Form validation
- [ ] POST /api/auth/reset-password endpoint
- [ ] Success message
- [ ] Redirect to login (3 sec)
- [ ] Responsive design

### Logout
- [ ] Logout button in navbar
- [ ] POST /api/auth/logout endpoint
- [ ] Clear session/token
- [ ] Redirect to landing page
- [ ] Confirm logout (optional)

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 📝 RECIPE CREATION (Week 2-3)

### Recipe Create Wizard (4 steps)

#### Step 1: Basic Info
- [ ] Title input (3-255 chars, required)
- [ ] Description textarea (0-5000 chars, optional)
- [ ] Category select (APPETIZER, MAIN, DESSERT, etc)
- [ ] Difficulty select (EASY, MEDIUM, HARD)
- [ ] Prep time input (minutes)
- [ ] Cook time input (minutes)
- [ ] Base servings input (default 4)
- [ ] Form validation
- [ ] [Next] button (disabled if required fields empty)
- [ ] Auto-save to draft on blur
- [ ] Show completeness %

#### Step 2: Image
- [ ] Drag-drop zone for image
- [ ] Click [Browse files] button
- [ ] File validation (JPG, PNG, WebP, max 5MB)
- [ ] POST /api/upload endpoint
- [ ] Image preview
- [ ] Crop tool (optional)
- [ ] POST /api/upload/crop endpoint
- [ ] Save URL to recipe
- [ ] [Previous] button
- [ ] [Next] button
- [ ] Auto-save on file select

#### Step 3: Ingredients
- [ ] Add ingredient rows (name, quantity, unit)
- [ ] Ingredient name input (1-255 chars, required)
- [ ] Quantity input (> 0, required)
- [ ] Unit select (G, ML, CUP, TSP, TBSP, OZ, LB, etc)
- [ ] Min 1 ingredient required
- [ ] [+ Add ingredient] button
- [ ] [Remove] button per ingredient
- [ ] Drag-drop to reorder
- [ ] Form validation per row
- [ ] [Previous] button
- [ ] [Next] button
- [ ] Auto-save on change

#### Step 4: Steps
- [ ] Add step rows (content)
- [ ] Step content textarea (10-5000 chars, required)
- [ ] Optional: Step image upload
- [ ] Min 1 step required
- [ ] [+ Add step] button
- [ ] [Remove] button per step
- [ ] Drag-drop to reorder
- [ ] Form validation per row
- [ ] [Previous] button
- [ ] [Save as draft] button
- [ ] [Publish] button

### Publish Dialog
- [ ] Show visibility options (PRIVATE / PUBLIC)
- [ ] Explain difference
- [ ] [Cancel] button
- [ ] [Publish] button
- [ ] PUT /api/recipes/{id} endpoint
- [ ] Set isDraft=false, visibility=chosen
- [ ] Success page

### Success Page
- [ ] Show success message
- [ ] Display recipe title
- [ ] Reference number (optional)
- [ ] [View recipe] button
- [ ] [Create another] button
- [ ] Redirect to recipe detail (or optional)

### API Endpoints
- [ ] POST /api/recipes/draft (create/save draft)
- [ ] PUT /api/recipes/{id} (update recipe)
- [ ] GET /api/recipes/{id} (retrieve for editing)
- [ ] POST /api/upload (image upload)
- [ ] POST /api/upload/crop (image crop)

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 📚 RECIPE MANAGEMENT (Week 3)

### List Drafts (/recipe/my/drafts)
- [ ] GET /api/recipes/my/drafts endpoint
- [ ] Paginate (12 per page)
- [ ] Display draft cards
  - [ ] Thumbnail (or placeholder)
  - [ ] Title
  - [ ] Completeness % (0-100)
  - [ ] Last modified date
  - [ ] [Reprendre] button → /recipe/my/edit/[id]
  - [ ] [Supprimer] button → confirm delete
- [ ] Empty state (0 drafts)
- [ ] Search by title
- [ ] Sort: Recent, Oldest, Completeness
- [ ] Responsive grid (1/2/3 columns)

### Edit Recipe (/recipe/my/edit/[id])
- [ ] Load recipe from database
- [ ] Show same 4-step form (pre-filled)
- [ ] Update endpoint: PUT /api/recipes/{id}
- [ ] Auto-save on blur
- [ ] [Save & return] button
- [ ] Verify user is author (authorization)

### Delete Recipe
- [ ] [Delete] button in edit mode or detail page
- [ ] Confirmation dialog
- [ ] DELETE /api/recipes/{id} endpoint
- [ ] Verify user is author
- [ ] Cascade delete (ingredients, steps, ratings, favorites)
- [ ] Redirect to /recipe/my after delete

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🔍 DISCOVERY (Week 3)

### Shared Recipes Page (/recipe/shared)
- [ ] GET /api/recipes/shared endpoint
- [ ] Paginate (12 per page)
- [ ] Responsive grid (1/2/3 columns)
- [ ] Recipe cards:
  - [ ] Image (thumbnail)
  - [ ] Title
  - [ ] Difficulty badge
  - [ ] Rating (avg + count)
  - [ ] Published date
  - [ ] [View] button → /recipe/shared/show/[id]
  - [ ] [♡] favorite button
- [ ] Empty state (0 recipes)

### Search
- [ ] Search input (debounced 300ms)
- [ ] Search by title (case-insensitive)
- [ ] Update URL params: ?search=...
- [ ] Live results update
- [ ] Clear search button

### Filters
- [ ] Category filter (multi-select or dropdown)
- [ ] Difficulty filter (EASY, MEDIUM, HARD)
- [ ] Apply filters (update URL: ?category=...&difficulty=...)
- [ ] Clear filters button
- [ ] Show active filter count

### Sort
- [ ] Sort dropdown
- [ ] Options:
  - [ ] Popular (by favorite count)
  - [ ] Recent (by createdAt desc)
  - [ ] Rated (by avg rating desc)
- [ ] Update URL: ?sort=...
- [ ] Show current sort selection

### Pagination
- [ ] Previous/Next buttons
- [ ] Page numbers
- [ ] Total count display
- [ ] Scroll to top on page change
- [ ] Disable prev on page 1, next on last page

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 👀 RECIPE DETAIL (Week 3)

### Recipe Detail Page (/recipe/shared/show/[id])
- [ ] GET /api/recipes/{id} endpoint
- [ ] Display recipe:
  - [ ] Hero image (full-width, 16:9)
  - [ ] Title (h1)
  - [ ] Description
  - [ ] Stats (views, favorites, rating)
  - [ ] Author info (name, avatar, link to profile)
  - [ ] Publishing date
- [ ] [❤️ Add to favorites / ♡ Remove] button
  - [ ] Check if user logged in (redirect to login if not)
  - [ ] POST /api/recipes/{id}/favorite
  - [ ] DELETE /api/recipes/{id}/favorite
  - [ ] Toggle heart icon
  - [ ] Update count
- [ ] [Edit] button (show only if user is author)

### Ingredients Section
- [ ] List all ingredients
- [ ] Format: "2 cups flour" (quantity + unit + name)
- [ ] Portion adjuster
  - [ ] Input: 0.5x, 1x, 2x, or custom
  - [ ] Update all quantities in real-time
- [ ] Checkboxes per ingredient
  - [ ] Check when added to cart
  - [ ] Persist in session (optional)
  - [ ] Style: strikethrough when checked

### Steps Section
- [ ] List all steps (numbered)
- [ ] Step image (if exists)
- [ ] Step content
- [ ] Show step count
- [ ] Mark as completed (optional, checkboxes)

### Related
- [ ] [View other recipes by Author] link
  - [ ] Navigate to /user/profile/[userId]

### Loading State
- [ ] Show skeleton while loading
- [ ] Placeholder for image, text, etc

### Error State
- [ ] 404: "Recipe not found"
- [ ] 403: "Private recipe" (if you don't have access)
- [ ] Network error handling

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## ❤️ FAVORITES (Week 3-4)

### Favorites Button
- [ ] [♡] empty heart (not favorited)
- [ ] [❤️] full heart (favorited)
- [ ] Toggle on click
- [ ] Animate on toggle (scale, color)
- [ ] Show toast on add/remove
- [ ] Update counter

### My Favorites Page (/recipe/favorites)
- [ ] GET /api/recipes/favorites endpoint
- [ ] Paginate (12 per page)
- [ ] Responsive grid (1/2/3 columns)
- [ ] Display recipe cards (same as Shared Recipes)
- [ ] Empty state: "No favorites yet"
- [ ] Search by title
- [ ] Filter by category, difficulty
- [ ] Sort by: Recent, Popular

### Favorite APIs
- [ ] POST /api/recipes/{id}/favorite
- [ ] DELETE /api/recipes/{id}/favorite
- [ ] GET /api/recipes/favorites (list)
- [ ] GET /api/recipes/{id}/stats (favorite count)

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 👤 USER PROFILES (Week 4)

### Navbar & Auth Links
- [ ] Logo + brand
- [ ] [≡ Recettes ▼] menu
  - [ ] Mes recettes
  - [ ] Recettes partagées
  - [ ] Mes brouillons
  - [ ] Mes favoris
- [ ] Logged-out: [Login] [Register]
- [ ] Logged-in: [Profil ▼] menu
  - [ ] Mon profil
  - [ ] Paramètres
  - [ ] Sécurité
  - [ ] Déconnexion
- [ ] Responsive (mobile burger menu)

### Private Profile Page (/user/profile)
- [ ] Tab 1: Profile
  - [ ] Avatar (clickable to upload)
  - [ ] Name (editable)
  - [ ] Email (display only)
  - [ ] Join date
  - [ ] Stats: Recettes, Favoris
  - [ ] [Modifier] button → Edit mode
  - [ ] PUT /api/user/profile (update name)
  - [ ] POST /api/upload (avatar change)

- [ ] Tab 2: Paramètres
  - [ ] Language: FR / EN (dropdown)
  - [ ] Notifications (checkboxes)
    - [ ] Welcome emails
    - [ ] Weekly recap
    - [ ] New recipes from community
    - [ ] Suggestions
  - [ ] Profile public (toggle)
  - [ ] [Enregistrer] button
  - [ ] PUT /api/user/settings

- [ ] Tab 3: Sécurité
  - [ ] Change password form
    - [ ] Current password
    - [ ] New password
    - [ ] Confirm password
    - [ ] POST /api/user/change-password
  - [ ] Active sessions list
    - [ ] Device info (browser, OS)
    - [ ] IP address
    - [ ] Last activity
    - [ ] [Logout this device] per session
    - [ ] POST /api/user/sessions/{id}/logout
  - [ ] [Logout all devices] button
    - [ ] POST /api/user/sessions/logout-all
  - [ ] Delete account
    - [ ] Confirmation dialog
    - [ ] Ask for password confirmation
    - [ ] POST /api/user/delete
    - [ ] Cascade delete all data

### Public Profile Page (/user/profile/[userId])
- [ ] GET /api/user/[userId] endpoint
- [ ] Display user info
  - [ ] Avatar
  - [ ] Name
  - [ ] Member since date
  - [ ] Recipe count
- [ ] Display user's public recipes (grid)
  - [ ] GET /api/recipes?authorId=... query
  - [ ] Same recipe cards as Shared Recipes
  - [ ] Pagination (12 per page)
- [ ] Empty state: "No public recipes"
- [ ] 404: "User not found"

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 📧 CONTACT FORM (Week 3-4)

### Contact Page (/contact)
- [ ] Public page (no auth required)
- [ ] Hero section ("Nous écrire", etc)
- [ ] Form fields:
  - [ ] Name input (2-255 chars, required if not logged in)
  - [ ] Email input (valid, required if not logged in)
  - [ ] Type select (BUG, FEEDBACK, QUESTION)
  - [ ] Message textarea (10-5000 chars, required)
  - [ ] Consent checkbox ("M'envoyer une réponse par email")
  - [ ] Honeypot field (hidden)
- [ ] Form validation (client + server)
- [ ] POST /api/contact endpoint
- [ ] Rate limiting (5 per day per IP)
- [ ] Spam prevention (honeypot, CSRF)
- [ ] Success page
  - [ ] Show reference number
  - [ ] Message: "Message envoyé"
  - [ ] [Retour à l'accueil] button
  - [ ] Auto-redirect (5 sec)
- [ ] Error handling
  - [ ] Validation errors
  - [ ] Network errors
  - [ ] Rate limit error
- [ ] Email to admin
  - [ ] Include all message details
  - [ ] Include reference number
  - [ ] Include sender email
  - [ ] Include timestamp

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🛡️ ADMIN DASHBOARD (Week 5)

### Admin Layout & Auth
- [ ] /admin/dashboard route
- [ ] Check user.role === 'ADMIN'
- [ ] Redirect to dashboard if not admin
- [ ] Admin navbar
- [ ] Tabs navigation: [Aperçu] [Users] [Recipes] [Messages]

### Tab 1: Aperçu (Stats)
- [ ] Display stat cards:
  - [ ] Total users
  - [ ] Total recipes
  - [ ] Public recipes
  - [ ] Private recipes
  - [ ] Total favorites/likes
- [ ] Message summary:
  - [ ] 🔴 Bugs: count
  - [ ] 🟡 Feedback: count
  - [ ] 🟢 Other: count
  - [ ] ⚪ Resolved: count
- [ ] GET /api/admin/stats endpoint
- [ ] Cards clickable (navigate to sections)

### Tab 2: Users
- [ ] GET /api/admin/users endpoint
- [ ] Search input (name/email)
- [ ] Filter: Role (User, Admin, All)
- [ ] Sort: Recent, Alphabetic, Active
- [ ] User table:
  - [ ] Name
  - [ ] Email
  - [ ] Role
  - [ ] Actions [⋮]
- [ ] Pagination (20 per page)
- [ ] Actions menu:
  - [ ] View profile
  - [ ] Change role (USER ↔ ADMIN)
  - [ ] Delete user (with confirm)
  - [ ] POST /api/admin/users/{id} (update role)
  - [ ] DELETE /api/admin/users/{id}
- [ ] Confirmation dialog for destructive actions

### Tab 3: Recipes
- [ ] GET /api/admin/recipes endpoint
- [ ] Search input (title)
- [ ] Filter: Visibility (Public, Private, All)
- [ ] Sort: Recent, Popular
- [ ] Recipe table:
  - [ ] Title
  - [ ] Author
  - [ ] Visibility badge
  - [ ] Actions [⋮]
- [ ] Pagination (20 per page)
- [ ] Actions menu:
  - [ ] View recipe
  - [ ] Edit recipe
  - [ ] Delete recipe (with confirm)
  - [ ] DELETE /api/admin/recipes/{id}

### Tab 4: Messages
- [ ] GET /api/admin/messages endpoint
- [ ] Search input (content, email)
- [ ] Filter: Type (Bug, Feedback, Question, All)
- [ ] Filter: Status (New, Viewed, Resolved, All)
- [ ] Sort: Newest, Oldest
- [ ] Message table:
  - [ ] Type badge (colored)
  - [ ] Subject/Preview
  - [ ] From (name + email)
  - [ ] Date
  - [ ] Actions [⋮]
- [ ] Pagination (20 per page)
- [ ] Click row → Modal with full message
  - [ ] Full message content
  - [ ] From info (name, email, IP)
  - [ ] Date/timestamp
  - [ ] Type badge
  - [ ] [Marquer comme résolu] button
  - [ ] [Supprimer] button (with confirm)
  - [ ] [Reply] button (stub)
- [ ] Actions menu:
  - [ ] View detail
  - [ ] Mark as resolved: PUT /api/admin/messages/{id}
  - [ ] Delete: DELETE /api/admin/messages/{id}

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🏠 LANDING PAGE (Week 3-4)

### Landing Page (/)
- [ ] Hero section
  - [ ] Logo
  - [ ] Headline
  - [ ] Subheading
  - [ ] [S'inscrire] button
  - [ ] [Se connecter] button
- [ ] Features section
  - [ ] 3-4 feature highlights
  - [ ] Icons
  - [ ] Descriptions
- [ ] Note: "Connectez-vous pour voir les recettes"
- [ ] CTA section
  - [ ] "Rejoignez la communauté"
  - [ ] [S'inscrire gratuitement] button
- [ ] Footer
  - [ ] Links (Contact, Privacy, etc)
  - [ ] Copyright
- [ ] Responsive (mobile-first)
- [ ] No dependencies on other features

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🎨 DESIGN & UX (Throughout)

### Responsive Design
- [ ] Mobile (< 768px)
  - [ ] Single column layouts
  - [ ] Touch-friendly spacing (44x44px buttons)
  - [ ] Mobile nav (hamburger menu)
- [ ] Tablet (768px - 1024px)
  - [ ] 2-column layouts
  - [ ] Readable text sizes
- [ ] Desktop (> 1024px)
  - [ ] 3-column layouts
  - [ ] Full features
  - [ ] Sidebar menus

### Interactions
- [ ] Toasts (4 types: success, error, info, warning)
- [ ] Confirmation dialogs (for destructive actions)
- [ ] Loading states (spinners, disabled buttons)
- [ ] Error messages (inline + toasts)
- [ ] Empty states (friendly messages + CTAs)
- [ ] Hover effects (shadows, scale)
- [ ] Smooth animations (200-300ms)
- [ ] Focus states (visible, keyboard nav)

### Accessibility
- [ ] Focus management
- [ ] ARIA labels (buttons, icons)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Color contrast (WCAG AA: 4.5:1)
- [ ] Alt text for images
- [ ] Semantic HTML (buttons, links, labels)

### Performance
- [ ] Image optimization (WebP, srcset, lazy load)
- [ ] Code splitting (Next.js dynamic imports)
- [ ] CSS optimization (Tailwind purge)
- [ ] Database query optimization (indexes, caching)
- [ ] Lighthouse > 90
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🚀 DEPLOYMENT (Week 6-7)

### Pre-Deployment
- [ ] Environment variables configured (.env.production)
- [ ] Database migrations run (production)
- [ ] Vercel project created
- [ ] Custom domain configured (optional)
- [ ] Email service live (SendGrid/Resend)
- [ ] Image storage configured (Vercel Blob)

### Deployment
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Verify build succeeds
- [ ] Test in production (smoke tests)
- [ ] Check Lighthouse score
- [ ] Monitor error tracking (Sentry, optional)

### Post-Deployment
- [ ] Setup monitoring/alerts
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Test all features in production
- [ ] Verify email service works
- [ ] Check database backups

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🧪 TESTING & QA (Week 6)

### Manual Testing
- [ ] Test all auth flows (register, login, reset password)
- [ ] Test recipe creation (all 4 steps)
- [ ] Test recipe discovery (search, filters, pagination)
- [ ] Test favorites (add, remove)
- [ ] Test profiles (view, edit, delete)
- [ ] Test contact form
- [ ] Test admin dashboard (all tabs)
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile, tablet, desktop
- [ ] Test with slow network (throttle)

### Security Testing
- [ ] XSS prevention (try injecting scripts)
- [ ] CSRF protection (verify tokens)
- [ ] Auth bypass (try accessing protected pages)
- [ ] SQL injection (try malicious inputs)
- [ ] Rate limiting (try exceeding limits)
- [ ] Authorization (try accessing other users' data)

### Performance Testing
- [ ] Lighthouse audit (target > 90)
- [ ] Core Web Vitals check
- [ ] Load test (basic - simulate 10+ concurrent users)
- [ ] Image optimization verify
- [ ] Database query performance

### Cross-Browser & Device
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 📝 Documentation (Throughout)

### Code Comments
- [ ] Comment WHY (not WHAT)
- [ ] Document complex logic
- [ ] API endpoint comments (expected inputs/outputs)

### README Updates
- [ ] Installation instructions
- [ ] Environment setup (.env example)
- [ ] Database setup (migrations)
- [ ] Running locally (dev server)
- [ ] Running tests
- [ ] Deployment instructions

### API Documentation
- [ ] Keep design/API.md updated
- [ ] Document all endpoints
- [ ] Example requests/responses
- [ ] Error codes explained
- [ ] Rate limits documented

### User Documentation
- [ ] Feature overview
- [ ] How to create recipes
- [ ] How to discover recipes
- [ ] Account management
- [ ] FAQ (optional)

**Status**: ☐ Not Started ☐ In Progress ☐ Done

---

## 🎯 Final Checks (Before Launch)

- [ ] All features tested and working
- [ ] No critical bugs remaining
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] All endpoints responding
- [ ] Database backups configured
- [ ] Error tracking active
- [ ] Deployment working
- [ ] Team trained on deployment
- [ ] Runbooks written
- [ ] Go/No-Go approval ✅

---

**Created**: 2026-05-12  
**Last Updated**: 2026-05-12  
**Owner**: Adrien Mertens  
**Status**: ✅ READY TO USE
