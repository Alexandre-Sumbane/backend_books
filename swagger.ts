import swaggerJsdoc from "swagger-jsdoc";

import { env } from "@/env";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API UNITEC-BOOKS",
      version: "1.0.0",
      description: "Documentação da API UNITEC-BOOKS",
    },
    servers: [
      {
        url: env.APP_URL || "http://localhost:3333",
      },
    ],
  },
  
  apis: ["./docs/*.docs.yaml"], 
};

export const swaggerSpec = swaggerJsdoc(options);