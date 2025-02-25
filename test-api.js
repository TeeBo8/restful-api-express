const http = require('http');
const app = require('./server'); // Importer l'application Express

let server;

// Fonction pour démarrer le serveur
function startServer() {
  return new Promise((resolve) => {
    server = app.listen(3000, () => {
      console.log('Serveur de test démarré sur le port 3000');
      resolve();
    });
  });
}

// Fonction pour arrêter le serveur
function stopServer() {
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.log('Serveur de test arrêté');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Fonction pour envoyer une requête à l'API
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    // Options de la requête
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Créer la requête
    const req = http.request(options, (res) => {
      let responseData = '';

      // Collecter les données de la réponse
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      // Quand la réponse est complète
      res.on('end', () => {
        console.log(`\n--- Réponse de ${method} ${path} ---`);
        console.log(`Status: ${res.statusCode}`);
        try {
          const parsedData = JSON.parse(responseData);
          console.log('Données:', JSON.stringify(parsedData, null, 2));
          resolve(parsedData);
        } catch (e) {
          console.log('Données:', responseData);
          resolve(responseData);
        }
      });
    });

    // Gérer les erreurs
    req.on('error', (error) => {
      console.error(`Erreur lors de la requête: ${error.message}`);
      reject(error);
    });

    // Envoyer les données si nécessaire
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    // Terminer la requête
    req.end();
  });
}

// Fonction principale pour exécuter les tests
async function runTests() {
  try {
    // Démarrer le serveur avant les tests
    await startServer();
    
    console.log("=== DÉBUT DES TESTS DE L'API ===");

    // 1. Créer un utilisateur
    console.log("\n1. Création d'un utilisateur");
    const newUser = await makeRequest('POST', '/users', {
      name: "Alice",
      email: "alice@mail.com"
    });

    // 2. Récupérer tous les utilisateurs
    console.log("\n2. Liste de tous les utilisateurs");
    await makeRequest('GET', '/users');

    // Si l'utilisateur a été créé avec succès et a un ID
    if (newUser && newUser.user && newUser.user.id) {
      const userId = newUser.user.id;

      // 3. Récupérer l'utilisateur par son ID
      console.log(`\n3. Détails de l'utilisateur avec l'ID ${userId}`);
      await makeRequest('GET', `/users/${userId}`);

      // 4. Créer un article pour cet utilisateur
      console.log(`\n4. Création d'un article pour l'utilisateur ${userId}`);
      const newArticle = await makeRequest('POST', '/articles', {
        title: "Mon premier article",
        content: "Contenu de mon premier article",
        user_id: userId
      });

      // 5. Récupérer tous les articles
      console.log("\n5. Liste de tous les articles");
      await makeRequest('GET', '/articles');

      // 6. Récupérer les articles de l'utilisateur
      console.log(`\n6. Articles de l'utilisateur ${userId}`);
      await makeRequest('GET', `/users/${userId}/articles`);

      // Si l'article a été créé avec succès et a un ID
      if (newArticle && newArticle.article && newArticle.article.id) {
        const articleId = newArticle.article.id;

        // 7. Récupérer l'article par son ID
        console.log(`\n7. Détails de l'article avec l'ID ${articleId}`);
        await makeRequest('GET', `/articles/${articleId}`);

        // 8. Mettre à jour l'article
        console.log(`\n8. Mise à jour de l'article ${articleId}`);
        await makeRequest('PUT', `/articles/${articleId}`, {
          title: "Titre mis à jour",
          content: "Contenu mis à jour"
        });

        // 9. Vérifier que l'article a été mis à jour
        console.log(`\n9. Vérification de l'article mis à jour ${articleId}`);
        await makeRequest('GET', `/articles/${articleId}`);

        // 10. Supprimer l'article
        console.log(`\n10. Suppression de l'article ${articleId}`);
        await makeRequest('DELETE', `/articles/${articleId}`);
      }

      // 11. Supprimer l'utilisateur
      console.log(`\n11. Suppression de l'utilisateur ${userId}`);
      await makeRequest('DELETE', `/users/${userId}`);
    }

    console.log("\n=== FIN DES TESTS DE L'API ===");
  } catch (error) {
    console.error("Erreur lors des tests:", error);
  } finally {
    // Arrêter le serveur après les tests
    await stopServer();
  }
}

// Exécuter les tests
runTests();