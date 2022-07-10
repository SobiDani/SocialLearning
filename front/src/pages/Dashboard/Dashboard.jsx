import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import { useState } from 'react';
import './Dashboard.scss';
import { API } from '../../services/api';



const Dashboard = () => {

  const [User, setUser] = useState([]);

  useEffect(() => {

   const getUsers = async () => {
     const usersAPI = await API.get(`users`);
     console.log(usersAPI);
     setUser(usersAPI.data.Users);
     
   };
   getUsers();
 }, []);


  const[UsersRol, setUsersRol] = useState([]);

  useEffect(() => {

  const getUsersRol = async () => {
  const usersRolAPI = await API.get(`users.rol`);
  console.log(usersRolAPI);
  setUsersRol(usersRolAPI.data.Users.rol);
  
};
getUsersRol();
}, []);

useEffect(() => {
  if (User) {
      UsersRol()
  }
}, [UsersRol])

const[Matches, setMatches] = useState([]);

const putMatches = async (matchedUserId) => {
  try {
      await API.put('', {
          UsersRol
      })
      putMatches()
  } catch (err) {
      console.log(err)
  }
}



 

    const [lastDirection, setLastDirection] = useState()
  
    const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }
  


  return (
    <div className='dashboard'> 

        <div className='swipe-container'>
            <div className='card-container'>
         
            {User.filter(character => character.rol !== localStorage.rol).map((character) =>
                <TinderCard className='swipe' key={character._id} onSwipe={(dir) => swiped(dir, character.username)} onCardLeftScreen={() => outOfFrame(character.username)}>
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

export default Dashboard