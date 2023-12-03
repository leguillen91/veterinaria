import { pool } from "../db.js";
export const crearFactura = async (req, res) => {
    const newCustomer = req.body;
  
    try {
      // Iniciar la transacción
      await pool.query("START TRANSACTION");


      //Obtener Subtotal de Venta
      const [venta] = await pool.query("SELECT SUM(CAST(subtotalProducto AS DECIMAL(10,2))) AS totalVenta FROM ventas_productos WHERE ventaID = ?", [newCustomer.ventaId]);
     
     //Obtener Subtotal de cita
      ;
      const [cita] = await pool.query("SELECT SUM(CAST(subtotalProducto AS DECIMAL(10,2))) AS totalCita FROM ventas_citas WHERE ventaID = ?", [newCustomer.ventaId]);
 
     const totalVenta = parseFloat(venta[0].totalVenta || 0);
     const totalCita = parseFloat(cita[0].totalCita || 0);
     const subtotalTotal = totalVenta + totalCita;

// Convertir el subtotal total a cadena si es necesario
const totalVentastr = totalVenta.toString();
const totalCitastr = totalCita.toString();
const subtotalTotalStr = subtotalTotal.toString();
      // Insertar en la tabla persona
      const [resultPersona] =  await pool.query("INSERT INTO factura SET clienteID = ?, ventaID = ?, historialMedicoID = ?, formaDePagoID = ?, fechaFactura = ?, totalProducto = ?, totalCita = ?, subTotal = ? ,totalPagar = ?", [newCustomer.clienteId,newCustomer.ventaId,newCustomer.historialId,newCustomer.formaPagoId,newCustomer.fecha,totalVentastr,totalCitastr,subtotalTotalStr]);
      // Confirmar la transacción
      await pool.query("COMMIT");
  
      //res.redirect("/Factura");
    } catch (error) {
      console.error("Error en la transacción:", error.message);
  
      // Deshacer la transacción en caso de error
      await pool.query("ROLLBACK");
  
      res.status(500).send("Error interno del servidor");
    }
  };



  export const mostrarFactura = async (req, res) => {
    const { identidad } = req.query;
    const [factura] = await pool.query("SELECT * FROM factura WHERE ventaID = ?", [identidad]);
    res.render('Factura', { factura: factura });
 
  };
  
