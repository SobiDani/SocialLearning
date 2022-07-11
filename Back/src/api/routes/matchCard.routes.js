const express = require("express");

const router = express.Router();
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllMatchCard, getMatchCardByID, createMatchCard,patchMatchCard,deleteMatchCard, getidMatch
} = require("../controllers/matchCard.controller");

router.get("/", getAllMatchCard);
router.get("/id/:id", getMatchCardByID);
router.get("/idMatch/:id/:idMatch", getidMatch);
router.post("/"/* ,[isAuth] */,  createMatchCard);
router.delete('/:id',[isAuth], deleteMatchCard);
router.patch('/:id'/* ,[isAuth] */, patchMatchCard)

module.exports = router;
