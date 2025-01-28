import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router({ mergeParams: true });

// Table operations
router.get("/create-table", UserController.createTable);
router.delete("/delete-table", UserController.deleteTable);

// User operations
router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.delete("/", UserController.deleteAllUsers);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.get("/search/name/:name", UserController.getUser);
router.get("/search/email/:email", UserController.getUser);

export default router;
