import { InputChat } from '../Input';
import './chatinput.scss';

const ChatInput = ({
  leftElement,
  rightElement,
  id,
  name,
  value,
  type,
  change,
  min,
  placeholder,
  required,
  disabled,
}: InputChat) => {
  return (
    <>
      <div className="chat-input">
        {leftElement}
        <input
          id={id}
          name={name}
          value={value}
          type={type}
          min={min}
          placeholder={placeholder}
          required={required}
          onChange={change}
          disabled={disabled}
          className="chat-input__place"
        />
        {rightElement}
      </div>
    </>
  );
};

export default ChatInput;
