// usuarioController.js

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { db } from "../db.js";

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Llama a una función personalizada para obtener las credenciales del usuario
      const [user] = await obtenerCredenciales(username, password);

      if (!user) {
        return done(null, false, { message: 'Credenciales incorrectas.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Función personalizada para obtener las credenciales del usuario
async function obtenerCredenciales(username, password) {
  // Implementa lógica para obtener las credenciales del usuario desde tu base de datos
  // Puedes usar la instancia de la clase Database (db) para realizar consultas
  const [user] = await db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [username, password]);

  return user[0];
}

export { passport, obtenerCredenciales };
