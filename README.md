# 🚀 API RESTful avec Node.js et Express

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.18.2-blue.svg)
![Sequelize](https://img.shields.io/badge/Sequelize-v6.35.1-orange.svg)
![License](https://img.shields.io/badge/License-ISC-lightgrey.svg)

Une API RESTful robuste et performante permettant de gérer des utilisateurs et leurs articles. Cette API suit les principes REST et implémente les bonnes pratiques de développement pour une application Node.js moderne.

## ✨ Fonctionnalités

- **Gestion complète des utilisateurs** (création, lecture, suppression)
- **Gestion complète des articles** (création, lecture, mise à jour, suppression)
- **Pagination des résultats** pour une meilleure performance
- **Gestion des erreurs** avec statuts HTTP appropriés et messages clairs
- **Authentification sécurisée** via JSON Web Tokens (JWT)
- **Validation des données** pour garantir l'intégrité
- **Architecture MVC** pour une meilleure organisation du code
- **Base de données SQLite** pour un déploiement facile

## 🛠️ Technologies utilisées

- **[Node.js](https://nodejs.org/)** - Environnement d'exécution JavaScript côté serveur
- **[Express](https://expressjs.com/)** - Framework web minimaliste et flexible
- **[Sequelize](https://sequelize.org/)** - ORM moderne pour Node.js
- **[SQLite](https://www.sqlite.org/)** - Base de données légère et autonome
- **[JSON Web Token](https://jwt.io/)** - Standard pour la sécurisation des échanges
- **[Express Validator](https://express-validator.github.io/)** - Middleware de validation des données
- **[dotenv](https://github.com/motdotla/dotenv)** - Gestion des variables d'environnement

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## 🚀 Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/votre-username/restful-api-express.git
cd restful-api-express
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```
Puis modifiez le fichier `.env` selon vos besoins.

4. **Démarrer le serveur**
```bash
# Mode développement avec rechargement automatique
npm run dev

# Mode production
npm start
```

## 📚 Documentation de l'API

### Gestion des utilisateurs

| Méthode | Endpoint | Description | Corps/Paramètres |
|---------|----------|-------------|------------------|
| `POST` | `/users` | Créer un utilisateur | `{ "name": "Alice", "email": "alice@mail.com" }` |
| `GET` | `/users` | Lister tous les utilisateurs | - |
| `GET` | `/users/:id` | Récupérer un utilisateur par ID | `id` (paramètre d'URL) |
| `DELETE` | `/users/:id` | Supprimer un utilisateur | `id` (paramètre d'URL) |
| `GET` | `/users/:id/articles` | Lister les articles d'un utilisateur | `id` (paramètre d'URL) |

### Gestion des articles

| Méthode | Endpoint | Description | Corps/Paramètres |
|---------|----------|-------------|------------------|
| `POST` | `/articles` | Créer un article | `{ "title": "Mon article", "content": "Contenu ici", "user_id": 1 }` |
| `GET` | `/articles` | Lister tous les articles | `page` (défaut: 1), `limit` (défaut: 10) |
| `GET` | `/articles/:id` | Récupérer un article par ID | `id` (paramètre d'URL) |
| `PUT` | `/articles/:id` | Mettre à jour un article | `{ "title": "Nouveau titre", "content": "Nouveau contenu" }` |
| `DELETE` | `/articles/:id` | Supprimer un article | `id` (paramètre d'URL) |

## 🧪 Tests

L'API est fournie avec une collection Postman et un fichier de tests HTTP pour faciliter les tests manuels.

```bash
# Pour exécuter les tests (à implémenter)
npm test
```

## 📁 Structure du projet

```
.
├── config/             # Configuration (base de données, etc.)
├── controllers/        # Contrôleurs pour la logique métier
├── middleware/         # Middleware personnalisé
├── models/             # Modèles de données
├── routes/             # Définition des routes
├── tests/              # Tests automatisés
├── .env                # Variables d'environnement
├── .env.example        # Exemple de configuration
├── .gitignore          # Fichiers à ignorer par Git
├── package.json        # Dépendances et scripts
├── README.md           # Documentation
└── server.js           # Point d'entrée de l'application
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence ISC - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

Votre Nom - [votre-email@example.com](mailto:votre-email@example.com)

Lien du projet: [https://github.com/votre-username/restful-api-express](https://github.com/votre-username/restful-api-express)