import React, { useState, useEffect } from 'react'
import { format } from "timeago.js"

function Message({ message, own }) {
    const [timeAgo, setTimeAgo] = useState(format(message.createdAt));

    useEffect(() => {
        setTimeAgo(format(message.createdAt))
        const timeID = setInterval(() => {
            setTimeAgo(format(message.createdAt))
        }, 1000)
        return () => {
            clearInterval(timeID);
        }
    }, [message.createdAt]);

    return (
        <div>
            <p className={own ? 'message-sent' : 'message-received'}>
                <span>{message.text}</span>
                <span className='message-time'>{timeAgo}</span>
            </p>
        </div>
    )
}

export default Message