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

    import {
      crearProducto,
      actualizarProducto,
      eliminarProducto,
      reporteProductos
      } from "../controllers/ProductoController.js";

    import { crearUsuario  } from "../controllers/usuarioController.js"; // Ajusta el nombre del controlador según tu estructura


    import { passport } from "../controllers/loginController.js";

const router = Router();

router.get("/m", mostrarPersonas);
router.post("/add", crearPersonas);
router.post("/add_mascotas", crearMascotas);
router.post("/add_citas", crearCitas);
router.post("/add_empleado", crearEmpleado);
router.post("/add_producto", crearProducto);
router.get("/mascotas/", mostrarClientes);
router.get("/empleados/", mostrarEmpleados);
router.post("/update/:id", actualizarPersonas);
router.get("/delete/:id", borrarPersonas);
router.get("/cita/", mostrarClientesyMascotas);
router.get("/citasPorMes", mostrarCitasPorMes);
router.get("/ReporteProductos", reporteProductos);
router.get("/ReporteriaCita", generarReporteCitas);
router.post("/actualizarCita/:id", actualizarCitas);
router.post("/actualizarProducto/:id", actualizarProducto);
router.post("/cancelarCita/:id", cancelarCitas);
router.post("/borrarProducto/:id", eliminarProducto);
// Ruta para mostrar el formulario de creación de usuario
router.get("/formulario", (req, res) => {
  res.render("formulario"); // Ajusta el nombre de la vista según tu estructura
});

// Ruta para procesar la creación de usuario desde el formulario
router.post("/formulario", crearUsuario);

router.get('/login', (req, res) => {
  res.render('login'); // Puedes renderizar un formulario de inicio de sesión aquí
});

// Ruta para procesar la autenticación
router.post('/login', passport.authenticate('local', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
  failureFlash: true,
}));

export default router;



