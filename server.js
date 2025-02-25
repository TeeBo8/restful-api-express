const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Importer la configuration de la base de données
const { testConnection, syncDatabase } = require('./config/database');

// Initialiser l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API RESTful' });
});

// Importer les routes
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

// Utiliser les routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

// Middleware pour gérer les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Définir le port
const PORT = process.env.PORT || 3000;

// Fonction pour initialiser le serveur
const initServer = async () => {
  try {
    // Tester la connexion à la base de données
    await testConnection();
    
    // Synchroniser les modèles avec la base de données
    await syncDatabase();
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du serveur:', error);
    process.exit(1);
  }
};

// Initialiser le serveur seulement si ce fichier est exécuté directement
if (require.main === module) {
  initServer();
}

module.exports = app;