/**
 * Tests pour l'API RESTful
 * 
 * Pour exécuter ces tests, installez d'abord les dépendances de développement :
 * npm install --save-dev jest supertest
 */

const request = require('supertest');
const app = require('../server');

describe('API Routes', () => {
  // Test de la route racine
  describe('GET /', () => {
    it('devrait retourner un message de bienvenue', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });
  });

  // Tests pour les utilisateurs
  describe('User Routes', () => {
    it('GET /users devrait retourner la liste des utilisateurs', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Ajouter d'autres tests pour les utilisateurs
  });

  // Tests pour les articles
  describe('Article Routes', () => {
    it('GET /articles devrait retourner la liste des articles', async () => {
      const res = await request(app).get('/articles');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    // Ajouter d'autres tests pour les articles
  });
});