import UserModel from "../models/User";

class UserController {

    static async createTable(req, res) {
      await UserModel.createTable();
      res.json({ message: 'Table created' });
    }

    static async createUser(req, res) {
      const { name, email, password } = req.body;
      const user = await UserModel.createUser(name, email, password);
      res.json(user);
    }

    static async getUsers(req, res) {
      const users = await UserModel.getUsers();
      res.json(users);
    }

    static async getUser(req, res) {
      const { id, name, email } = req.params;
      let user;
      if (id) {
        user = await UserModel.findUserById(id);
      } else if (name) {
        user = await UserModel.findUserByName(name);
      } else if (email) {
        user = await UserModel.findUserByEmail(email);
      }
      res.json(user);
    }

    static async updateUser(req, res) {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await UserModel.updateUserById(id, name, email, password);
      res.json(user);
    }

    static async deleteUser(req, res) {
      const { id } = req.params;
      await UserModel.deleteUser(id);
      res.json({ message: 'User deleted' });
    }

    static async deleteAll(req, res) {
      await UserModel.deleteAll();
      res.json({ message: 'All users deleted' });
    }

    static async deleteTable(req, res) {
      await UserModel.deleteTable();
      res.json({ message: 'Table deleted' });
    }
}

export default UserController;
