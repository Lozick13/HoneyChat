import { useEffect, useState } from 'react';
import { Chat } from '../../api/chats';
import { icons } from '../../api/icons';
import { getUserInfoById } from '../../api/user';
import { useAppSelector } from '../../hooks';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import './chatinfo.scss';

const ChatInfo = ({ chat }: { chat: Chat }) => {
  const { id: userId } = useAppSelector(state => state.user);
  const [users, setUsers] = useState<{ id: string; avatar: number; name: string }[]>([]);

  // get information about users by id
  const getUsers = async (userIds: string[]) => {
    try {
      const userPromise = userIds.map(async id => {
        const data = (await getUserInfoById(id)) as { name: string; avatar: number };
        return { ...data, id };
      });
      const usersData = await Promise.all(userPromise);
      setUsers(usersData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Ошибка при получении информации о пользователе:');
    }
  };

  // get users when chat changes
  useEffect(() => {
    const { users } = chat;
    getUsers(users);
  }, [chat]);

  return (
    <article className="chat-info">
      {userId === chat.admin && (
        <span className="chat-info__invite">{`Код комнаты: ${chat.id.slice(0, 6)}`}</span>
      )}

      {users.map(user => (
        <div key={user.id} className="chat-info__user">
          <div className="chat-info__img-container">
            <img src={icons[user.avatar]} alt={`Аватар пользователя ${user.name}`} />
          </div>
          <span className="chat-info__name">{user.name}</span>
          {userId === chat.admin && userId !== user.id && (
            <IconButton icon="delete" click={() => {}} />
          )}
        </div>
      ))}
    </article>
  );
};

export default ChatInfo;
