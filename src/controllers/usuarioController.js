/*import { pool } from "../db.js";

const rolesMapping = {
  "DBA": "DBA",
  "DBManager": "DBManager",
  "BackupAdmin": "BackupAdmin"
};

const crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Iniciar la transacción
    await pool.query("START TRANSACTION");

    // Crear el usuario con el rol específico
    const createUserQuery = `CREATE USER '${email}'@'localhost' IDENTIFIED BY '${password}'`;
    await pool.query(createUserQuery);

    // Asignar el rol al usuario
    const grantQuery = `GRANT ${rol} TO '${email}'@'localhost'`;
    await pool.query(grantQuery);

    // Confirmar la transacción
    await pool.query("COMMIT");

    res.status(201).json({ mensaje: 'Usuario creado exitosamente.' });
  } catch (error) {
    console.error("Error en la transacción:", error.message);

    // Deshacer la transacción en caso de error
    await pool.query("ROLLBACK");

    res.status(500).json({ mensaje: 'Error al crear el usuario.' });
  }
};

export { crearUsuario };

*/
// usuarioController.js

// usuarioController.js

import { db } from "../db.js";

const crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Iniciar la transacción
    await db.query("START TRANSACTION");

    // Crear el usuario
    const createUserQuery = `CREATE USER '${email}'@'localhost' IDENTIFIED BY '${password}'`;
    await db.query(createUserQuery);

    // Asignar privilegios según el tipo de rol
    let grantQuery = '';

    switch (rol) {
      case 'secretaria':
        grantQuery = `GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON tu_base_de_datos.* TO '${email}'@'localhost'`;
        break;
      case 'administrador':
        grantQuery = `GRANT ALL PRIVILEGES ON tu_base_de_datos.* TO '${email}'@'localhost'`;
        break;
      case 'veterinario':
        grantQuery = `GRANT SELECT, INSERT ON tu_base_de_datos.* TO '${email}'@'localhost'`;
        break;
      default:
        throw new Error('Rol no reconocido');
    }

    await db.query(grantQuery);

    // Confirmar la transacción
    await db.query("COMMIT");

    res.status(201).send({ mensaje: 'Usuario creado exitosamente.' });
  } catch (error) {
    console.error("Error en la transacción:", error.message);

    // Deshacer la transacción en caso de error
    await db.query("ROLLBACK");

    res.status(500).send({ mensaje: 'Error al crear el usuario.' });
  }
};

export { crearUsuario };

