const express = require("express");

const router = express.Router();
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllMatchCards, getMatchCardByID, createMatchCards,patchMatchCard,deleteMatchCards
} = require("../controllers/categorias.controller");

router.get("/", getAllMatchCards);
router.get("/id/:id", getMatchCardByID);
router.post("/"/* ,[isAuth] */,  createMatchCards);
router.delete('/:id',[isAuth], deleteMatchCards);
router.patch('/:id'/* ,[isAuth] */, patchMatchCard)

module.exports = router;
