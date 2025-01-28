import UserModel from "../models/userModel.js";

class UserController {
  // CREATE TABLE
  static async createTable(req, res) {
    try {
      await UserModel.createTable();
      res.json({ message: "Table created" });
    } catch (error) {
      console.error("Error creating table:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // CREATE USER
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, and password are required" });
      }

      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await UserModel.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // READ ALL USERS
  static async getUsers(req, res) {
    try {
      const users = await UserModel.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // READ USER BY ID, NAME, OR EMAIL
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.params;
      let user;
      if (id) {
        user = await UserModel.findUserById(id);
      } else if (name) {
        user = await UserModel.findUserByName(name);
      } else if (email) {
        user = await UserModel.findUserByEmail(email);
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // UPDATE USER
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await UserModel.updateUserById(id, name, email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE USER
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserModel.deleteUser(id);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE ALL USERS
  static async deleteAllUsers(req, res) {
    try {
      await UserModel.deleteAllUsers();
      res.status(200).json({ message: "All users deleted" });
    } catch (error) {
      console.error("Error deleting all users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // DROP TABLE
  static async deleteTable(req, res) {
    try {
      await UserModel.dropTable();
      res.status(200).json({ message: "Table deleted successfully" });
    } catch (error) {
      console.error("Error deleting table:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;