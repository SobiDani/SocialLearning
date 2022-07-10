const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");


const register = async (req, res, next) => {
  try {
    console.log(req.body);

    if(req.body.id_herramientas === false){req.body.id_herramientas = ["62c6bb4f094d1cab92b166d0"]}
    if(req.body.id_categoria === ''){req.body.id_categoria = "62c75621dfa25d37cf627fad"}
    console.log(req.body);
    const newUser = new User(req.body);
    const createdUser = newUser.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      user: createdUser,
    });
  } catch (error) {
    return next(error);
  }
};


const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const userInfo = await User.findOne({ username: req.body.username }).populate("id_herramientas").populate("id_categoria");
    console.log(userInfo.password);
    if (req.body.password === userInfo.password) {
      userInfo.password = null;
      
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
        },
        req.app.get("secretKey"),
        { expiresIn: "24h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        user: userInfo,
        token: token,
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("id_herramientas").populate("id_categoria");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Users: allUsers,
    });
  } catch (error) {
    return next(error);
  }
};


const getUsersByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const UsersByID = await User.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Users: UsersByID,
    });
  } catch (error) {
    return next(error);
  }
};

const getUsersAlumnoByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const UsersByID = await User.findById(id);
    /* const userFind = await User.find(id_herramientas=UsersByID.id_herramientas); */
    
    const userName = [];
    const user = [];


    for (const idHerramientas of UsersByID.id_herramientas) {


      const userFind = await User.find({id_herramientas: idHerramientas});
      console.log(userFind);
      
      for (const usuario of userFind) {
        
        if(usuario.rol === "Maestro"){
          
          if(user.length != 0){

            if(userName.includes(usuario.username)){
              /* console.log(userName.includes(usuario.username)); */

            }else{
              /* console.log(userName.includes(usuario.username), userName, usuario.username); */
              user.push(usuario);
            }
            userName.push(usuario.username)
              
          }else{
            userName.push(usuario.username)
            user.push(usuario);  
          }
          
          
         
        } 
      }
      

    }
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Users: user,
    });
  } catch (error) {
    return next(error);
  }
};

const getUserMaestrosByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const UsersByID = await User.findById(id);
    /* const userFind = await User.find(id_herramientas=UsersByID.id_herramientas); */
    
    const userName = [];
    const user = [];


    for (const idHerramientas of UsersByID.id_herramientas) {


      const userFind = await User.find({id_herramientas: idHerramientas});
      console.log(userFind);
      
      for (const usuario of userFind) {
        
        if(usuario.rol === "Alumno"){
          
          if(user.length != 0){

            if(userName.includes(usuario.username)){
              /* console.log(userName.includes(usuario.username)); */

            }else{
              /* console.log(userName.includes(usuario.username), userName, usuario.username); */
              user.push(usuario);
            }
            userName.push(usuario.username)
              
          }else{
            userName.push(usuario.username)
            user.push(usuario);  
          }
          
          
         
        } 
      }
      

    }
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Users: user,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUsers = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const UserBorrado = await User.findByIdAndDelete(id);
  
      return res.status(200).json(UserBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchUser = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchUser = new User(req.body);
  
      patchUser._id = id;

      const UserData= await User.findById(id)

      // patchUser.autor =[...cuadroData.autor, ...patchCuadro.autor]

      if (UserData.imagen) {
        deleteFile(UserData.imagen);
        }

      if (req.file) {
        patchUser.imagen = req.file.path;
      }
  
      const UserDB = await User.findByIdAndUpdate(id, patchUser);
      
      return res.status(200).json({ nuevo: patchUser, vieja: UserDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { login, register, logout, getAllUsers, getUsersByID, deleteUsers, patchUser, getUsersAlumnoByID, getUserMaestrosByID };
