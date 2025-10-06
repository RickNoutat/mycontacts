import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "MyContacts API",
    version: "1.0.0",
    description: "Documentation de l'API MyContacts",
  },
  servers: [
    {
      url: "http://localhost:" + (process.env.PORT || 5001) + "/api",
      description: "Local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      AuthRegisterInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
      },
      AuthLoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  email: { type: "string" },
                  createdAt: { type: "string" },
                },
              },
            },
          },
        },
      },
      Contact: {
        type: "object",
        properties: {
          _id: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          phone: { type: "string" },
          owner: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
        },
      },
      ContactCreateInput: {
        type: "object",
        required: ["firstName", "lastName", "phone"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          phone: { type: "string", minLength: 10, maxLength: 20 },
        },
      },
      ContactUpdateInput: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          phone: { type: "string", minLength: 10, maxLength: 20 },
        },
        additionalProperties: false,
      },
      ApiError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
          code: { type: "number" },
          details: { type: "object" },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // JSDoc dans les routes
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
