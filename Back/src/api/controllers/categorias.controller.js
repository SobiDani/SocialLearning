const { deleteFile } = require("../../middlewares/deleteFile");
const Categoria = require("../models/categorias.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllCategorias = async (req, res, next) => {
  try {
    const allCategorias = await Categoria.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Categorias: allCategorias,
    });
  } catch (error) {
    return next(error);
  }
};


const getCategoriaByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const herramientaByID = await Categoria.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Categoria: herramientaByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createCategorias = async (req, res, next) => {
  try {
    const newCategorias = new Categoria(req.body);
    if (req.file) {
      newCategorias.ico = req.file.path;
    }
    const createdCategorias = await newCategorias.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      herramienta: createdCategorias,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCategorias = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const herramientaBorrado = await Categoria.findByIdAndDelete(id);
  
      return res.status(200).json(herramientaBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchCategoria = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchCategoria = new Categoria(req.body);
  
      patchCategoria._id = id;

      const herramientaData= await Categoria.findById(id)

      patchCategoria.autor =[...herramientaData.autor, ...patchCategoria.autor]

      if (herramientaData.ico) {
        deleteFile(herramientaData.ico);
        }

      if (req.file) {
        patchCategoria.ico = req.file.path;
      }
  
      const CategoriaDB = await Categoria.findByIdAndUpdate(id, patchCategoria);
      
      return res.status(200).json({ nuevo: patchCategoria, vieja: CategoriaDB });
    } catch (error) {
      return next(error);
    }
  };


  

module.exports = { getAllCategorias, getCategoriaByID, createCategorias,patchCategoria,deleteCategorias};
