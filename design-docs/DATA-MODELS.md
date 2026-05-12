# 🗄️ Data Models - FamilyCook

## Vue d'ensemble

Schéma complet des données FamilyCook avec définitions des modèles, types, relations et contraintes.

**ORM**: Prisma  
**Database**: PostgreSQL (Neon)  
**Format**: TypeScript types + Prisma schema

---

## 📊 Modèles principaux

### User

Représente un utilisateur de l'application.

```typescript
model User {
  id                    String      @id @default(cuid())
  email                 String      @unique
  name                  String
  password              String      @db.VarChar(255)
  avatar                String?     // URL to avatar image
  role                  Role        @default(USER)
  
  // Profile
  profilePublic         Boolean     @default(false)
  
  // Settings
  language              Language    @default(FR)
  notificationsEnabled  Boolean     @default(true)
  notificationSettings  Json        @default("{\"welcomeEmails\":true,\"weeklyRecap\":true,\"newRecipes\":true,\"suggestions\":true}")
  
  // Relations
  recipes               Recipe[]
  favorites             Favorite[]
  ratings               Rating[]
  sessions              Session[]
  
  // Timestamps
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([email])
  @@index([createdAt])
}

enum Role {
  USER
  ADMIN
}

enum Language {
  FR
  EN
}
```

### Recipe

Représente une recette partagée ou privée.

```typescript
model Recipe {
  id                    String      @id @default(cuid())
  
  // Basic info
  title                 String      @db.VarChar(255)
  description           String?     @db.Text
  
  // Metadata
  category              RecipeCategory
  difficulty            DifficultyLevel
  
  // Timing & servings
  prepTime              Int         // minutes
  cookTime              Int         // minutes
  baseServings          Int         @default(4)
  
  // Media
  coverImageUrl         String?     // URL to cover image
  
  // Content
  ingredients           Ingredient[]
  steps                 RecipeStep[]
  
  // Sharing & visibility
  isDraft               Boolean     @default(true)  // true = brouillon, false = finalisée
  visibility            Visibility  @default(PRIVATE)  // PRIVATE | PUBLIC (ignoré si isDraft=true)
  
  // Stats
  favorites             Favorite[]
  ratings               Rating[]
  viewCount             Int         @default(0)
  
  // Relations
  authorId              String
  author                User        @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([authorId])
  @@index([visibility])
  @@index([category])
  @@index([createdAt])
  @@index([viewCount])
}

enum RecipeCategory {
  APPETIZER
  MAIN
  DESSERT
  SIDE
  SOUP
  SALAD
  BEVERAGE
  BREAKFAST
  SAUCE
  OTHER
}

enum DifficultyLevel {
  EASY
  MEDIUM
  HARD
}

enum Visibility {
  PUBLIC
  PRIVATE
}
```

### Ingredient

Représente un ingrédient dans une recette.

```typescript
model Ingredient {
  id                    String      @id @default(cuid())
  
  // Info
  name                  String      @db.VarChar(255)
  quantity              Float
  unit                  IngredientUnit
  notes                  String?     @db.VarChar(255)
  
  // Position in recipe
  position              Int         // Order in ingredient list
  
  // Relations
  recipeId              String
  recipe                Recipe      @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([recipeId])
}

enum IngredientUnit {
  G
  KG
  ML
  L
  TSP
  TBSP
  CUP
  OZ
  LB
  PIECE
  PINCH
  DASH
}
```

### RecipeStep

Représente une étape de préparation.

```typescript
model RecipeStep {
  id                    String      @id @default(cuid())
  
  // Content
  content               String      @db.Text
  
  // Position in recipe
  position              Int         // Order in steps list
  
  // Image (optional)
  imageUrl              String?     // URL to step image
  
  // Relations
  recipeId              String
  recipe                Recipe      @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([recipeId])
}
```

### Favorite

Représente une recette mise en favori par un utilisateur.

```typescript
model Favorite {
  id                    String      @id @default(cuid())
  
  // Relations
  userId                String
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  recipeId              String
  recipe                Recipe      @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt             DateTime    @default(now())
  
  // Constraints
  @@unique([userId, recipeId])
  @@index([userId])
  @@index([recipeId])
}
```

### Rating

Représente une note donnée à une recette.

