import React, { useState } from "react";
// import Avatar from '@mui/material/Avatar';
import './Chat-Screen.css';

function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      name: 'bro',
      image: 'https://static.wikia.nocookie.net/gametoons-among-us/images/d/da/RBBro.jpeg/revision/latest?cb=20210520145438',
      message: "I love you bro ;)"
    },
    {
      message: "love you too bro"
    }
  ]);

  const handleSend = e => {
    e.preventDefault();

    setMessages([...messages, { message: input }]);
    setInput('');
  }

  return (
    <div className="chatScreen">
      <p className="chatScreen_timestamp"> YOU MATCHED WITH BRO ON 09/03/2006 </p>
      {messages.map(message => (
        message.name ? (
          <div className="chatScreen_message">
            {/* <Avatar
              className="ChatScreen_image"
              alt={message.name}
              src={message.image}
            /> */}
            <p className="chatScreen_text">{message.message}</p>
          </div>
        ) : (
          <div className="chatScreen_message">
            <p className="chatScreen_textUser">{message.message}</p>
          </div>
        )
      ))}

      <form className="chatScreen_input">
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="chatScreen_inputField"
        placeholder="Type a message..."
        type="text" />
      <button onClick={handleSend} type="submit" className="chatScreen_inputButton">SEND</button>
      </form>
    </div>
  );
}

export default ChatScreen;