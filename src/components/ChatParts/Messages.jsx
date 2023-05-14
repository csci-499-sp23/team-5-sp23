import { Avatar, Tooltip } from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../../context/UserAuthContext";

const Messages = (props) => {
  const [showTime, setShowTime] = useState(false);
  const [data, setData] = useState(props.data);
  const { user } = UserAuth();
  const userRole = data.sender.email === user.email ? "person2" : "person1";
  setData(props.data);
  const handleMouseEnter = () => {
    setShowTime(true);
  };

  const handleMouseLeave = () => {
    setShowTime(false);
  };
  const chatMessageStyles = {
    container: {
      display: "flex",
      alignItems: "flex-start",
      margin: "8px",
      backgroundColor: userRole === "person1" ? "#1AEEE1" : "#6e7977",
      borderRadius: "10px",
      width: "fit-content",
      padding: "8px",
      cursor: "default",
    },
    avatar: {
      marginRight: "8px",
    },
    content: {
      flex: "1",
    },
    time: {
      marginLeft: "8px",
      opacity: showTime ? 1 : 0,
      transition: "opacity 0.3s",
    },
  };

  return (
    <div
      style={chatMessageStyles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar style={chatMessageStyles.avatar} src={data.sender.avatar} />
      <div style={chatMessageStyles.content}>
        {data.text}
        <Tooltip title={data.time} placement="right">
          <span style={chatMessageStyles.time}>{data.time}</span>
        </Tooltip>
      </div>
    </div>
  );
};

export default Messages;
