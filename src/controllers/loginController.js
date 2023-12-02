// controllers/loginController.js
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { db } from "../db.js";

passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      // Verificar las credenciales del usuario en tu base de datos
      const [user] = await db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);

      if (!user.length) {
        return done(null, false, { message: 'Credenciales incorrectas.' });
      }

      return done(null, user[0]);
    } catch (error) {
      return done(error);
    }
  }
));

export { passport };
