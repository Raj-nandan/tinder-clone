import React from 'react'
import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'

const ChatContainer = () => {
  return (
    <div className="chat-container">
      <ChatHeader/>

      <div>
        <button className="option">Matches</button>
        <button className="option">Chats</button>
      </div>

      <MatchesDisplay/>
      <ChatDisplay/>
    </div>
  )
}

export default ChatContainer
