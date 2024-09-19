import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'

const ChatContainer = ({ user }) => {
  const [displayOption, setDisplayOption] = useState('matches')

  return (
    <div className="chat-container">
      <ChatHeader user={user} />

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

      <MatchesDisplay matches={user.matches} />
      <ChatDisplay />
    </div>
  )
}

export default ChatContainer