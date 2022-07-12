
const MatchCard = require("../models/matchcard.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")

function isEmptyObject(obj) {
  for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
          return false;
      }
  }

  return true;
}

const getAllMatchCard = async (req, res, next) => {
  try {
    const allMatchCard = await MatchCard.find().populate({
      path : 'id_users_match',
      populate : {
        path : 'id_categoria'
      }});

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
    const matchcardByID = await MatchCard.findById(id);
    console.log(matchcardByID);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      MatchCard: matchcardByID,
    });
  } catch (error) {
    return next(error);
  }
};

const getidMatchCheck = async (req, res, next) => {
  try {
    const id = req.params.id;
    const idMatch = req.params.idMatch;
    console.log(id, idMatch);
    const matchcardByID = await MatchCard.find({id_user: id});
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      MatchCard: matchcardByID,
    });
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

    const matchcardByID = await MatchCard.find({id_users : idMatch});

      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        MatchCard: matchcardByID,
      });
    
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
  
      const matchcardBorrado = await MatchCard.findByIdAndDelete(id);
  
      return res.status(200).json(matchcardBorrado);
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
