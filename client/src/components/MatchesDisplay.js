import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const MatchesDisplay = ({ matches }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null)

  const matchedUserIds = matches.map(({user_id}) => user_id)

  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      })

      setMatchedProfiles(response.data)
      

    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    getMatches()
  }, [])
  
  console.log(matchedProfiles)

  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match, index) => (
        <div key={index} className='match-card'>
          <img src={match?.url} alt={`{match?.first_name} profile`} />
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  )
}

export default MatchesDisplay
