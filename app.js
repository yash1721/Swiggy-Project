import express from "express";
import bodyParser from "body-parser";
import gameRoutes from "./routes/gameRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handling for game-related APIs
app.use("/api", gameRoutes);

// Middleware to handle not found errors
app.use(notFoundHandler);
// Middleware to handle all other errors
app.use(errorHandler);

// Start the server
import { config } from "./config/config.js";
const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
