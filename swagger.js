const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "IdeaPal",
    description: "This is an Article Application",
  },
  host: "ideapal.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/Routes/app.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
