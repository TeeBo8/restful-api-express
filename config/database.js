const { Sequelize } = require('sequelize');
const path = require('path');

// Initialiser Sequelize avec SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Tester la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
};

// Synchroniser les modèles avec la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Base de données synchronisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
};