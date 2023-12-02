import { db } from "../db.js";

export const crearMascotas = async (req, res) => {
  const nuevaMascota = req.body;

  try {
    // Iniciar la transacción
    await db.query("START TRANSACTION");

    // Insertar en la tabla telefono
    const [resultMascota] =   await db.query("INSERT INTO mascota set nombreMascota = ? , edad = ?, especieID = ?, sexoID = ? , clienteID=? ",
    [nuevaMascota.Nombre,nuevaMascota.Edad,nuevaMascota.especie,nuevaMascota.genero,nuevaMascota.IDdelCliente]);
    const mascotaID = resultMascota.insertId;


    await db.query("INSERT INTO clientes_mascotas SET mascotaID = ?, clienteID = ? ", [mascotaID, nuevaMascota.IDdelCliente]);

    // Confirmar la transacción
    await db.query("COMMIT");

    res.redirect("/");
  } catch (error) {
    console.error("Error en la transacción:", error.message);

    // Deshacer la transacción en caso de error
    await db.query("ROLLBACK");

    res.status(500).send("Error interno del servidor");
  }
};


export const mostrarClientes = async (req, res) => {
  const { identidad } = req.query;
  const [result] = await db.query("SELECT p.personaID, p.PrimerNombre, p.SegundoNombre, p.PrimerApellido, p.SegundoApellido, c.ClienteID FROM persona p join cliente c on p.PersonaID = c.PersonaID WHERE p.personaID = ?", [
    identidad,
  ]);
  res.render("mascotas", {persona: result[0]});
};

export const actualizarClientes = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await db.query("UPDATE mascotas set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/");
};

export const borrarClientes = async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM mascotas WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/");
};
