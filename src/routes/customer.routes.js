import { Router } from "express";
import {
  mostrarPersonas,
  crearPersonas,
  mostrarClientesPersonas,
  actualizarPersonas,
  borrarPersonas,

} from "../controllers/customerController.js";

import {
mostrarClientes,
crearMascotas

} from "../controllers/mascotaController.js";

import {
  crearEmpleado,
  mostrarEmpleados
  } from "../controllers/empleadosControllers.js";


  import {
    mostrarClientesyMascotas,
    mostrarCitasPorMes,
    crearCitas,
    actualizarCitas,
    cancelarCitas,
    generarReporteCitas
    } from "../controllers/citasControllers.js";
const router = Router();

router.get("/m", mostrarPersonas);
router.post("/add", crearPersonas);
router.post("/add_mascotas", crearMascotas);
router.post("/add_citas", crearCitas);
router.post("/add_empleado", crearEmpleado);
router.get("/mascotas/", mostrarClientes);
router.get("/empleados/", mostrarEmpleados);
router.post("/update/:id", actualizarPersonas);
router.get("/delete/:id", borrarPersonas);
router.get("/cita/", mostrarClientesyMascotas);
router.get("/citasPorMes", mostrarCitasPorMes);
router.get("/ReporteriaCita", generarReporteCitas);
router.post("/actualizarCita/:id", actualizarCitas);
router.post("/cancelarCita/:id", cancelarCitas);



export default router;
