import React from 'react'
import TinderCard from 'react-tinder-card'
import { useState, useEffect, useCallback, useRef } from 'react'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [lastDirection, setLastDirection] = useState()
  const [genderedUsers, setGenderedUsers] = useState(null)

  const userId = cookies.UserId
  const isMounted = useRef(false)

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }, [userId])


  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.gender_interest }
      })
      setGenderedUsers(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }







  useEffect(() => {
    if (!isMounted.current) {
      getUser()
      getGenderedUsers()
      isMounted.current = true
    }
  }, [getUser])

  // Use this for debugging, remove in production
  useEffect(() => {
    if (user) {
      console.log('User data:', user)
      // console.log('Gendered users:', genderedUsers)
    }
  }, [user, genderedUsers])


  const updateMatches = async (matchedUserId) => {
    try {
      const response = await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId
      })
      // console.log('Matches updated:', response.data)
      getUser()
    } catch (error) {
      console.error('Error updating matches:', error)
    }
  }

  console.log(user)





  const swiped = (direction, swipedUserId) => {

    if (direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    setGenderedUsers((prevCharacters) => prevCharacters.filter((character) => character.first_name !== name))
  }

  const swipeLeft = () => {
    if (genderedUsers.length > 0) {
      const nameToDelete = genderedUsers[genderedUsers.length - 1].first_name
      swiped('left', nameToDelete)
      outOfFrame(nameToDelete)
    }
  }

  const swipeRight = () => {
    if (genderedUsers.length > 0) {
      const nameToDelete = genderedUsers[genderedUsers.length - 1].first_name

      swiped('right', nameToDelete)
      outOfFrame(nameToDelete)
    }
  }

  const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId) || []

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  )


  return (

    <>
      {user &&

        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              <div className="tinder-card-box">
                {filteredGenderedUsers?.map((genderedUsers) =>
                  <TinderCard
                    className='swipe'
                    key={genderedUsers.first_name}
                    onSwipe={(dir) => swiped(dir, genderedUsers.user_id)}
                    onCardLeftScreen={() => outOfFrame(genderedUsers.first_name)}
                    preventSwipe={['up', 'down']} // Add this line
                  >
                    <div style={{ backgroundImage: 'url(' + genderedUsers.url + ')' }} className='card'>
                      <h3>{genderedUsers.first_name}</h3>
                    </div>
                  </TinderCard>
                )}
              </div>
              <div className="swipe-buttons">
                <button className="swipe-button left" onClick={swipeLeft}>❌</button>
                <button className="swipe-button right" onClick={swipeRight}>✅</button>
              </div>
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Dashboard