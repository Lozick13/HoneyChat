import ImgButton from '../../UI/buttons/ImgButton/ImgButton';
import './header.scss';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__block">
          <div className="header__logo">
            <img src="./assets/honey-icon.png" alt="logo" />
            <h1 className="header__title">HoneyChat</h1>
          </div>
          <ImgButton
            click={() => {}}
            color="#D68D17"
            text="Чаты"
            img="./assets/chats.svg"
          />
        </div>

        <div className="header__block">
          <ImgButton
            click={() => {}}
            color="#D68D17"
            text="Профиль"
            img="./assets/profile.svg"
          />
          <ImgButton
            click={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
            color="#D68D17"
            img="./assets/log-out.svg"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
