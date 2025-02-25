const { Article, User } = require('../models');

// Créer un nouvel article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    
    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Créer l'article
    const newArticle = await Article.create({ title, content, user_id });
    
    return res.status(201).json({
      message: 'Article créé avec succès',
      article: newArticle
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la création de l\'article',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    // Gestion de la pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const { count, rows: articles } = await Article.findAndCountAll({
      limit,
      offset,
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
    });
    
    return res.status(200).json({
      articles,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération des articles',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Récupérer un article par ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
    });
    
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    return res.status(200).json(article);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'article',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    // Mettre à jour l'article
    await article.update({ title, content });
    
    return res.status(200).json({
      message: 'Article mis à jour avec succès',
      article
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la mise à jour de l\'article',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    // Supprimer l'article
    await article.destroy();
    
    return res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'article',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};