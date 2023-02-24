const express = require('express');
const app = express();

// Définit le chemin du dossier contenant les fichiers statiques
const staticFolderPath = __dirname + '/public';

// Utilise express.static() pour servir les fichiers statiques
app.use(express.static(staticFolderPath));

// Démarre le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
