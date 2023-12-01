import { pool } from "../db.js";

export const crearCitas = async (req, res) => {
  const nuevaMascota = req.body;

  try {
    // Iniciar la transacción
    await pool.query("START TRANSACTION");

    // Insertar en la tabla telefono
    const [resultMascota] =   await pool.query("INSERT INTO mascota set nombreMascota = ? , edad = ?, especieID = ?, sexoID = ? , clienteID=? ",
    [nuevaMascota.Nombre,nuevaMascota.Edad,nuevaMascota.especie,nuevaMascota.genero,nuevaMascota.IDdelCliente]);
    const mascotaID = resultMascota.insertId;


    await pool.query("INSERT INTO clientes_mascota SET mascotaID = ?, clienteID = ? ", [mascotaID, nuevaMascota.IDdelCliente]);

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


export const mostrarClientesyMascotas = async (req, res) => {
  const { identidad } = req.query;
  const [result] = await pool.query("SELECT c.clienteID, p.primerNombre, p.primerApellido, p.segundoApellido, m.mascotaID,m.nombreMascota FROM cliente c JOIN  persona p ON c.personaID = p.personaID JOIN  mascota m ON c.clienteID = m.clienteID WHERE m.clienteID =  ?", [
    identidad,
  ]);
  res.render("cita", { personas: result });
};

export const actualizarClientes = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE mascotas set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/");
};

export const borrarClientes = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM mascotas WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/");
};
