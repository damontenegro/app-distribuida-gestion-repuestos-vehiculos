import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Venta from "./models/Venta.js";
import Repuesto from "./models/Repuesto.js";

const app = express();
const port = 5000;
const secret = "repuestos6272";

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://172.31.85.194:27017/miapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Ruta para generar un token JWT
app.post("/login", (req, res) => {
  const token = jwt.sign({ user: "empleado" }, secret, { expiresIn: "1h" });
  res.json({ token });
});

// Ruta protegida: obtener repuestos desde la base de datos
app.get("/repuestos", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, secret);
    const repuestos = await Repuesto.find();
    res.json(repuestos);
  } catch (err) {
    res.sendStatus(403);
  }
});

// Ruta protegida: eliminar repuesto por código
app.delete("/repuestos/:codigo", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, secret);
    const codigo = req.params.codigo;

    const resultado = await Repuesto.deleteOne({ codigo });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: "Repuesto no encontrado" });
    }

    res.json({ mensaje: "Repuesto eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});


// Ruta protegida: guardar un nuevo repuesto
app.post('/repuestos', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, secret);

    const { codigo, descripcion, precio } = req.body;

    if (!codigo || !descripcion || precio == null) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    const nuevoRepuesto = new mongoose.model('Repuesto')({ codigo, descripcion, precio });
    await nuevoRepuesto.save();

    res.json({ mensaje: 'Repuesto agregado correctamente' });
  } catch (err) {
    res.sendStatus(403);
  }
});


// Ruta protegida: guardar una venta
app.post("/ventas", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, secret);
    const venta = new Venta(req.body);
    await venta.save();
    res.json({ mensaje: "Venta registrada correctamente" });
  } catch (err) {
    res.sendStatus(403);
  }
});

// Ruta protegida: obtener todas las ventas
app.get("/ventas", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, secret);
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (err) {
    res.sendStatus(403);
  }
});

// Ruta protegida: eliminar una venta
app.delete("/ventas/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, secret);
    await Venta.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Venta eliminada correctamente" });
  } catch (err) {
    res.sendStatus(403);
  }
});

// Ruta pública para probar que el backend responde (útil para el Load Balancer)
app.get("/", (req, res) => {
  res.send("✅ Backend instancia 1 funcionando correctamente detrás del Load Balancer");
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en puerto ${port}`);
});

