# 📋 API Documentation - FamilyCook

## Vue d'ensemble

Tous les endpoints de l'API FamilyCook. Format standardisé pour cohérence.

**Base URL**: `https://familycook.app/api`  
**Version**: v1 (implicite dans les URLs)  
**Auth**: Better Auth (cookies + tokens)  
**Rate Limit**: 100 req/min par utilisateur

---

## Convention de notation

```
METHOD /path
├── Auth: ❌ (public) | ✅ (required) | 🔐 (admin only)
├── Query params: [optional], {required}
├── Body: {...}
└── Response: {200: {...}, 400: "error", 401: "Unauthorized"}
```

---

## 🔐 Authentication

All authenticated endpoints require:
```
Header: Authorization: Bearer {token}
OR Cookie: __Secure-auth-token={token}
```

Token obtained from:
- `POST /auth/login` (email/password)
- `POST /auth/register` (new account)
- `POST /auth/oauth/{provider}` (Google/GitHub)

Admin role required endpoints: Check `user.role === 'ADMIN'`

---

## 📚 Endpoints

### 🔐 Authentication

#### POST /auth/login
```
Login with email and password

Auth: ❌
Body: {
  email: string (required, valid email),
  password: string (required, min 8),
  rememberMe?: boolean
}
Response: {
  200: {user: User, token: string, redirectTo: '/user/dashboard'},
  400: "Invalid email or password",
  429: "Too many login attempts"
}
Rate limit: 5 per 15 min per IP
```

#### POST /auth/register
```
Create new account

Auth: ❌
Body: {
  name: string (required, min 2),
  email: string (required, unique, valid),
  password: string (required, min 8, strong)
}
Response: {
  200: {user: User, token: string},
  400: "Email already in use",
  422: "Validation error"
}
```

#### POST /auth/oauth/{provider}
```
OAuth login (Google, GitHub)

Auth: ❌
Body: {
  code: string (OAuth code),
  state: string (CSRF token)
}
Response: {
  200: {user: User, token: string},
  401: "OAuth provider error"
}
Providers: google, github
```

#### POST /auth/logout
```
Logout (clear session)

Auth: ✅
Response: {200: {success: true}}
```

#### POST /auth/forgot-password
```
Request password reset email

Auth: ❌
Body: {email: string}
Response: {200: "Check your email"}
Rate limit: 3 per hour per IP
```

#### GET /auth/reset-password/validate
```
Validate reset password token

Auth: ❌
Query: {token: string}
Response: {
  200: {valid: true},
  400: {valid: false, reason: "expired|invalid"}
}
Rate limit: 20 per hour per IP
```

#### POST /auth/reset-password
```
Reset password with token

Auth: ❌
Body: {
  token: string (from email link),
  newPassword: string (min 8, strong)
}
Response: {
  200: {success: true},
  400: "Invalid or expired token",
  422: "Password validation failed"
}
Rate limit: 5 per 15 min per IP
```

---

### 👤 User Profile

#### GET /user/profile
```
Get current user profile

Auth: ✅
Response: {
  200: {
    id: string,
    name: string,
    email: string,
    avatar?: string,
    role: 'USER' | 'ADMIN',
    createdAt: Date,
    recipeCount: number,
    favoriteCount: number,
    publicRecipeCount: number,
    settings: {
      language: 'fr' | 'en',
      notifications: boolean[],
      profilePublic: boolean
    }
  }
}
```

#### PUT /user/profile
```
Update user name

Auth: ✅
Body: {name: string (min 2)}
Response: {200: {user: User}}
```

#### PUT /user/settings
```
Update user settings

Auth: ✅
Body: {
  language?: 'fr' | 'en',
  notifications?: {
    welcomeEmails: boolean,
    weeklyRecap: boolean,
    newRecipes: boolean,
    suggestions: boolean
  },
  profilePublic?: boolean
}
Response: {200: {settings: {...}}}
```

#### POST /user/change-password
```
Change password

Auth: ✅
Body: {
  currentPassword: string,
  newPassword: string (min 8)
}
Response: {
  200: {success: true},
  401: "Current password incorrect"
}
```

#### GET /user/sessions
```
Get active sessions (devices)

Auth: ✅
Response: {
  200: [{
    id: string,
    device: string (browser/mobile),
    os: string,
    ipAddress: string,
    lastActivity: Date,
    isCurrentSession: boolean
  }]
}
```

#### POST /user/sessions/{sessionId}/logout
```
Logout specific device

Auth: ✅
Response: {200: {success: true}}
```

#### POST /user/sessions/logout-all
```
Logout all devices

Auth: ✅
Response: {200: {success: true}}
```

#### POST /user/delete
```
Delete account (cascade delete)

Auth: ✅
Body: {password: string (confirmation)}
Response: {
  200: {success: true},
  401: "Password incorrect"
}
```

