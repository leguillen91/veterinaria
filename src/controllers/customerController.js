import { pool } from "../db.js";


export const mostrarPersonas = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM persona");
  res.render("customers", { personas: rows });
};

export const crearPersonas = async (req, res) => {
  const newCustomer = req.body;

  try {
    // Iniciar la transacción
    await pool.query("START TRANSACTION");

    // Insertar en la tabla telefono
    const [resultTelefono] =  await pool.query("INSERT INTO telefono SET numeroTelefono = ?", [newCustomer.Telefono]);
    const TelefonoID = resultTelefono.insertId;
    // Insertar en la tabla direccion
    const [resultDireccion] =  await pool.query("INSERT INTO direccion SET  ciudad = ?, colonia = ?, calle = ?", [newCustomer.Ciudad, newCustomer.Colonia, newCustomer.Calle]);
    const DireccionID = resultDireccion.insertId;

    // Insertar en la tabla persona
    const [resultPersona] =  await pool.query("INSERT INTO persona SET personaID = ?, primerNombre = ?, segundoNombre = ?, primerApellido = ?, segundoApellido = ?, edad = ?, fechaNacimiento = ?, generoID = ? ,telefonoID = ?, direccionID = ?", [newCustomer.Identidad,newCustomer.PNombre,newCustomer.SNombre,newCustomer.PApellido,newCustomer.SApellido,newCustomer.Edad,newCustomer.Nacimiento,newCustomer.genero,TelefonoID,DireccionID]);
    const [personaIdResult] = await pool.query("SELECT personaID FROM persona WHERE personaID = ?", [newCustomer.Identidad]);
    const personaID = personaIdResult[0].personaID;
    //Insertar en Cliente

    await pool.query("INSERT INTO cliente SET personaID = ?", [personaID]);

    // Confirmar la transacción
    await pool.query("COMMIT");

    res.redirect("/");
  } catch (error) {
    console.error("Error en la transacción:", error.message);

    // Deshacer la transacción en caso de error
    await pool.query("ROLLBACK");

    res.status(500).send("Error interno del servidor");
  }
};

export const mostrarClientesPersonas = async (req, res) => {
  const { identidad } = req.query;
  const [result] = await pool.query("SELECT p.personaID, p.PrimerNombre, p.SegundoNombre, p.PrimerApellido, p.SegundoApellido, c.ClienteID FROM persona p join cliente c on p.PersonaID = c.PersonaID WHERE p.personaID = ?", [
    identidad,
  ]);
  res.render("mascotas", { personas: result });
};

export const actualizarPersonas = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE persona set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/");
};

export const borrarPersonas = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM persona WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "personas eliminada" });
  }
  res.redirect("/");
};
