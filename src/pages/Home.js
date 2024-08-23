import React from 'react'
import Nav from '../components/Nav'

const Home = () => {

  const authToken = false

  const handleClick = () => {
    console.log('Clicked')
  }

  return (
    <div className="overlay">
    <Nav minimal={false} authtoken={authToken}/>
    <div className= "home">
        <h1>Get Matched</h1>
        <button className= "primary-btn" onClick={handleClick}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>
    </div>
    </div>
    
  )
}

export default Home
