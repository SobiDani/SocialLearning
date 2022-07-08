import React from 'react'
import TinderCard from 'react-tinder-card';
import { useState } from 'react';
import './Dashboard.scss';

const Dashboard = () => {

    const characters = [
        {
          name: 'Richard Hendricks',
          url: 'https://i.imgur.com/yQLDyiR.jpg'
        },
        {
          name: 'Erlich Bachman',
          url: 'https://i.pinimg.com/736x/7a/9e/39/7a9e391d873b77659d7fc730f9745669--animals-dog-funny-animals.jpg'
        },
        {
          name: 'Monica Hall',
          url: 'https://www.dogandpuptown.com/wp-content/uploads/2017/05/Random-funny-dogs-may1907-450x448.jpg'
        },
        {
          name: 'Jared Dunn',
          url: 'https://i.redd.it/bbtgfcqauiv61.jpg'
        },
        {
          name: 'Dinesh Chugtai',
          url: 'https://static.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg'
        }
      ]
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

            {characters.map((character) =>
                <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>

              <h3>{character.name}</h3>
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