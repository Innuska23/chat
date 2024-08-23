import { useNavigate } from 'react-router-dom';
import s from './Body.module.css'
import { Button } from '../Button/Button';
import { ChatItem, Message } from '../chat/Chat';

interface BodyProps {
    messages: Message[];
    status: string;
    selectedChat: ChatItem | null;
}

export const Body = ({ messages, status, selectedChat }: BodyProps) => {
    const navigate = useNavigate();
    const handleLeave = () => {
        localStorage.removeItem('user');
        navigate('/')
    }

    return (
        <>
            <header className={s.header}>
                {selectedChat && <h2>{selectedChat.name}</h2>}
                <Button className={s.btn} onClick={handleLeave} title="Log out" />
            </header>

            <div className={s.container}>
                {
                    messages.map((el) => {
                        return (
                            el.name === localStorage.getItem('user') ? (
                                <div className={s.chats} key={el.id}>
                                    <p className={s.senderName}>Вы</p>
                                    <div className={s.messageSender}>
                                        <p>{el.text}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={s.chats}>
                                    <p>{el.name}</p>
                                    <div className={s.messageRecipient}>
                                        <p>{el.text}</p>
                                    </div>
                                </div>
                            ))
                    })
                }
                <div className={s.status}>
                    <p>{status}</p>
                </div>
            </div>
        </>
    )
}