#### GET /user/[userId]
```
Get public user profile (view another user - logged-in only)

Auth: ✅
Response: {
  200: {
    id: string,
    name: string,
    avatar?: string,
    recipeCount: number,
    createdAt: Date
  },
  404: "User not found"
}
```

---

### 📝 Recipes

#### POST /recipes
```
Create new recipe

Auth: ✅
Body: {
  title: string (required, min 3),
  description: string (max 500),
  category: enum (APPETIZER, MAIN, DESSERT, etc),
  difficulty: enum (EASY, MEDIUM, HARD),
  prepTime: number (minutes),
  cookTime: number (minutes),
  baseServings: number (default 4),
  visibility: 'PUBLIC' | 'PRIVATE',
  coverImageUrl?: string,
  ingredients: [{name, quantity, unit}],
  steps: [{content}]
}
Response: {
  201: {recipe: Recipe},
  400: "Validation error"
}
```

#### PUT /recipes/{id}
```
Update recipe (only owner)

Auth: ✅
Body: Same as POST
Response: {
  200: {recipe: Recipe},
  403: "Not authorized",
  404: "Recipe not found"
}
```

#### GET /recipes/{id}
```
Get recipe details (logged-in users only)

Auth: ✅
Response: {
  200: {
    id, title, description, category, difficulty,
    prepTime, cookTime, baseServings,
    coverImageUrl,
    ingredients: [{name, quantity, unit}],
    steps: [{content}],
    author: {name, avatar, email},
    visibility, createdAt, updatedAt,
    rating?: {average, count},
    favoriteCount: number
  },
  404: "Recipe not found"
}
```

#### GET /recipes/my
```
Get current user's recipes (published only)

Auth: ✅
Query: {
  search?: string,
  category?: string,
  visibility?: 'PUBLIC' | 'PRIVATE',
  sort?: 'recent' | 'title' | 'popular',
  page?: number (default 1),
  limit?: number (default 12)
}
Response: {
  200: {
    recipes: Recipe[],
    total: number,
    page: number,
    totalPages: number
  }
}
```

#### GET /recipes/my/drafts
```
Get current user's draft recipes (isDraft = true)

Auth: ✅
Query: {
  search?: string,
  sort?: 'recent' | 'oldest' | 'completeness',
  page?: number (default 1),
  limit?: number (default 12)
}
Response: {
  200: {
    recipes: [{
      id, title, description, category, difficulty,
      prepTime, cookTime, baseServings, coverImageUrl,
      ingredientCount, stepCount,
      completeness: number (0-100),
      createdAt, updatedAt
    }],
    total: number,
    page: number,
    totalPages: number
  }
}
```

#### POST /recipes/draft
```
Create or save a draft recipe

Auth: ✅
Body: {
  title?: string,
  description?: string,
  category?: enum,
  difficulty?: enum,
  prepTime?: number,
  cookTime?: number,
  baseServings?: number,
  coverImageUrl?: string,
  ingredients?: [{name, quantity, unit}],
  steps?: [{content}]
}
Response: {
  201: {recipe: Recipe (with isDraft=true)},
  400: "Validation error"
}
```

#### PUT /recipes/[id]/publish
```
Publish a draft recipe (change isDraft to false + set visibility)

Auth: ✅
Body: {
  visibility: 'PUBLIC' | 'PRIVATE'
}
Response: {
  200: {recipe: Recipe (isDraft=false)},
  403: "Not authorized",
  404: "Recipe not found"
}
```

#### GET /recipes/shared
```
Get public recipes from community (logged-in users only)

Auth: ✅
Query: {
  search?: string,
  category?: string,
  difficulty?: string,
  sort?: 'popular' | 'recent' | 'rated',
  page?: number,
  limit?: number
}
Response: {
  200: {
    recipes: Recipe[],
    total: number,
    page: number,
    totalPages: number
  }
}
```

#### GET /recipes/favorites
```
Get current user's favorite recipes

Auth: ✅
Query: {
  search?: string,
  category?: string,
  difficulty?: string,
  sort?: 'recent' | 'title' | 'popular',
  page?: number,
  limit?: number
}
Response: {
  200: {
    recipes: Recipe[],
    total: number,
    page: number,
    totalPages: number
  }
}
```

#### DELETE /recipes/{id}
```
Delete recipe (only owner)

Auth: ✅
Response: {
  200: {success: true},
  403: "Not authorized",
  404: "Recipe not found"
}
```

#### POST /recipes/{id}/favorite
```
Add/Toggle favorite

Auth: ✅
Response: {
  200: {favorited: boolean}
}
```

#### DELETE /recipes/{id}/favorite
```
Remove from favorites

Auth: ✅
Response: {
  200: {success: true}
}
```

#### GET /recipes/{id}/stats
```
Get recipe statistics

Auth: ✅
Response: {
  200: {
    views: number,
    favorites: number,
    rating: {average: number, count: number},
    lastViewed: Date
  }
}
```

