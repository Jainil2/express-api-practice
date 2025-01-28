import pool from "../database/connect.js";
import bcrypt from "bcrypt";

class UserModel {
  static async createTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `;
    try {
      console.log('Checking or creating "users" table...');
      await pool.query(query);
      console.log('"users" table is ready.');
    } catch (error) {
      console.error("Error creating table:", error);
      throw error;
    }
  }

  // CREATE
  static async createUser(name, email, password) {
    try {
      UserModel.validateUserInput(name, email, password);

      const query = `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
      const encodedPassword = await bcrypt.hash(password, 10);
      const values = [name, email, encodedPassword];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // READ
  static async getUsers() {
    const query = `SELECT * FROM users;`;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findUserById(id) {
    const query = `SELECT * FROM users WHERE id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async findUserByName(name) {
    const query = `SELECT * FROM users WHERE name = $1;`;
    const { rows } = await pool.query(query, [name]);
    return rows[0];
  }

  // UPDATE
  static async updateUserById(id, name, email, password) {
    const user = await UserModel.findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedName = name || user.name;
    const updatedEmail = email || user.email;
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    const query = `
            UPDATE users
            SET name = $1, email = $2, password = $3
            WHERE id = $4
            RETURNING *;
        `;
    const values = [updatedName, updatedEmail, updatedPassword, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // DELETE
  static async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = $1;`;
    await pool.query(query, [id]);
  }

  static async deleteAllUsers() {
    const query = `DELETE FROM users;`;
    await pool.query(query);
  }

  static async dropTable() {
    const query = `DROP TABLE IF EXISTS users;`;
    try {
      console.log('Attempting to drop table "users"...');
      await pool.query(query);
      console.log('Table "users" dropped successfully.');
    } catch (error) {
      console.error("Error dropping table:", error);
      throw error;
    }
  }

  // VALIDATION
  static validateUserInput(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }
}

export default UserModel;
