import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModel, isSignup }) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const [cookies, setCookie, removeCookie] = useCookies(null)

  let navigate = useNavigate()

  const handleClick = () => {
    setShowModel(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // Reset error before each submission
    try {
      if (isSignup && (password !== confirmPassword)) {
        setError("Passwords do not match")
        return
      }

      const response = await axios.post(`http://localhost:8000/${isSignup ? 'signup' : 'login'}`, { email, password })

      setCookie('email', response.data.email)
      setCookie('UserId', response.data.userId)
      setCookie('AuthToken', response.data.token)

      const success = response.status === 201
      if (success && isSignup) navigate('/onboarding')
      if (success && !isSignup) navigate('/dashboard')

      window.location.reload()

    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError("An error occurred. Please try again.")
      }
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignup && <input
          type="password"
          id="password-check"
          name="password-check"
          placeholder="confirm Password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />}

        <input className="submit-btn" type="submit" />
        <p>{error}</p>

      </form>
      <hr />
      <h2>GET THE APP</h2>

    </div>
  )
}

export default AuthModal
