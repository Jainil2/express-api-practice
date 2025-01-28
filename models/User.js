import pool from "../database/connect.js";
import bcrypt from "bcrypt";
class UserModel {
  constructor() {
    UserModel.createTable();
  }

  //CREATE

  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(query);
  }

  static async createUser(name, email, password) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const encodedPassword = await bcrypt.hash(password, 10);
    const values = [name, email, encodedPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  //READ

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

  //UPDATE

  static async updateUserById(id, name, email, password) {
    const query = `
      UPDATE users
      SET name = $1, email = $2, password = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [name, email, password, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  //DELETE

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
    await pool.query(query);
  }

  static async destroy() {
    await UserModel.dropTable();
  }
}

export default UserModel;
