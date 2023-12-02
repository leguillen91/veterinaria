// login.route.js

import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login-form'); // Puedes renderizar un formulario de inicio de sesión aquí
});

// Ruta para procesar la autenticación
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

export default router;
