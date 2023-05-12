import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/UserAuthContext";
import ChatSection from "./ChatParts/ChatSection";

//import "./css/Chat.css";

const ChatJS = () => {
  const [newMessage, setNewMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomNameSelected, setRoomSelector] = useState(false);
  const messageRef = collection(db, "messages");
  const { user } = UserAuth();

  useEffect(() => {
    console.log(roomNameSelected);
    const queryMessages = query(
      messageRef,
      where("room", "==", roomName),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((messages) => [
            ...messages,
            { ...change.doc.data(), id: change.doc.id },
          ]);
        }
      });
    });
    console.log(messages);
    return unsubscribe;
  }, [roomName]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.email,
      room: roomName,
    });
    setNewMessage("");
  };

  const handleRoomSumbit = (e) => {
    e.preventDefault();
    if (roomName === "") return;
    setRoomSelector(true);
  };

  return (
    <div className="chat-app">
      <ChatSection />
      <div>
        {messages.map((message) => {
          return <p key={message.id}>{message.text}</p>;
        })}
      </div>
      {roomNameSelected ? (
        <div>{roomName}</div>
      ) : (
        <>
          <form onSubmit={handleRoomSumbit} className="new-message-form">
            <input
              className="new-message-input"
              placeholder="Enter Room Name"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </>
      )}
      <form onSubmit={handleSumbit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatJS;
