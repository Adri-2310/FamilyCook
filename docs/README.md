# 📚 Documentation FamilyCook

Structure centralisée de toute la documentation du projet.

```
docs/
├── product/          # Documentation produit
│   ├── PRD.md       # Product Requirements Document (MAIN)
│   └── ...
├── design/          # Design & UX documentation
│   ├── INDEX.md     # Table des matières design
│   ├── 01-page-accueil.md
│   ├── 02-dashboard.md
│   ├── ... (11+ pages)
│   ├── API.md       # API specifications
│   ├── DATA-MODELS.md
│   ├── DESIGN-SYSTEM.md
│   ├── WORKFLOWS.md
│   ├── INTERACTION-PATTERNS.md
│   └── ...
├── architecture/     # Architecture technique (TBD)
│   ├── SYSTEM-DESIGN.md
│   ├── DATABASE.md
│   └── ...
└── README.md        # This file
```

---

## 📖 Commencer Ici

### Pour les **Product Managers**:
1. Lire: [`product/PRD.md`](./product/PRD.md) - Vue complète du produit, roadmap, vision
2. Lire: [`design/INDEX.md`](./design/INDEX.md) - Vue d'ensemble des pages

### Pour les **Designers**:
1. Lire: [`design/DESIGN-SYSTEM.md`](./design/DESIGN-SYSTEM.md) - Tokens, colors, typography
2. Lire: [`design/INDEX.md`](./design/INDEX.md) - Toutes les pages UI
3. Consulter pages spécifiques (01-page-accueil, 02-dashboard, etc.)

### Pour les **Developers**:
1. Lire: [`product/PRD.md`](./product/PRD.md) - Vision globale
2. Lire: [`design/API.md`](./design/API.md) - Endpoints et spécifications
3. Lire: [`design/DATA-MODELS.md`](./design/DATA-MODELS.md) - Schéma base de données
4. Lire: [`design/WORKFLOWS.md`](./design/WORKFLOWS.md) - User journeys complets
5. Lire: [`design/INTERACTION-PATTERNS.md`](./design/INTERACTION-PATTERNS.md) - Standards d'interaction

---

## 🎯 Fichiers Clés

### **PRD.md** - Point de départ
- Vision produit et objectifs
- Fonctionnalités MVP + Roadmap
- User personas
- Success metrics
- Timeline

**Lire si**: Vous êtes nouveau sur le projet

---

### **Design Documentation** (design/)
- **INDEX.md**: Vue d'ensemble + index complet
- **01-13**: Pages UI avec maquettes ASCII et specs
- **API.md**: 50+ endpoints documentés
- **DATA-MODELS.md**: Schéma Prisma et relations
- **DESIGN-SYSTEM.md**: Tokens Tailwind, composants, A11y
- **WORKFLOWS.md**: User journeys complètes
- **INTERACTION-PATTERNS.md**: Standards pour toasts, modals, loading, etc.

**Lire si**: Vous implémentez une feature

---

## 📊 Quick Stats

```
Documentation totale:
├── 21 documents markdown
├── ~40,000 lignes
├── 100% couverture MVP
└── Detailled roadmap 2026-2027

Contenu:
├── 14 pages UI
├── 50+ API endpoints
├── 8 modèles de données
├── 11+ user journeys
└── Designs patterns complets
```

---

## 🔄 Workflow Documentation

1. **Feature Request** → Lire le PRD (features concernées?)
2. **Design Page** → Lire design/[PAGE].md (spécifications, maquettes)
3. **Implémenter API** → Consulter design/API.md (endpoint exact)
4. **Database** → Consulter design/DATA-MODELS.md (schéma, validation)
5. **Interactions** → Consulter design/INTERACTION-PATTERNS.md (patterns standards)

---

## 📝 Comment Mettre à Jour

Quand quelque chose change:

1. **Feature ajoutée** → Mettre à jour `product/PRD.md`
2. **Design changé** → Mettre à jour page concernée (design/NN-*.md)
3. **API changée** → Mettre à jour `design/API.md`
4. **Database changée** → Mettre à jour `design/DATA-MODELS.md`
5. **Commit** avec message clair

```bash
git add docs/
git commit -m "Mise à jour docs: [description du changement]"
```

---

## 🚀 Production

Avant le lancement:

- [ ] Vérifier que PRD est à jour
- [ ] Vérifier que toutes les pages sont documentées
- [ ] Vérifier que API spec est complète
- [ ] Vérifier que DATA-MODELS match le code
- [ ] Vérifier que WORKFLOWS couvrent tous les cas

---

## 📚 References

- [PRD.md](./product/PRD.md) - Lire en premier
- [design/INDEX.md](./design/INDEX.md) - Index complet
- [design/API.md](./design/API.md) - Spécifications API
- [design/DESIGN-SYSTEM.md](./design/DESIGN-SYSTEM.md) - Design tokens

---

**Créé**: 2026-05-12  
**Mainteneur**: Adrien Mertens  
**Status**: ✅ Production-ready
