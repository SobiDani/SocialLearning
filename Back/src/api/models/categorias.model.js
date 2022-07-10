const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriaschema = new Schema(
  {
    name: { type: String, required: true },
    rol: { type: String, required: true },
    description: { type: String, required: false },
    imagen: { type: String, required: true },
  },
  { timestamps: true }
);

const Categorias = mongoose.model("Categorias", categoriaschema);

module.exports = Categorias;