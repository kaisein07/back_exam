const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Exame Share",
      version: "1.0.0",
      description: "Documentation de l'API pour le partage d'épreuves.",
    },
    servers: [
      {
        url: "https://shareexam.onrender.com", // Change l'URL si nécessaire (localhost:5000 en local par exemple)
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // indique où Swagger doit lire les annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
