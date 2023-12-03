import { pool } from "../db.js";

export const crearProducto = async (req, res) => {
    const nuevoProducto = req.body;
  
   try {
      // Iniciar la transacción
      await pool.query("START TRANSACTION");
  
      // Insertar en la tabla producto
  
      await pool.query("INSERT INTO Producto SET nombreProducto = ?, precioCompra =?, precioProducto =?, cantidad = ? "
      , [nuevoProducto.nombre,nuevoProducto.compra,nuevoProducto.venta,nuevoProducto.cantidad]);
  
      // Confirmar la transacción
      await pool.query("COMMIT");
  
      res.redirect("/ReporteProductos");
    } catch (error) {
      console.error("Error en la transacción:", error.message);
  
      // Deshacer la transacción en caso de error
      await pool.query("ROLLBACK");
  
      res.status(500).send("Error interno del servidor");
    }
  };
  
  
  export const mostrarClientes = async (req, res) => {
    const { identidad } = req.query;
    const [result] = await pool.query("SELECT p.personaID, p.PrimerNombre, p.SegundoNombre, p.PrimerApellido, p.SegundoApellido, c.ClienteID FROM persona p join cliente c on p.PersonaID = c.PersonaID WHERE p.personaID = ?", [
      identidad,
    ]);
    res.render("mascotas", {persona: result[0]});
  };
  
  export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombreProducto, precioCompra, precioProducto, cantidad } = req.body;
  
    try {
      await pool.query("UPDATE producto SET nombreProducto = ?, precioCompra = ?, precioProducto = ?, cantidad = ? WHERE productoID = ?", [nombreProducto, precioCompra, precioProducto, cantidad, id]);
      res.redirect("/ReporteProductos");
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  // Eliminar Producto
  export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query("DELETE FROM producto WHERE productoID = ?", [id]);
      res.redirect("/ReporteProductos");
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      res.status(500).send('Error interno del servidor');
    }
  };
  export const reporteProductos = async (req, res) => {
    const nombreProducto = req.query.nombreProducto || '';
  
    try {
      const [productos] = await pool.query("SELECT * FROM producto WHERE nombreProducto LIKE ?", [`%${nombreProducto}%`]);
      
      res.render('ReporteProductos', { productos, nombreProducto });
    } catch (error) {
      console.error('Error al buscar productos:', error.message);
      res.status(500).send('Error interno del servidor');
    }
  };