import React from 'react'
import { useState } from 'react'

const AuthModal = ({ setShowModel, isSignup }) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = () => {
    setShowModel(false)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    try{
      if(isSignup && ( password !== confirmPassword)){
        setError("Password does not match")
      }
      console.log("make a post req to database")
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className="auth-modal">
      <div className="close-btn" onClick={handleClick}>X</div>
      <h2> {isSignup ? 'Create Account' : 'Log In'} </h2>

      <form onSubmit={handleSubmit}>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required={true}
            onChange={(e) =>setEmail(e.target.value)}
        />
        <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required={true}
            onChange={(e) =>setPassword(e.target.value)}
        />
        {isSignup && <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm Password"
            required={true}
            onChange={(e) =>setConfirmPassword(e.target.value)}
        />}

        <input className="submit-btn" type="submit"/>
       <p>{error}</p>

        </form>
        <hr/>
        <h2>GET THE APP</h2>

    </div>
  )
}

export default AuthModal
