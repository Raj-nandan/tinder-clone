import React from 'react'
import { useCookies } from 'react-cookie'
import defaultImage from '../images/altImage.png'
import { useNavigate } from 'react-router-dom'



const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const navigate = useNavigate()
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        // window.location.reload()
        navigate('/')
    }


    
  
    return (
      <div className="chat-header">
        <div className="profile">
          <div className="img-container">
            <img src={user.url || defaultImage} alt="profile"/>
          </div>
          <h3>{user.first_name}</h3>
        </div>
        <i className="log-out-icon" onClick={logout}>⇦</i>
      </div>
    )
  }
  
  export default ChatHeader

