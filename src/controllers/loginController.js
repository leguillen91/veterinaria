// usuarioController.js

import passport from 'passport';
//import LocalStrategy from 'passport-local';
import { pool } from "../db.js";
/*
passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      // Verificar las credenciales del usuario en tu base de datos
      const [user] = await pool.query('SELECT * FROM mysql.user WHERE User = ? AND authentication_string = PASSWORD(?)', [email, password]);

      if (user.length) {
       // return done(null, false, { message: 'Credenciales incorrectas.' });
       res.render("/");
      }

      return done(null, user[0]);
      
    } catch (error) {
      return done(error);
    }
  }
));

export { passport };*/
export const logearse = async (req, res) => {
  const { email,password } = req.params;
  const [result] = await pool.query('SELECT * FROM mysql.user WHERE User = ? AND authentication_string = PASSWORD(?)', [email, password]);
  //const result = await pool.query("DELETE FROM persona WHERE id = ?", [id]);
  if (result.affectedRows !=0) {
    res.redirect("/Inicio");
  }else{
    res.redirect("/login");
  }
  
};
