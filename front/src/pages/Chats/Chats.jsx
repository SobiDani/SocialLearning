import React from "react";
import { Link } from "react-router-dom";
import { generatePath } from 'react-router-dom';

import "./chats.scss";

const Chats = () => {
/*   const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  }; */

  //Ejemplo mientra no estan los usuarios: ⬇️
  const usuarios = [{
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Javier",
    id_:1
  },{
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Maria",
    id_:2
  },{
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Elena",
    id_:3
  },{
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Pablo",
    id_:4
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Rocio",
    id_:5
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Roberto",
    id_:6
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4645/4645949.png",
    nombre:"Rocio",
    id_:6
  } ]

  return (
    <div className="chat-container">
    <h2>CONVERSACIONES</h2>
    <hr className="stylehr"></hr>
    <div className="usuariosChat">
    {usuarios.map((usuario)=> (
      <figure  key={usuario.id_}>
      <Link className="usuariosChatimagen" to={generatePath('/chats/:id', { id: usuario.id_ })}>
      <img src={usuario.image} alt={usuario.name}/>
      <p>{usuario.nombre}</p>
      </Link>
      </figure>
      ))}
      </div>



{/*       <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/room/${roomName}`} className="enter-room-button">
        Join room
      </Link> */}
    </div>
  );
};

export default Chats;