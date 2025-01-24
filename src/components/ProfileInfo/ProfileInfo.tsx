import { useEffect, useState } from 'react';
import { icons } from '../../api/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { avatarRequest } from '../../redux/slices/userSlice';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import AvatarSelection from '../AvatarSelection/AvatarSelection';
import './profileinfo.scss';

const ProfileInfo = () => {
  const { avatar, name, email } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [avatarsOpen, setAvatarsOpen] = useState<boolean>(false);

  // avatar request
  useEffect(() => {
    dispatch(avatarRequest());
  }, [dispatch]);

  return (
    <>
      <section className="profile-info">
        <h2 className="profile-info__title">Профиль</h2>

        {!avatarsOpen && (
          <div className="profile-info__body">
            <div className="profile-info__img-container">
              <img src={icons[avatar]} />
            </div>
            <div className="profile-info__text">
              <h3 className="profile-info__name">{name}</h3>
              <p className="profile-info__status">
                Email: <b>{email}</b>
              </p>
            </div>
          </div>
        )}

        {avatarsOpen && <AvatarSelection click={() => setAvatarsOpen(!avatarsOpen)} />}
        <BaseButton
          text={avatarsOpen ? 'В профиль' : 'Изменить аватарку'}
          click={() => setAvatarsOpen(!avatarsOpen)}
        />
      </section>
    </>
  );
};

export default ProfileInfo;
