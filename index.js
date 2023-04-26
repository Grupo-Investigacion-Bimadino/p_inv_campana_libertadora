const express = require("express");
const app = express();

// Servir archivos estáticos (html, css, js)
app.use(express.static("public"));

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
