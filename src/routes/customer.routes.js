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
    generarReporteCitas,
    crearHistorial,
    mostrarClientesyMascotashistorial,
    mostrarHistorial
    } from "../controllers/citasControllers.js";

    import {
      crearProducto,
      actualizarProducto,
      eliminarProducto,
      reporteProductos
      } from "../controllers/ProductoController.js";

    import { crearUsuario  } from "../controllers/usuarioController.js"; // Ajusta el nombre del controlador según tu estructura


    import { 
     
      logearse
    
    } from "../controllers/loginController.js";

    import { 
     
      crearVenta,
      crearVentaProducto,
      crearVentaCita
    
    } from "../controllers/ventaController.js";

    import { 
     
      crearFactura,
      mostrarFactura
    
    } from "../controllers/FacturaControllers.js";





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
router.post("/add_ventaproducto", crearVentaProducto);
router.post("/add_ventacita", crearVentaCita);
// Ruta para mostrar el formulario de creación de usuario
router.get("/formulario", (req, res) => {
  res.render("formulario"); // Ajusta el nombre de la vista según tu estructura
});

// Ruta para procesar la creación de usuario desde el formulario
router.post("/formulario", crearUsuario);
mostrarClientesyMascotashistorial

router.get('/login', (req, res) => {
  res.render('login'); // Renderiza el formulario de inicio de sesión
});

router.post("/login", logearse);


router.get('/Inicio', (req, res) => {
  res.render('Inicio'); // Renderiza el formulario de inicio de sesión
});

router.get('/venta', (req, res) => {
  const mostrarFormulario = req.query.mostrarFormulario === 'true';
  res.render('venta', { mostrarFormulario });
});

router.post("/venta_add", crearVenta);

router.get("/historial", mostrarClientesyMascotashistorial);
router.get("/reporteHistorial", mostrarHistorial);
router.post("/historial_add", crearHistorial);

router.get('/Factura', mostrarFactura);
router.post("/ingresarInformacion", crearFactura);
crearFactura

export default router;



