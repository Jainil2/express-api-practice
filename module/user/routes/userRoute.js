import express from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleReadUsers,
  handleUpdateUser,
} from "../controllers/userController.js";

const user_router = express.Router({ mergeParams: true });

// Directly use the controller functions without wrapping them in an async function
user_router.get("/", handleReadUsers);
user_router.post("/", handleCreateUser);
user_router.delete("/", handleDeleteUser);
user_router.patch("/", handleUpdateUser);

export default user_router;
