import { pool } from "../db.js";
export const crearVenta = async (req, res) => {
    const newCustomer = req.body;
  
    try {
      // Iniciar la transacción
      await pool.query("START TRANSACTION");
  
      // Insertar en la tabla telefono
      const [resultVenta] =  await pool.query("INSERT INTO venta SET fechaVenta = ?, cantidadVendida =?, empleadoID = ?, OBS=?", [newCustomer.Telefono]);
      const ventaID = resultVenta.insertId;

      // Obtener información de la venta recién creada
      const [venta] = await pool.query("SELECT * FROM venta WHERE ventaID = ?", [ventaID]);

      res.render("venta", { venta: venta[0] });
  
      // Confirmar la transacción
      await pool.query("COMMIT");
  // Almacena el número de venta en la sesión
     req.session.numeroVenta = VentaID;
      res.redirect("/venta");
    } catch (error) {
      console.error("Error en la transacción:", error.message);
  
      // Deshacer la transacción en caso de error
      await pool.query("ROLLBACK");
  
      res.status(500).send("Error interno del servidor");
    }
  };/*
  import { pool } from "../db.js";

export const crearVenta = async (req, res) => {
    const newVenta = req.body;  // Supongamos que recibes la información de la venta en req.body
    const productos = req.body.productos;  // Supongamos que recibes la información de los productos en req.body.productos

    try {
        // Iniciar la transacción
        await pool.query("START TRANSACTION");

        // Insertar en la tabla venta y obtener el ventaID generado automáticamente
        const [resultVenta] = await pool.query("INSERT INTO venta SET ?", [newVenta]);
        const ventaID = resultVenta.insertId;

        // Insertar en la tabla ventas_productos para cada producto
        for (const producto of productos) {
            await pool.query(
                "INSERT INTO ventas_productos SET productoID = ?, ventaID = ?, cantidad=?, precioUnitario=?, subtotalProducto=?",
                [producto.productoID, ventaID, producto.cantidad, producto.precioUnitario, producto.subtotalProducto]
            );
        }

        // Confirmar la transacción
        await pool.query("COMMIT");

        res.redirect("/");
    } catch (error) {
        console.error("Error en la transacción:", error.message);

        // Deshacer la transacción en caso de error
        await pool.query("ROLLBACK");

        res.status(500).send("Error interno del servidor");
    }
};*/
  export const reporteProductosV = async (req, res) => {
    const nombreProducto = req.query.nombreProducto || '';
  
    try {
      const [productos] = await pool.query("SELECT * FROM producto WHERE nombreProducto LIKE ?", [`%${nombreProducto}%`]);
      
      res.render('venta', { productos, nombreProducto });
    } catch (error) {
      console.error('Error al buscar productos:', error.message);
      res.status(500).send('Error interno del servidor');
    }
  };


  export const crearVentaProducto = async (req, res) => {
    const newCustomer = req.body;
  
    try {
      // Iniciar la transacción
      await pool.query("START TRANSACTION");
  
      await pool.query(
        "INSERT INTO ventas_productos SET productoID = ?, ventaID = ?, cantidad=?, precioUnitario=?, subtotalProducto = CONVERT(NVARCHAR, cantidad * precioUnitario)",
        [newCustomer.ventaID,newCustomer.productoID,newCustomer.ventaID,newCustomer.cantidad,newCustomer.precioUnitario]
      );
      //restar al producto
      await pool.query(
        "INSERT INTO ventas_productos SET productoID = ?, ventaID = ?, cantidad=?, precioUnitario=?, subtotalProducto = CONVERT(NVARCHAR, cantidad * precioUnitario)",
        [newCustomer.ventaID,newCustomer.productoID,newCustomer.ventaID,newCustomer.cantidad,newCustomer.precioUnitario]
      );

      await pool.query("COMMIT");
  // Almacena el número de venta en la sesión
     req.session.numeroVenta = VentaID;
      res.redirect("/venta");
    } catch (error) {
      console.error("Error en la transacción:", error.message);
  
      // Deshacer la transacción en caso de error
      await pool.query("ROLLBACK");
  
      res.status(500).send("Error interno del servidor");
    }
  };

  //Insertar en Cliente
  

