const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validationMiddleware');

// Validation pour la création d'un article
const createArticleValidation = [
  body('title').notEmpty().withMessage('Le titre est requis'),
  body('content').notEmpty().withMessage('Le contenu est requis'),
  body('user_id').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier')
];

// Validation pour la mise à jour d'un article
const updateArticleValidation = [
  body('title').optional().notEmpty().withMessage('Le titre ne peut pas être vide'),
  body('content').optional().notEmpty().withMessage('Le contenu ne peut pas être vide')
];

// Route pour créer un article
router.post('/', createArticleValidation, validationMiddleware, articleController.createArticle);

// Route pour récupérer tous les articles
router.get('/', articleController.getAllArticles);

// Route pour récupérer un article par ID
router.get('/:id', articleController.getArticleById);

// Route pour mettre à jour un article
router.put('/:id', updateArticleValidation, validationMiddleware, articleController.updateArticle);

// Route pour supprimer un article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;