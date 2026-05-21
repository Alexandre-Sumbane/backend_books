import swaggerJsdoc from "swagger-jsdoc";


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
        // url: "https://backend.unitec.co.mz",
        url: "http://localhost:5203",
      },
    ],
  },
  
  apis: ["./docs/*.docs.yaml"], 
};

export const swaggerSpec = swaggerJsdoc(options);