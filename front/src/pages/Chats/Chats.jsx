import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generatePath } from 'react-router-dom';
import { API } from "../../services/api";

import "./chats.scss";

const Chats = () => {

   const [matchCard, setMatchCard] = useState([]);


   useEffect(() => {
    const getMatchCard = async () => {
      const matchCardAPI = await API.get(`/matchCard`);
      console.log(matchCardAPI);
      setMatchCard(matchCardAPI.data.MatchCard);
    };
    getMatchCard();
  }, []); 
 
  return (
    <div className="chat-container">
    <h2>CONVERSACIONES</h2>
    <hr className="stylehr"></hr>
    <div className="usuariosChat">



    { localStorage.getItem("rol") === "Alumno" && matchCard.filter((usuario) => usuario.id_users_match.rol === "Maestro").map((usuario)=> (
        <>
        
        {usuario.matchConfirm?
      <figure  key={usuario._id}>
       <Link className="usuariosChatimagen" to={generatePath('/chats/:id', { id: usuario.roomid })}> 
        <img src={usuario.id_users_match.id_categoria.imagen} alt="test"/> 
      <p>{usuario.id_users_match.name}</p>
      </Link>
      </figure>
    : null}
    </>
      ))}  

      { localStorage.getItem("rol") === "Maestro" && matchCard.filter((usuario) => usuario.id_users_match.rol === "Alumno").map((usuario)=> (
        <>
        
        {usuario.matchConfirm?
      <figure  key={usuario._id}>
       <Link className="usuariosChatimagen" to={generatePath('/chats/:id', { id: usuario.roomid })}> 
        <img src={usuario.id_users_match.id_categoria.imagen} alt="test"/> 
      <p>{usuario.id_users_match.name}</p>
      </Link>
      </figure>
    : null}
    </>
      ))}  
     
      </div>
    </div>
  );  
};

export default Chats;