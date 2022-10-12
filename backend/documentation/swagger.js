const { Express } = require("express");
const swaggerUI = require("swagger-ui-express"),
	swaggerDocument = require("./swagger.json");

/**
 * Function to generate API documentation with Swagger
 *
 * @param {Express} app
 * @returns void
 */
function swaggerDocs(app) {
	// Swagger page
	app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

module.exports = swaggerDocs;
