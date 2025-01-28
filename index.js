import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";

dotenv.config({ path: ".env.local" });

if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variables.");
}

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/users", userRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
