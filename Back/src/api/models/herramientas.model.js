const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HerramientaSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: false },
    hability: { type: Boolean, required: false },
    ico: { type: String, required: true}
  },
  { timestamps: true }
);

const Herramienta = mongoose.model("Herramientas", HerramientaSchema);

module.exports = Herramienta;