#### POST /recipes/{id}/ratings
```
Rate a recipe

Auth: ✅
Body: {rating: number (1-5)}
Response: {
  200: {success: true},
  400: "Invalid rating"
}
```

---

### 🖼️ Uploads

#### POST /upload
```
Upload image file

Auth: ✅
Body: FormData {
  file: File (JPG, PNG, max 5MB)
}
Response: {
  200: {url: string, filename: string},
  413: "File too large",
  415: "Unsupported file type"
}
Rate limit: 20 per hour per user
```

#### POST /upload/crop
```
Crop and optimize image

Auth: ✅
Body: {
  imageUrl: string,
  cropData: {x, y, width, height}
}
Response: {
  200: {url: string}
}
```

---

### 💬 Contact & Messages

#### POST /contact
```
Submit contact form message

Auth: ❌ (or ✅ for auto-fill)
Body: {
  name: string (required),
  email: string (required, valid),
  type: 'BUG' | 'FEEDBACK' | 'QUESTION',
  message: string (10-5000 chars),
  consentEmail?: boolean
}
Response: {
  200: {
    success: true,
    referenceNumber: string
  },
  400: "Validation error",
  429: "Rate limited"
}
Rate limit: 5 per day per IP
```

#### GET /admin/messages
```
Get all contact messages (admin only)

Auth: 🔐
Query: {
  search?: string,
  type?: 'BUG' | 'FEEDBACK' | 'QUESTION',
  status?: 'NEW' | 'VIEWED' | 'RESOLVED',
  sort?: 'newest' | 'oldest',
  page?: number
}
Response: {
  200: {
    messages: Message[],
    total: number,
    page: number,
    totalPages: number
  }
}
```

#### GET /admin/messages/{id}
```
Get message detail (admin only)

Auth: 🔐
Response: {
  200: {
    id, name, email, type, message,
    referenceNumber, status,
    createdAt, ipAddress, userAgent
  }
}
```

#### PUT /admin/messages/{id}
```
Update message status (admin only)

Auth: 🔐
Body: {status: 'NEW' | 'VIEWED' | 'RESOLVED'}
Response: {200: {success: true}}
```

#### DELETE /admin/messages/{id}
```
Delete message (admin only)

Auth: 🔐
Response: {200: {success: true}}
```

---

### 📊 Admin Dashboard

#### GET /admin/stats
```
Get dashboard statistics (admin only)

Auth: 🔐
Response: {
  200: {
    userCount: number,
    recipeCount: number,
    publicRecipes: number,
    privateRecipes: number,
    totalLikes: number,
    newMessages: {
      bugs: number,
      feedback: number,
      questions: number,
      other: number
    }
  }
}
```

#### GET /admin/users
```
List all users (admin only)

Auth: 🔐
Query: {
  search?: string,
  role?: 'USER' | 'ADMIN',
  sort?: 'recent' | 'alphabetic' | 'active',
  page?: number
}
Response: {
  200: {users: User[], total, page, totalPages}
}
```

#### PUT /admin/users/{id}
```
Update user (change role, etc) (admin only)

Auth: 🔐
Body: {role?: 'USER' | 'ADMIN'}
Response: {200: {user: User}}
```

#### DELETE /admin/users/{id}
```
Delete user account (admin only)

Auth: 🔐
Response: {200: {success: true}}
```

#### GET /admin/recipes
```
List all recipes with moderation (admin only)

Auth: 🔐
Query: {
  search?: string,
  visibility?: 'PUBLIC' | 'PRIVATE',
  sort?: 'recent' | 'popular',
  page?: number
}
Response: {
  200: {recipes: Recipe[], total, page, totalPages}
}
```

#### DELETE /admin/recipes/{id}
```
Delete recipe (admin moderation) (admin only)

Auth: 🔐
Response: {200: {success: true}}
```

---

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email",
    "details": [...]
  }
}
```

### Common Error Codes

```
400: Bad Request (validation error)
401: Unauthorized (auth required)
403: Forbidden (not authorized for resource)
404: Not Found
409: Conflict (duplicate email, etc)
413: Payload Too Large
415: Unsupported Media Type
429: Too Many Requests (rate limit)
500: Internal Server Error
503: Service Unavailable
```

---

## Rate Limiting

```
Default: 100 requests per minute per user
Auth endpoints: 5 per 15 minutes per IP
Upload: 20 per hour per user
Contact: 5 per day per IP

Response headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1652398234 (Unix timestamp)
```

---

## Webhooks (Future)

```
POST /webhooks/recipe-created
POST /webhooks/recipe-deleted
POST /webhooks/message-received
```

---

## Version History

- **v1** (current): Initial API design
- Future: v2 planned improvements

---

**Dernière mise à jour**: 2026-05-12  
**Total endpoints**: 40+  
**Status**: Production ready
