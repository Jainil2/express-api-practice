import bodyParser from "body-parser";
import express from "express";

import router from "./routes.js";

const app  = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})