```typescript
model Rating {
  id                    String      @id @default(cuid())
  
  // Rating
  rating                Int         // 1-5
  comment               String?     @db.Text
  
  // Relations
  userId                String
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  recipeId              String
  recipe                Recipe      @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  // Constraints
  @@unique([userId, recipeId])
  @@index([userId])
  @@index([recipeId])
}
```

### Message (Contact Form)

Représente un message de contact reçu.

```typescript
model Message {
  id                    String      @id @default(cuid())
  referenceNumber       String      @unique // #MSG-YYYY-MMDD-NNNNN
  
  // Sender info
  name                  String      @db.VarChar(255)
  email                 String      @db.VarChar(255)
  
  // Message content
  type                  MessageType
  message               String      @db.Text
  
  // Metadata
  status                MessageStatus @default(NEW)
  userId                String?     // If user was logged in
  ipAddress             String?
  userAgent             String?     @db.Text
  
  // Consent
  consentEmail          Boolean     @default(true)
  
  // Timestamps
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([type])
  @@index([status])
  @@index([createdAt])
  @@index([email])
}

enum MessageType {
  BUG
  FEEDBACK
  QUESTION
}

enum MessageStatus {
  NEW
  VIEWED
  RESOLVED
}
```

### Session

Représente une session authentifiée (gérée par Better Auth).

```typescript
model Session {
  id                    String      @id @default(cuid())
  sessionToken          String      @unique
  
  // Relations
  userId                String
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Device info
  device                String?     // Browser/Mobile identifier
  os                    String?     // Operating system
  ipAddress             String?
  userAgent             String?     @db.Text
  
  // Timestamps
  expiresAt             DateTime
  lastActivityAt        DateTime    @default(now())
  createdAt             DateTime    @default(now())
  
  @@index([userId])
  @@index([expiresAt])
}
```

---

## 📈 Relations & Cardinalités

```
User (1) ──→ (N) Recipe
  └─ One user can have many recipes
  └─ onDelete: Cascade (delete user → delete their recipes)

User (N) ──→ (N) Recipe [Favorite]
  └─ Many users can favorite many recipes
  └─ Unique constraint: (userId, recipeId)

User (N) ──→ (N) Recipe [Rating]
  └─ Many users can rate many recipes
  └─ Unique constraint: (userId, recipeId)

Recipe (1) ──→ (N) Ingredient
  └─ One recipe has many ingredients
  └─ onDelete: Cascade

Recipe (1) ──→ (N) RecipeStep
  └─ One recipe has many steps
  └─ onDelete: Cascade

User (1) ──→ (N) Session
  └─ One user can have many sessions (multiple devices)
  └─ onDelete: Cascade
```

---

## 🔑 Primary Keys & Indexes

```
User:
├── Primary: id (CUID)
└── Indexes:
    ├── email (UNIQUE)
    ├── createdAt (for sorting)

Recipe:
├── Primary: id (CUID)
└── Indexes:
    ├── authorId (for user's recipes)
    ├── visibility (for filtering)
    ├── category (for filtering)
    ├── createdAt (for sorting)
    └── viewCount (for popularity)

Ingredient:
├── Primary: id (CUID)
└── Indexes:
    └── recipeId (for recipe's ingredients)

RecipeStep:
├── Primary: id (CUID)
└── Indexes:
    └── recipeId (for recipe's steps)

Favorite:
├── Primary: id (CUID)
└── Indexes:
    ├── userId (for user's favorites)
    ├── recipeId (for recipe's favs)
    └── Unique (userId, recipeId)

Rating:
├── Primary: id (CUID)
└── Indexes:
    ├── userId (for user's ratings)
    ├── recipeId (for recipe's ratings)
    └── Unique (userId, recipeId)

Message:
├── Primary: id (CUID)
└── Indexes:
    ├── referenceNumber (UNIQUE)
    ├── type (for filtering)
    ├── status (for filtering)
    ├── createdAt (for sorting)
    └── email (for lookup)

Session:
├── Primary: id (CUID)
└── Indexes:
    ├── sessionToken (UNIQUE)
    ├── userId (for user's sessions)
    └── expiresAt (for cleanup)
```

---

## 📋 Field Specifications

### User Fields

```
id: CUID (auto-generated)
email: unique, lowercase, valid email format
name: 2-255 characters
password: hashed (bcrypt or similar)
avatar: nullable URL string
role: USER or ADMIN (default: USER)
profilePublic: boolean (default: false)
language: FR or EN (default: FR)
notificationsEnabled: boolean (default: true)
notificationSettings: JSON with keys:
  ├── welcomeEmails: boolean
  ├── weeklyRecap: boolean
  ├── newRecipes: boolean
  └── suggestions: boolean
```

