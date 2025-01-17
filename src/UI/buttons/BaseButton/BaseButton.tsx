import { ButtonBase } from '../Button';
import './basebutton.scss';

const BaseButton = ({ click, text, secondary }: ButtonBase) => {
  return (
    <>
      <button
        onClick={click}
        className={`base-button${secondary ? ' base-button_secondary' : ''}`}
      >
        {text}
      </button>
    </>
  );
};

export default BaseButton;ß
