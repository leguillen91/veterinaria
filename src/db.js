// db.js
/*
import { createPool } from "mysql2/promise";

class Database {
  constructor() {
    this.pool = null;
  }

  setCredentials(user, password) {
    this.pool = createPool({
      host: "localhost",
      user: user || "tu_usuario",
      password: password || "tu_contraseña",
      database: "Proyecto_Veterinaria_g2",
    });
  }

  async query(sql, values) {
    if (!this.pool) {
      throw new Error("Las credenciales de la base de datos no han sido establecidas.");
    }

    return await this.pool.query(sql, values);
  }
}

const db = new Database();

export { db };*/

import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  user: "administrador",
  password: "Bases700",
  database: "Proyecto_Veterinaria_g2",
});

export { pool };
