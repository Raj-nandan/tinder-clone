import React from 'react'

const ChatHeader = () => {
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src="https://images1.dnaindia.com/images/DNA-EN/900x1600/2024/2/16/1708066916901_ntgfvc89ff.jpg" alt="profile"/>
        </div>
        <h3>User Name</h3>
      </div>
      <i className="log-out-icon">Log out</i>
    </div>
  )
}

export default ChatHeader
