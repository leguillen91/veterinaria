import { pool } from "../db.js";
export const crearVenta = async (req, res) => {
  const newCustomer = req.body;
  let mostrarFormulario = false;

  try {
    // Iniciar la transacción
    await pool.query("START TRANSACTION");

    // Insertar en la tabla venta
    const [resultVenta] = await pool.query("INSERT INTO venta SET fechaVenta = ?, cantidadVendida =?, empleadoID = ?, OBS=?", [newCustomer.fechaVenta, newCustomer.cantidad, newCustomer.empleadoID, newCustomer.obs]);
    const ventaID = resultVenta.insertId;

    // Obtener información de la venta recién creada
    const [venta] = await pool.query("SELECT * FROM venta WHERE ventaID = ?", [ventaID]);

    // Establecer mostrarFormulario en true para mostrar el formulario en la vista
    mostrarFormulario = true;

    // Confirmar la transacción
    await pool.query("COMMIT");

    // Almacena el número de venta en la sesión
    req.session.numeroVenta = ventaID;

    // Renderizar la vista y luego redirigir
    res.render("venta", { venta: venta, mostrarFormulario: mostrarFormulario }, (err, html) => {
      if (err) {
        console.error("Error en la renderización:", err.message);
        res.status(500).send("Error interno del servidor");
      } else {
        res.send(html);
        //res.redirect("/venta");
      }
    });
  } catch (error) {
    console.error("Error en la transacción:", error.message);

    // Deshacer la transacción en caso de error
    await pool.query("ROLLBACK");

    res.status(500).send("Error interno del servidor");
  }
};

  export const crearVentaProducto = async (req, res) => {
    const newCustomer = req.body;
  
    try {
      // Iniciar la transacción
      await pool.query("START TRANSACTION");
  
     /* await pool.query(
        "INSERT INTO ventas_productos SET productoID = ?, ventaID = ?, cantidad=?, precioUnitario=?, subtotalProducto = CONVERT(NVARCHAR, cantidad * precioUnitario)",
        [newCustomer.ventaID,newCustomer.productoID,newCustomer.cantidadP,newCustomer.precioUnitario]
      );*/

     // const subtotal = (newCustomer.cantidadP * newCustomer.precioUnitario);
     const subtotal = '' + (newCustomer.cantidadP * newCustomer.precioUnitario);

      const cantidadS = (newCustomer.cantidadP).toString();
      await pool.query(
        "INSERT INTO ventas_productos SET productoID = ?, ventaID = ?, cantidad=?, precioUnitario=?,OBS =?,subtotalProducto = ?",
        [newCustomer.productoID, newCustomer.ventaID, cantidadS,newCustomer.obs,newCustomer.precioUnitario,subtotal]
      );

      //restar al producto
      await pool.query(
        "UPDATE producto SET cantidad = CAST(cantidad AS SIGNED) - CAST(? AS SIGNED) WHERE productoID = ?",
        [newCustomer.cantidadP, newCustomer.productoID]
      );

      await pool.query("COMMIT");
  // Almacena el número de venta en la sesión
     
      res.redirect("/venta");
    } catch (error) {
      console.error("Error en la transacción:", error.message);
  
      // Deshacer la transacción en caso de error
      await pool.query("ROLLBACK");
  
      res.status(500).send("Error interno del servidor");
    }
  };

  //Insertar en Cliente
  

  export const crearVentaCita = async (req, res) => {
    const newCustomer = req.body;
  
    try {
      // Iniciar la transacción
      await pool.query("START TRANSACTION");
  
     /* await pool.query(
        "INSERT INTO ventas_productos SET productoID = ?, ventaID = ?, cantidad=?, precioUnitario=?, subtotalProducto = CONVERT(NVARCHAR, cantidad * precioUnitario)",
        [newCustomer.ventaID,newCustomer.productoID,newCustomer.cantidadP,newCustomer.precioUnitario]
      );*/

     // const subtotal = (newCustomer.cantidadP * newCustomer.precioUnitario);
     const subtotal = '' + (newCustomer.cantidadP * newCustomer.precioUnitario);

      const precioCita = (newCustomer.precioServicio).toString();
      await pool.query(
        "INSERT INTO ventas_citas SET ventaID = ?, citaID = ?,  precioServicio=?,OBS =?,subtotalCita = ?",
        [newCustomer.ventaID, newCustomer.citaID,precioCita,newCustomer.obsCita,precioCita]      );


      await pool.query("COMMIT");
  // Almacena el número de venta en la sesión
     
      res.redirect("/venta");
    } catch (error) {
      console.error("Error en la transacción:", error.message);
  
      // Deshacer la transacción en caso de error
      await pool.query("ROLLBACK");
  
      res.status(500).send("Error interno del servidor");
    }
  };
