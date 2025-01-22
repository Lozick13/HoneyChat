import { icons } from '../../api/icons';
import { useAppDispatch } from '../../hooks';
import { setAvatarRequest } from '../../redux/slices/userSlice';
import ImgButton from '../../UI/buttons/ImgButton/ImgButton';
import './avatarselection.scss';

const AvatarSelection = ({ click }: { click: () => void }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="avatar-selection">
        {icons.map((avatar, index) => (
          <ImgButton
            click={() => {
              dispatch(setAvatarRequest(index));
              click();
            }}
            key={index}
            img={avatar}
            color="#fff6ba"
          />
        ))}
      </div>
    </>
  );
};

export default AvatarSelection;
