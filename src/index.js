const serverless = require("serverless-http");
const app = require("./todo");
require("dotenv").config();

module.exports.handler = serverless(app);
