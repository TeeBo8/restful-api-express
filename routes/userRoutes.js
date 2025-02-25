const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validationMiddleware');

// Validation pour la création d'un utilisateur
const createUserValidation = [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide')
];

// Route pour créer un utilisateur
router.post('/', createUserValidation, validationMiddleware, userController.createUser);

// Route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

// Route pour récupérer tous les articles d'un utilisateur
router.get('/:id/articles', userController.getUserArticles);

module.exports = router;