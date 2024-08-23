import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import s from './Sidebar.module.css'
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

interface User {
    user: string;
    socketId: string;
}

interface Chat {
    id: string;
    name: string;
}

interface SidebarProps {
    socket: Socket;
    chats: Chat[];
    onCreateChat: (chatName: string) => void;
    onEditChat: (chatId: string, newName: string) => void;
    onDeleteChat: (chatId: string) => void;
    onSelectChat: (chatId: string) => void;
}


export const Sidebar: React.FC<SidebarProps> = ({ socket, chats, onCreateChat, onEditChat, onDeleteChat, onSelectChat }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [newChatName, setNewChatName] = useState<string>('');
    const [editingChatId, setEditingChatId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    useEffect(() => {
        socket.on('responseNewUser', (data: User[]) => setUsers(data));

        return () => {
            socket.off('responseNewUser');
        };
    }, [socket]);

    const filteredUsers = users.filter((value, index, self) =>
        index === self.findIndex((t) => t.user === value.user && t.socketId === value.socketId)
    );

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateChat = () => {
        if (newChatName.trim()) {
            onCreateChat(newChatName);
            setNewChatName('');
        }
    };

    const handleEditChat = (chatId: string, newName: string) => {
        onEditChat(chatId, newName);
        setEditingChatId(null);
    };

    const handleSelectChat = (chatId: string) => {
        setSelectedChatId(chatId);
        onSelectChat(chatId);
    };

    return (
        <div className={s.sidebar}>
            <div className={s.sidebarLogo}>
                <img className={s.logo} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s' alt='logo' />
                <Button
                    title='Log in'
                    className={s.btn} />
            </div>
            <div className={s.chatInput}>
                <Button
                    title='Search'
                    className={s.btn} />
                <Input
                    type="text"
                    placeholder="Search or start new chat"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <h2 className={s.header}>Chats</h2>
            <ul className={s.chats}>
                {filteredChats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`${s.chatItem} ${selectedChatId === chat.id ? s.selectedChat : ''}`}
                        onClick={() => handleSelectChat(chat.id)}
                    >
                        {editingChatId === chat.id ? (
                            <Input
                                type="text"
                                value={chat.name}
                                onChange={(e) => handleEditChat(chat.id, e.target.value)}
                                onBlur={() => setEditingChatId(null)}
                                autoFocus
                            />
                        ) : (
                            <>
                                <span>{chat.name}</span>
                                <Button onClick={(e) => { e.stopPropagation(); setEditingChatId(chat.id) }}>Edit</Button>
                                <Button onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id) }}>Delete</Button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <div className={s.newChat}>
                <Input
                    type="text"
                    placeholder="New chat name"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                />
                <Button onClick={handleCreateChat}>+ New Chat</Button>
            </div>
            <ul className={s.users}>
                {filteredUsers.map((user) => (
                    <li key={user.socketId}>{user.user}</li>
                ))}
            </ul>
        </div>
    )
}