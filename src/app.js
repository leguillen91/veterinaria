/*import express from "express";
import path from "path";
import morgan from "morgan";
import flash from 'connect-flash';

import customerRoutes from "./routes/customer.routes.js";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(customerRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("inicio"); // Renderiza la vista index.ejs en el directorio "views"
  });

// starting the server
export default app;
*/
import express from "express";
import path from "path";
import morgan from "morgan";
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import { fileURLToPath } from "url";


// ...

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));


// Configuración de Passport
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
import customerRoutes from "./routes/customer.routes.js";
app.use(customerRoutes);

// Rutas de autenticación
app.get("/login", (req, res) => {
  res.render("login"); // Renderiza el formulario de inicio de sesión
});

app.post("/login", passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

// static files
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.render("login"); // Renderiza la vista index.ejs en el directorio "views"
});

// starting the server
export default app;
