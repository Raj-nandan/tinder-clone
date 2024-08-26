import React from 'react'
import { useState } from 'react'



const ChatInput = () => {
    const [textArea, setTextArea] = useState(null)
    return (
        <div className="chat-input">
            <textarea value={textArea} placeholder='hii..' onChange={(e) => setTextArea(e.target.value)} />
            <button className="submit-btn">Send</button>
        </div>
    )
}

export default ChatInput
