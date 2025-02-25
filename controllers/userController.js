const { User, Article } = require('../models');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }
    
    // Créer l'utilisateur
    const newUser = await User.create({ name, email });
    
    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: newUser
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la création de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération des utilisateurs',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Supprimer également tous les articles de l'utilisateur
    await Article.destroy({ where: { user_id: id } });
    
    // Supprimer l'utilisateur
    await user.destroy();
    
    return res.status(200).json({ message: 'Utilisateur et ses articles supprimés avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Récupérer tous les articles d'un utilisateur
exports.getUserArticles = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    const articles = await Article.findAll({ where: { user_id: id } });
    
    return res.status(200).json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles de l\'utilisateur:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération des articles de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};