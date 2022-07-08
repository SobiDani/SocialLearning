const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllCategorias, getCategoriaByID, createCategorias,patchCategoria,deleteCategorias
} = require("../controllers/categorias.controller");

router.get("/", getAllCategorias);
router.get("/id/:id", getCategoriaByID);
router.post("/"/* ,[isAuth] */, upload.single("imagen"), createCategorias);
router.delete('/:id',[isAuth], upload.single("imagen"), deleteCategorias);
router.patch('/:id'/* ,[isAuth] */, upload.single("imagen"), patchCategoria)

module.exports = router;
