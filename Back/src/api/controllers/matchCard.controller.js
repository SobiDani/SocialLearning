
const MatchCard = require("../models/matchcard.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllMatchCard = async (req, res, next) => {
  try {
    const allMatchCard = await MatchCard.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      MatchCard: allMatchCard,
    });
  } catch (error) {
    return next(error);
  }
};


const getMatchCardByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const herramientaByID = await MatchCard.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      MatchCard: herramientaByID,
    });
  } catch (error) {
    return next(error);
  }
};

const getidMatchCheck = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const idMatch = req.params.idMatch;
    console.log(idMatch);

    const herramientaByID = await MatchCard.find({id_users : id, id_user_match : idMatch});

    if(herramientaByID === ""){
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        MatchCard: herramientaByID,
      });
    }else{
      return res.json({
        status: 404,
        message: HTTPSTATUSCODE[404],
        MatchCard: "notfound",
      });
    }
    
  } catch (error) {
    return next(error);
  }
};

const getidMatch = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const idMatch = req.params.idMatch;
    console.log(idMatch);

    const herramientaByID = await MatchCard.find({id_users : idMatch, id_user_match : id});

    if(herramientaByID === ""){
      return res.json({
        status: 404,
        message: HTTPSTATUSCODE[404],
        MatchCard: "notfound",
      });
      
    }else{
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        MatchCard: herramientaByID,
      }); 
    }
    
  } catch (error) {
    return next(error);
  }
};


const createMatchCard = async (req, res, next) => {
  try {
    console.log(req.body);
    const newMatchCard = new MatchCard(req.body);

    const createdMatchCard = await newMatchCard.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      matchcard: createdMatchCard,
    });
  } catch (error) {
    return next(error);
  }
  
};

const deleteMatchCard = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const herramientaBorrado = await MatchCard.findByIdAndDelete(id);
  
      return res.status(200).json(herramientaBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchMatchCard = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchMatchCard = new MatchCard(req.body);
  
      patchMatchCard._id = id;

      const MatchCardDB = await MatchCard.findByIdAndUpdate(id, patchMatchCard);
      
      return res.status(200).json({ nuevo: patchMatchCard, vieja: MatchCardDB });
    } catch (error) {
      return next(error);
    }
  };


  

module.exports = { getAllMatchCard, getMatchCardByID, createMatchCard, patchMatchCard, deleteMatchCard, getidMatch, getidMatchCheck};
