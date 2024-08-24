import React from 'react'
import { useState } from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'

const Home = () => {
  const [showModel, setShowModel] = useState(false)
  const [isSignup, setIsSignUp] = useState(true)

  const authToken = false

  const handleClick = () => {
    console.log('Clicked')
    setShowModel(true)
    setIsSignUp(true)
  }

  return (
    <div className="overlay">
    <Nav minimal={false} authtoken={authToken} setShowModal={setShowModel} showModel={showModel} setIsSignUp = {setIsSignUp} />
    <div className= "home">
        <h1 className="primary-title">Get Matched</h1>
        <button className= "primary-btn" onClick={handleClick}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>

        {showModel && (<AuthModal setShowModel = {setShowModel} isSignup={isSignup} />)}

    </div>
    </div>
    
  )
}

export default Home
