
import { pool } from "../db.js";

export const crearCitas = async (req, res) => {
  const nuevaCita = req.body;

  try {
    // Iniciar la transacción
    await pool.query("START TRANSACTION");

    await pool.query("INSERT INTO cita SET fecha = ?, hora = ?, tipoServicioID = ?, mascotaID=?", [nuevaCita.fecha,nuevaCita.hora,nuevaCita.servicio,nuevaCita.mascotaid]);

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

export const actualizarCitas = async (req, res) => {
  const { id } = req.params;
  const { nuevaFecha, nuevaHora } = req.body;

  try {
    // Actualizar la fecha y hora de la cita en la base de datos
    await pool.query("UPDATE cita SET fecha = ?, hora = ? WHERE citaID = ?", [nuevaFecha, nuevaHora, id]);

    res.redirect("/ReporteriaCita"); // Redirigir a la página de citas por mes
  } catch (error) {
    console.error('Error al actualizar la cita:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

export const cancelarCitas = async (req, res) => {
  const { id } = req.params;
  console.log('ID de la cita a cancelar:', id);
  try {
    // Eliminar la cita de la base de datos
    await pool.query("DELETE FROM cita WHERE citaID = ?", [id]);

    res.redirect("/ReporteriaCita"); // Redirigir a la página de citas por mes
  } catch (error) {
    console.error('Error al cancelar la cita:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};


export const mostrarCitasPorMes = async (req, res) => {
  // Obtener el mes desde la consulta
  const { mes } = req.query;

  try {
    let citas = [];

    if (mes) {
      // Consultar las citas en el mes especificado
      [citas] = await pool.query(
        'SELECT * FROM cita WHERE MONTH(fecha) = ?',
        [mes]
      );
    }

    // Renderizar la vista con las citas obtenidas
    res.render('citasPorMes', { citas, mes });
  } catch (error) {
    console.error('Error al obtener las citas:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};
export const generarReporteCitas = async (req, res) => {
  const { mes } = req.query;

  try {
    // Consultar las citas para el mes específico desde la base de datos
    const [citas] = await pool.query('SELECT * FROM cita WHERE MONTH(fecha) = ?', [mes]);

    // Renderizar la vista del reporte con los resultados
    res.render('reporteriaCita', { citas, mes });
  } catch (error) {
    console.error('Error al generar el reporte de citas:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

export const crearHistorial = async (req, res) => {
  const nuevoHistorial = req.body;

  try {
    // Iniciar la transacción
    await pool.query("START TRANSACTION");

    await pool.query("INSERT INTO historialMedico SET historialMedicoID = ? ,fechaRegistro = ?, diagnostico = ?, tratamiento = ?, mascotaID=?",
     [nuevoHistorial.historialid,nuevoHistorial.fecha,nuevoHistorial.diagnostico,nuevoHistorial.tratamiento,nuevoHistorial.mascotaid]);

    // Confirmar la transacción
    await pool.query("COMMIT");

    res.redirect("/historial");
  } catch (error) {
    console.error("Error en la transacción:", error.message);

    // Deshacer la transacción en caso de error
    await pool.query("ROLLBACK");

    res.status(500).send("Error interno del servidor");
  }
};

export const mostrarClientesyMascotashistorial = async (req, res) => {
  const { identidad } = req.query;
  const [result] = await pool.query("SELECT c.clienteID, p.primerNombre, p.primerApellido, p.segundoApellido, m.mascotaID,m.nombreMascota FROM cliente c JOIN  persona p ON c.personaID = p.personaID JOIN  mascota m ON c.clienteID = m.clienteID WHERE m.clienteID =  ?", [
    identidad,
  ]);
  res.render("historial", { personas: result });
};

export const mostrarHistorial = async (req, res) => {
  const { identidad } = req.query;
  const [result] = await pool.query("SELECT * FROM historialMedico WHERE mascotaID =  ?", [
    identidad,
  ]);
  res.render("reporteHistorial", { personas: result });
};
