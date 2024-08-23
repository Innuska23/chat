import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { Body } from "../Body/Body";
import { MessageBlock } from "../MessageBlock/MessageBlock";
import { Sidebar } from "../sidebar/Sidebar";
import s from './Chat.module.css';

interface ChatProps {
    socket: Socket;
}

export interface Message {
    id: string;
    text: string;
    user: string;
}

export interface ChatItem {
    id: string;
    name: string;
    messages: Message[];
}

export const Chat: React.FC<ChatProps> = ({ socket }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<string>("");
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);

    useEffect(() => {
        socket.on('response', (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('responseTyping', (data: string) => {
            setStatus(data);
            setTimeout(() => setStatus(''), 1000);
        });

        socket.on('existingChats', (existingChats: ChatItem[]) => {
            setChats(existingChats);
        });

        socket.on('chatCreated', (newChat: ChatItem) => {
            setChats((prevChats) => [...prevChats, newChat]);
        });

        socket.on('chatEdited', (editedChat: { id: string; name: string }) => {
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === editedChat.id ? { ...chat, name: editedChat.name } : chat
                )
            );
        });

        socket.on('chatDeleted', (chatId: string) => {
            setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
            if (selectedChat && selectedChat.id === chatId) {
                setSelectedChat(null);
            }
        });

        return () => {
            socket.off('response');
            socket.off('responseTyping');
            socket.off('existingChats');
            socket.off('chatCreated');
            socket.off('chatEdited');
            socket.off('chatDeleted');
        };
    }, [socket, selectedChat]);

    const createChat = (chatName: string) => {
        socket.emit('createChat', chatName);
    };

    const editChat = (chatId: string, newName: string) => {
        socket.emit('editChat', chatId, newName);
    };

    const deleteChat = (chatId: string) => {
        socket.emit('deleteChat', chatId);
    };

    const selectChat = (chatId: string) => {
        const chat = chats.find((c) => c.id === chatId);
        setSelectedChat(chat || null);
    };

    return (
        <div className={s.chat}>
            <Sidebar
                socket={socket}
                chats={chats}
                onCreateChat={createChat}
                onEditChat={editChat}
                onDeleteChat={deleteChat}
                onSelectChat={selectChat}
            />
            <main className={s.main}>
                <Body messages={messages} status={status} selectedChat={selectedChat} />
                <MessageBlock socket={socket} />
            </main>
        </div>
    );
};