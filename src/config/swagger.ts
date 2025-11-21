import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgriConnect API",
      version: "1.0.0",
      description: "API documentation for the AgriConnect backend system",
    },

    // ✅ Add your server
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],

    // ✅ Add Bearer Token (IMPORTANT)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    // 🔒 This applies JWT auth to all endpoints automatically
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // ⭐ IMPORTANT: Swagger must scan your docs folder also
  apis: [
    "./src/routes/*.ts",
    "./src/models/*.ts",
    "./src/docs/*.ts",   // <-- add this
    "./src/controllers/*.ts", // optional but useful
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at: http://localhost:5000/api-docs");
};
