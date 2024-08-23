import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

import s from './Home.module.css';
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

interface HomeProps {
    socket: Socket;
}

export const Home: React.FC<HomeProps> = ({ socket }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('user', user);
        socket.emit('newUser', {
            user,
            socketId: socket.id
        });
        navigate('/chat');
    };

    return (
        <form onSubmit={handleSubmit} className={s.container}>
            <h2>Вход в чат</h2>
            <label htmlFor='user'></label>
            <Input
                type="text"
                placeholder="Type your name..."
                id='user'
                value={user}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setUser(e.target.value); }}
                className={s.userInput}
            />
            <Button type="submit" className={s.homeBtn} title="Войти" />
        </form>
    );
};