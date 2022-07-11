import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import { useState } from 'react';
import './Dashboard.scss';
import { API } from '../../services/api';



const Dashboard = () => {

  const [User, setUser] = useState([]);

  useEffect(() => {

    const getUsers = async () => {
      const usersAPI = await API.get(`users/${localStorage.rol}/${localStorage.idUser}`);
      /* console.log(usersAPI); */
      setUser(usersAPI.data.Users);

    };
    getUsers();
  }, []);


  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, idToDelete) => {
    /* console.log('removing: ' + idToDelete) */
    setLastDirection(direction)
    console.log(direction);



    if (direction === "right") {

      API.get("MatchCard/idMatch/" + localStorage.idUser + "/" + idToDelete).then((res) => {
        console.log("Busco si existe mas entradas con este usuario", res);

        if (res.data.MatchCard.length !== 0) {
          console.log("si tengo contenido es que este usuario tiene match");
          let confirmacionPost = false;
          for (const matchFind of res.data.MatchCard) {
            if (matchFind.id_users === idToDelete) {
              confirmacionPost = true;
            }
          }
          if (confirmacionPost) { } else {
            const matchRes = { roomid: localStorage.idUser + idToDelete, matchConfirm: true };
            API.patch("MatchCard/" + res.MatchCard._id, matchRes).then((res) => {
              console.log("Se actualiza la linea y se genera el MATCH", res);
            });
            const match = { id_users: localStorage.idUser, id_users_match: idToDelete, roomid: localStorage.idUser + idToDelete, matchConfirm: true };

              API.post("MatchCard", match).then((res) => {
                console.log("Añado el match que acaba de generar este usuario", res);

              });
          }
        
        } else {
          
          API.get("MatchCard/idMatchCheck/" + localStorage.idUser + "/" + idToDelete).then((res) => {
            console.log(res.data.MatchCard);
            if (res.data.MatchCard.length === 0) {
              const match = { id_users: localStorage.idUser, id_users_match: idToDelete };

              API.post("MatchCard", match).then((res) => {
                console.log("se añade la primera linea de match de este usuario", res);

              });
            } else {
              let confirmacionPost = false;
              for (const matchFind of res.data.MatchCard) {
                if (matchFind.id_users_match === idToDelete) {
                  confirmacionPost = true;
                }
              }
              if (confirmacionPost) { } else {
                const match = { id_users: localStorage.idUser, id_users_match: idToDelete };
                API.post("MatchCard", match).then((res) => {
                  console.log("se añade una entrada en el match puesto que no existe con esta tarjeta", res);

                });
              }

            }
          });
        }
      });


    }




  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }



  return (
    <div className='dashboard'>

      <div className='swipe-container'>
        <div className='card-container'>

          {User.filter(character => character.rol !== localStorage.rol).map((character) =>
            <TinderCard className='swipe' key={character._id} onSwipe={(dir) => swiped(dir, character._id)} onCardLeftScreen={() => outOfFrame(character._id)}>
              <div style={{ backgroundImage: 'url(' + character.id_categoria.imagen + ')' }} className='card'>

                <h2>{character.name}</h2>
                <h3>{character.username}</h3>
                <h2>{character._id}</h2>
              </div>
            </TinderCard>
          )}

          <div className='swipeInfo'>
            {lastDirection ? <p> You swiped {lastDirection}</p> : <p />}
          </div>

        </div>

      </div>
    </div>
  )
}



export default Dashboard;