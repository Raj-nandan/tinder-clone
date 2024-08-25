import React from 'react'
import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {
  const characters = [
    {
      name: 'Richard Hendricks',
      url: "https://img.freepik.com/free-photo/beautiful-anime-character-cartoon-scene_23-2151035157.jpg"
    },
    {
      name: 'Erlich Bachman',
      url: "https://img.freepik.com/free-photo/anime-stylecelebrating-valentines-day_23-2151258005.jpg"
    },
    {
      name: 'Monica Hall',
      url: "https://t4.ftcdn.net/jpg/06/22/22/17/360_F_622221708_Gg16ZdaNSixeaIORq9MuuT4w9VWTkYw4.jpg"
    },
    {
      name: 'Jared Dunn',
      url: "https://imgeng.jagran.com/webstories/65200/top-5-villains-in-anime-1696856689.jpeg"
    },
    {
      name: 'Dinesh Chugtai',
      url: "https://im.rediff.com/movies/2023/aug/28anime1.jpg?w=670&h=900"
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
    <div className="dashboard">
      <ChatContainer/>
      <div className="swipe-container ">
        <div className="card-container">
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}

        <div className="swipe-info">
          {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
        </div>

        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
