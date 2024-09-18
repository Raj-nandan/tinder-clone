import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'

const ChatContainer = () => {
  const [displayOption, setDisplayOption] = useState('matches')

  return (
    <div className="chat-container">
      <ChatHeader />

      <div className="option-container">
        <button
          className={`option ${displayOption === 'matches' ? 'active' : ''}`}
          onClick={() => setDisplayOption('matches')}
        >
          Matches
        </button>
        <button
          className={`option ${displayOption === 'chats' ? 'active' : ''}`}
          onClick={() => setDisplayOption('chats')}
        >
          Chats
        </button>
      </div>

      {/* {displayOption === 'matches' && <MatchesDisplay />}
      {displayOption === 'chats' && <ChatDisplay />} */}

      <MatchesDisplay />
      <ChatDisplay />
    </div>
  )
}

export default ChatContainer