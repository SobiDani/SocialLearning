import React, {useState} from 'react';
import TinderCard from 'react-tinder-card';
import './SwipeCard.scss';

function SwipeCard (){

    const onSwipe = (direction) => {
        alert(direction);
        console.log('You swiped: ' + direction)
      }
    
      const onCardLeftScreen = (myIdentifier) => {
        alert("onCardLeftScreen" + myIdentifier);
        console.log(myIdentifier + ' left the screen')
      }
    
      return (
       <> 
        <TinderCard className="cardTinder" onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Hello, World!</div>
        </TinderCard>
        <TinderCard className="cardTinder" onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Hello, World!2</div>
        </TinderCard>
        <TinderCard className="cardTinder" onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Hello, World!3</div>
        </TinderCard>
        <TinderCard className="cardTinder" onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Hello, World!4</div>
        </TinderCard>
        <TinderCard className="cardTinder" onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Hello, World!5</div>
        </TinderCard>
        <TinderCard className="cardTinder" onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Hello, World!6</div>
        </TinderCard>
      </>
      )
    }
    
export default SwipeCard;
