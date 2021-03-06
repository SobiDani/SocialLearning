const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: false },
  rol: { type: String, enum : ['Alumno','Maestro'], trim: true, required: false },
  description: { type: String, trim: true, required: false },
  img: { type: String, trim: true, required: false },
  token: { type: String, trim: true, required: false },
  movil: { type: String, trim: true, required: true },
  activo: { type: Boolean, default: 0, trim: true, required: true},
  id_herramientas: [
    { type: Schema.Types.ObjectId, ref: "Herramientas", required: false },
  ],
  id_categoria: { type: Schema.Types.ObjectId, ref: "Categorias", required: false },
  
},
{ timestamps: true }

);


/* UserSchema.pre("save", function (next) {
  this.token = bcrypt.hashSync(this.password, saltRounds);
  next();
}); */

const User = mongoose.model("users", UserSchema);
module.exports = User