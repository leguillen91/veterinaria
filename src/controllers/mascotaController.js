import { pool } from "../db.js";




export const crearMascotas = async (req, res) => {
  const nuevaMascota = req.body;
  await pool.query("INSERT INTO mascota set nombreMascota = ? , edad = ?, especieID = ?, sexoID = ? , clienteID=? ",
   [nuevaMascota.Nombre,nuevaMascota.Edad,nuevaMascota.especie,nuevaMascota.genero,nuevaMascota.IDdelCliente]);
  res.redirect("/");
};

export const mostrarClientes = async (req, res) => {
  const { identidad } = req.query;
  const [result] = await pool.query("SELECT p.personaID, p.PrimerNombre, p.SegundoNombre, p.PrimerApellido, p.SegundoApellido, c.ClienteID FROM persona p join cliente c on p.PersonaID = c.PersonaID WHERE p.personaID = ?", [
    identidad,
  ]);
  res.render("mascotas", {persona: result[0]});
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