### Recipe Fields

```
id: CUID (auto-generated)
title: 3-255 characters, required
description: 0-5000 characters, optional
category: enum (10 categories)
difficulty: EASY, MEDIUM, HARD
prepTime: 0-999 minutes
cookTime: 0-999 minutes
baseServings: 1-100 (default: 4)
coverImageUrl: nullable URL
visibility: PUBLIC or PRIVATE (default: PRIVATE)
viewCount: incremented on view
authorId: reference to User
ingredients: array of Ingredient objects
steps: array of RecipeStep objects
```

### Ingredient Fields

```
id: CUID (auto-generated)
name: 1-255 characters, required
quantity: float (0.1-9999.9)
unit: enum (12 standard units)
notes: optional 0-255 characters
position: integer (order in list)
recipeId: reference to Recipe
```

### RecipeStep Fields

```
id: CUID (auto-generated)
content: 10-5000 characters, required
position: integer (order in list)
imageUrl: nullable URL
recipeId: reference to Recipe
```

### Message Fields

```
id: CUID (auto-generated)
referenceNumber: unique, format #MSG-YYYY-MMDD-NNNNN
name: 2-255 characters
email: valid email format
type: BUG, FEEDBACK, QUESTION
message: 10-5000 characters
status: NEW, VIEWED, RESOLVED (default: NEW)
userId: nullable (for authenticated users)
ipAddress: nullable
userAgent: nullable (for tracking)
consentEmail: boolean (opt-in for reply)
```

---

## 🔍 Query Patterns

### Common Queries

```typescript
// Get user's recipes
User.recipes → Recipe[]

// Get all public recipes
Recipe.findMany({
  where: { visibility: 'PUBLIC' },
  include: { author: true },
  orderBy: { createdAt: 'desc' }
})

// Get recipe with all details
Recipe.findUnique({
  where: { id },
  include: {
    author: true,
    ingredients: { orderBy: { position: 'asc' } },
    steps: { orderBy: { position: 'asc' } },
    _count: { select: { favorites: true, ratings: true } }
  }
})

// Get user's favorites
Favorite.findMany({
  where: { userId },
  include: { recipe: true },
  orderBy: { createdAt: 'desc' }
})

// Check if user favorited recipe
Favorite.findUnique({
  where: { userId_recipeId: { userId, recipeId } }
})

// Get recipe stats
{
  ratings: Rating.aggregate({
    where: { recipeId },
    _avg: { rating: true },
    _count: true
  }),
  favorites: Favorite.count({ where: { recipeId } }),
  views: Recipe.findUnique({ where: { id }, select: { viewCount: true } })
}

// Search recipes (title or description)
Recipe.findMany({
  where: {
    visibility: 'PUBLIC',
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } }
    ]
  },
  orderBy: { viewCount: 'desc' }
})

// Get contact messages (admin)
Message.findMany({
  where: {
    AND: [
      type === 'BUG' ? { type: 'BUG' } : {},
      status === 'NEW' ? { status: 'NEW' } : {}
    ]
  },
  orderBy: { createdAt: 'desc' },
  skip: (page - 1) * 20,
  take: 20
})
```

---

## 🔐 Data Validation Rules

### User

```
email:
  ✓ Required
  ✓ Unique
  ✓ Valid email format (RFC 5322)
  ✓ Lowercase

password:
  ✓ Min 8 characters
  ✓ At least 1 uppercase
  ✓ At least 1 lowercase
  ✓ At least 1 number
  ✓ Hashed before storage (bcrypt, salt rounds: 12)

name:
  ✓ Required
  ✓ Min 2 characters
  ✓ Max 255 characters
  ✓ No leading/trailing whitespace

avatar:
  ✓ Valid URL (https only)
  ✓ Image MIME type (jpg, png, webp)

language:
  ✓ FR or EN only
```

### Recipe

