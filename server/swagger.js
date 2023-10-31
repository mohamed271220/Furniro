const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API documentation",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};


/*

https://storage.googleapis.com/furniro/759d12ad4c595bdcdb1c54a620321714.png
https://storage.googleapis.com/furniro/759d12ad4c595bdcdb1c54a620321714.png
https://storage.googleapis.com/furniro/FB_IMG_1672320015572.jpg
https://storage.googleapis.com/furniro/FB_IMG_1672320015572.jpg
https://storage.googleapis.com/furniro/MockImg2.png
*/