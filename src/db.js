// db.js
import { createPool } from "mysql2/promise";

class Database {
  constructor(options = {}) {
    const { user, password } = options;

    this.pool = createPool({
      host: "localhost",
      user: user || "tu_usuario",
      password: password || "tu_contraseña",
      database: "Proyecto_Veterinaria_g2",
    });
  }

  async query(sql, values) {
    return await this.pool.query(sql, values);
  }
}

const db = new Database();

export { db };
