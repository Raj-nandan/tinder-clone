import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const MatchesDisplay = ({ matches }) => {
  const [matchedProfiles, setMatchedProfiles] = useState([]) // Initialize as an empty array

  // Use useMemo to memoize matchedUserIds
  const matchedUserIds = useMemo(() => {
    return matches?.map(({ user_id }) => user_id) || []
  }, [matches]) // Only recalculate when matches changes

  const getMatches = async () => {
    if (matchedUserIds.length === 0) return; // Prevent API call if no user IDs

    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      })

      setMatchedProfiles(response.data)
    } catch (error) {
      console.error('Error fetching matches:', error) // Improved error logging
    }
  }

  useEffect(() => {
    getMatches()
  }, [matchedUserIds]) // Add matchedUserIds as a dependency

  console.log(matchedProfiles)

  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match, index) => (
        <div key={index} className='match-card'>
          <img src={match?.url} alt={`${match?.first_name} profile`} /> {/* Corrected alt attribute */}
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  )
}

export default MatchesDisplay