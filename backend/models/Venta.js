import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  precio: Number,
  cantidad: Number,
  total: Number,
  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Venta", ventaSchema);

