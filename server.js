const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const port = 5000;

/*{
    origin: 'http://localhost:5173',
    credentials: true
  }*/

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


    
const cors = require('cors');
app.use(cors()); // autorise toutes les origines (en dev)


//const path = require('path');
// Servir les fichiers statiques du dossier uploads
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à la base de données
connectDB();

// Middleware pour lire le body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes principales
app.use("/epreuve", require("./routes/epreuveroute"));
app.use("/api/auth", require("./routes/userroute"));


/*const swaggerDocument = require('./swagger.json'); // ou ton fichier swagger
*/


// Routes API normales
/*app.use('/auth', require('./routes/authRoutes'));
app.use('/epreuve', require('./routes/epreuveRoutes'));*/

// Swagger documentation
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Swagger Docs
//const swaggerUi = require("swagger-ui-express");
//const swaggerSpec = require("./swagger");

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Lancement du serveur
app.listen(port, () => console.log(` Serveur démarré sur le port ${port}`));
