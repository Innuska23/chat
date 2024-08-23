import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Socket } from 'socket.io-client';
import s from './MessageBlock.module.css';
import { Input } from '../Input/Input';

interface MessageBlockProps {
    socket: Socket;
}

export const MessageBlock: React.FC<MessageBlockProps> = ({ socket }) => {
    const [message, setMessage] = useState<string>('');

    const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} is typing`);

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('user')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('user'),
                id: `${socket.id}-${Math.random()}`,
                socketId: socket.id
            });
        }
        setMessage('');
    };

    return (
        <div className={s.messageBlock}>
            <form
                className={s.form}
                onSubmit={handleSendMessage}>
                <Input
                    type="text"
                    placeholder="Type your message..."
                    className={s.userMessage}
                    value={message}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMessage(e.target.value);
                    }}
                    onKeyDown={isTyping}
                />
                <button className={s.btn}>Send</button>
            </form>
        </div>
    );
};