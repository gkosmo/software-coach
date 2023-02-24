import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios';

export function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Coach',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        axios.post(
            "http://10.0.2.2:3000/messages",
            { "message": messages[0].text }
        ).then((response) => {
            let answer = response.data.choices[0].text
            console.log(answer)
            let message = {
                text: answer,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Coach",
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, message))

        }
        )

    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}