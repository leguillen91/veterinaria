import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "administrador",
  password: "Bases700",
  //port: 3036,
  database: "Proyecto_Veterinaria_g2",
});