```
title:
  ✓ Required
  ✓ Min 3 characters
  ✓ Max 255 characters
  ✓ Trim whitespace

description:
  ✓ Max 5000 characters
  ✓ Optional

category:
  ✓ Valid enum value
  ✓ Required

difficulty:
  ✓ EASY, MEDIUM, HARD only

prepTime, cookTime:
  ✓ Non-negative integer
  ✓ Max 999 minutes

baseServings:
  ✓ Integer 1-100
  ✓ Default 4

coverImageUrl:
  ✓ Valid URL (https)
  ✓ Image MIME type
  ✓ Optional

visibility:
  ✓ PUBLIC or PRIVATE
  ✓ Default PRIVATE

ingredients:
  ✓ At least 1 ingredient
  ✓ Each ingredient validated

steps:
  ✓ At least 1 step
  ✓ Each step validated
```

### Ingredient

```
name:
  ✓ Required
  ✓ Min 1 character
  ✓ Max 255 characters

quantity:
  ✓ Required
  ✓ Positive number
  ✓ 0.1 - 9999.9

unit:
  ✓ Valid enum value
  ✓ Required

position:
  ✓ Non-negative integer
  ✓ Auto-assigned if not provided
```

### RecipeStep

```
content:
  ✓ Required
  ✓ Min 10 characters
  ✓ Max 5000 characters

position:
  ✓ Non-negative integer
  ✓ Auto-assigned if not provided

imageUrl:
  ✓ Valid URL (https)
  ✓ Optional
```

### Message

```
name:
  ✓ Required
  ✓ Min 2 characters
  ✓ Max 255 characters

email:
  ✓ Required
  ✓ Valid email format
  ✓ Lowercase

type:
  ✓ BUG, FEEDBACK, QUESTION
  ✓ Required

message:
  ✓ Required
  ✓ Min 10 characters
  ✓ Max 5000 characters

consentEmail:
  ✓ Boolean (default true)
```

### Rating

```
rating:
  ✓ Integer 1-5
  ✓ Required

comment:
  ✓ Max 5000 characters
  ✓ Optional
```

---

## 🗑️ Cascade Behaviors

```
User deletion:
├── Delete all User.recipes (cascade)
├── Delete all Favorite entries for user
├── Delete all Rating entries from user
└── Delete all Session entries

Recipe deletion:
├── Delete all Ingredient entries (cascade)
├── Delete all RecipeStep entries (cascade)
├── Delete all Favorite entries
└── Delete all Rating entries
```

---

## 📊 Database Optimization

### Indexes Strategy

```
High-traffic queries:
├── User: email (login)
├── Recipe: authorId (user's recipes)
├── Recipe: visibility (public feed)
├── Recipe: createdAt (sorting)
├── Message: status, type (admin dashboard)
└── Favorite: (userId, recipeId) unique

Expected index sizes:
├── User (10k-100k rows): small
├── Recipe (5k-50k rows): medium
├── Ingredient (30k-500k rows): medium
├── RecipeStep (30k-500k rows): medium
├── Favorite (20k-200k rows): medium
├── Rating (10k-100k rows): small
└── Message (1k-10k rows): small
```

### Query Performance

```
Recipe listing (public feed):
├── Query: SELECT * FROM Recipe WHERE visibility='PUBLIC' ORDER BY createdAt DESC LIMIT 20
├── Indexes needed: (visibility, createdAt)
├── Estimated time: <100ms

User's recipes:
├── Query: SELECT * FROM Recipe WHERE authorId=x
├── Indexes needed: (authorId)
├── Estimated time: <50ms

Recipe detail with stats:
├── Query: 1 Recipe + 3 counts + relations
├── Indexes needed: primary + foreign keys
├── Estimated time: <200ms
```

---

## 🔄 Migration Strategy

```
Phase 1: Core tables
└── User, Recipe, Ingredient, RecipeStep

Phase 2: Relations
└── Favorite, Rating

Phase 3: Content Management
└── Message, Session

Phase 4: Enhancements (future)
└── Comments, Tags, Collections
```

---

## 📝 Implementation Checklist

- [ ] Define Prisma schema with all models
- [ ] Create database indexes
- [ ] Set up migrations
- [ ] Add validation rules
- [ ] Create seed data for testing
- [ ] Add database error handling
- [ ] Set up connection pooling (Neon PgBouncer)
- [ ] Test cascade deletions
- [ ] Monitor slow queries
- [ ] Document any custom SQL

---

**Créé le**: 2026-05-12  
**Status**: 📋 Documentation complète  
**ORM**: Prisma  
**Database**: PostgreSQL (Neon)  
**Version**: 1.0
