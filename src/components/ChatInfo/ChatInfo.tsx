import { useEffect, useState } from 'react';
import { Chat, deleteUserById } from '../../api/chats';
import { icons } from '../../api/icons';
import { getUserInfoById } from '../../api/user';
import { useAppSelector } from '../../hooks';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import './chatinfo.scss';

const ChatInfo = ({ chat }: { chat: Chat }) => {
  const { id: userId } = useAppSelector(state => state.user);
  const [searchData, setSearchData] = useState<string>('');
  const [users, setUsers] = useState<{ id: string; avatar: number; name: string }[]>([]);

  // get information about users by id
  const getUsers = async (users: string[]) => {
    try {
      for (const id of users) {
        const data: { avatar: number; name: string } = (await getUserInfoById(id)) as {
          avatar: number;
          name: string;
        };
        setUsers(prevUsers => [...prevUsers, { ...data, id }]);
      }
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
      <ChatInput
        leftElement={<IconButton icon="search" />}
        id="search-chat"
        name="search-chat"
        value={searchData}
        type="text"
        change={e => setSearchData(e.target.value)}
        placeholder="Найти"
        required
      />
      {users
        .filter(
          user =>
            user.name.toLowerCase().includes(searchData.toLowerCase()) ||
            user.id.slice(0, 6).toLowerCase().includes(searchData.toLowerCase()),
        )
        .map(user => (
          <div key={user.id} className="chat-info__user">
            <div className="chat-info__img-container">
              <img src={icons[user.avatar]} alt={`Аватар пользователя ${user.name}`} />
            </div>
            <span className="chat-info__name">{user.name}</span>
            {userId === chat.admin && userId !== user.id && (
              <IconButton
                icon="delete"
                click={() => {
                  deleteUserById(chat.id, user.id);
                }}
              />
            )}
          </div>
        ))}
    </article>
  );
};

export default ChatInfo;
