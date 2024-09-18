import React from 'react'

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="profile">
        <div className="img-container">
          <img src="https://images1.dnaindia.com/images/DNA-EN/900x1600/2024/2/16/1708066916901_ntgfvc89ff.jpg" alt="profile"/>
        </div>
        <h3>Username</h3>
      </div>
      <i className="log-out-icon">⇦</i>
    </div>
  )
}

export default ChatHeader

