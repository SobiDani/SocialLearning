const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary=require("cloudinary").v2;
const logger = require("morgan");

//NUEVO
/* const bodyParser = require('body-parser'); */


const HerramientaRouter = require("./src/api/routes/herramientas.routes");

const CategoriaRouter = require("./src/api/routes/categorias.routes");

const userRouter = require("./src/api/routes/users.routes");

dotenv.config();

const {connect}= require("./src/utils/database")

connect();

const PORT = process.env.PORT || 8700;

const JWT_SECRET = process.env.JWT_SECRET

const server = express();

//NUEVO

/* server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); */

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use(logger("dev"))


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

server.use(cors({
    origin: "*",
    credentials: true
}))

server.set("secretKey", JWT_SECRET)

server.use("/categorias", CategoriaRouter)
server.use("/herramientas", HerramientaRouter)
server.use("/users", userRouter);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})