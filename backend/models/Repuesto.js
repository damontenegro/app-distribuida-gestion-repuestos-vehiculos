import mongoose from 'mongoose';

const RepuestoSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true }
});

const Repuesto = mongoose.model('Repuesto', RepuestoSchema);
export default Repuesto;

