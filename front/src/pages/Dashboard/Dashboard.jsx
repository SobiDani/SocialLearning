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
     console.log(usersAPI);
     setUser(usersAPI.data.Users);
     
   };
   getUsers();
 }, []);


    const [lastDirection, setLastDirection] = useState()
  
    const swiped = (direction, idToDelete) => {
      console.log('removing: ' + idToDelete)
      setLastDirection(direction)
      console.log(direction);

     

      if ( direction === "right" ) {

        API.get("MatchCard/idMatch/"+localStorage.idUser+"/"+idToDelete).then((res) => {
          console.log(res);

          if (res.status === 200) {

            
            const matchRes = { roomid: localStorage.idUser+idToDelete, matchConfirm: true };
            API.patch("MatchCard/"+res.MatchCard._id, matchRes).then((res) => {
              console.log(res);
              
            });
             const match = { id_users: localStorage.idUser, id_users_match: idToDelete, roomid: localStorage.idUser+idToDelete, matchConfirm: true };

            API.post("MatchCard", match).then((res) => {
              console.log(res);
              
            });
          }
          else{
            const match = { id_users: localStorage.idUser, id_users_match: idToDelete };

            API.post("MatchCard", match).then((res) => {
              console.log(res);
              
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

              <h3>{User.name}</h3>
            </div>
          </TinderCard>
          )}

            <div className='swipeInfo'>
                { lastDirection ? <p> You swiped {lastDirection}</p> : <p/>}
            </div>

            </div>

        </div>
    </div>
  )
}



export default Dashboard;