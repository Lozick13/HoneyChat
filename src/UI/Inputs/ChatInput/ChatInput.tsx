import { useEffect, useRef } from 'react';
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
  textarea = false,
}: InputChat) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoHeight = (elem: HTMLTextAreaElement) => {
    elem.style.height = '1px';
    elem.style.height = `${elem.scrollHeight}px`;
  };

  useEffect(() => {
    if (textarea && textAreaRef.current) {
      autoHeight(textAreaRef.current);
    }
  }, [value, textarea]);

  return (
    <>
      <div className="chat-input">
        {leftElement}

        {textarea ? (
          <textarea
            ref={textAreaRef}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={change}
            disabled={disabled}
            className="chat-input__place chat-input__place_textarea"
          />
        ) : (
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
        )}

        {rightElement}
      </div>
    </>
  );
};

export default ChatInput;
