import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generatePath } from 'react-router-dom';
import { API } from "../../services/api";

import "./chats.scss";

const Chats = () => {
/*   const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  }; */

   const [matchCard, setMatchCard] = useState([]);


   useEffect(() => {
    const getMatchCard = async () => {
      const matchCardAPI = await API.get(`/matchCard`);
      setMatchCard(matchCardAPI.data.MatchCard);
    };
    getMatchCard();
  }, []); 

  console.log(matchCard);
 
  return (
    <div className="chat-container">
    <div className="topConver">
    <h2>CONVERSACIONES</h2>
    </div>

    <div className="usuariosChat">
    
    { localStorage.getItem("rol") === "Alumno" && matchCard.filter((usuario) => usuario.id_users === localStorage.getItem("idUser")).map((usuario)=> (
        <>

        {usuario.matchConfirm?
      <figure  key={usuario._id}>
       <Link className="usuariosChatimagen" to={generatePath('/chats/:id', { id: usuario.roomid })}> 
        <img src={usuario.id_users_match.img} alt="test"/> 
      <p>{usuario.id_users_match.name}</p>
      </Link>
      </figure>
    : null}
    </>
      ))}

      { localStorage.getItem("rol") === "Maestro" && matchCard.filter((usuario) => usuario.id_users === localStorage.getItem("idUser")).map((usuario)=> (
        <>

        {usuario.matchConfirm?
      <figure  key={usuario._id}>
       <Link className="usuariosChatimagen" to={generatePath('/chats/:id', { id: usuario.roomid })}> 
        <img src={usuario.id_users_match.img} alt="test"/> 
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