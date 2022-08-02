const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoutes = require("./countries.js");
const activityRoutes = require("./activity.js");
//Acá tengo las constantes de rutas creadas que requieren
//los archivos de ruta que cree antes
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRoutes);
router.use("/activity", activityRoutes);

module.exports = router;
