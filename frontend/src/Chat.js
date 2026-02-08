import { useEffect, useState } from "react";
import axios from "axios";

function Chat({ socket, username, room, leaveRoom }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`https://chat-app-8n5v.onrender.com/messages/${room}`)
      .then(res => setMessages(res.data));

    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket, room]);

     useEffect(() => {
        return () => {
        setMessages([]);
        };
    }, []);

  const sendMessage = async () => {
    const msgData = {
      room,
      author: username,
      message,
      time: new Date().toLocaleTimeString(),
    };

    await axios.post("https://chat-app-8n5v.onrender.com/messages", msgData);
    socket.emit("send_message", msgData);
    setMessages((list) => [...list, msgData]);
    setMessage("");
  };

  return (
  <div className="chat-container">

    {/* HEADER */}
    <div className="chat-header">
      <h3>Room: {room}</h3>
      <button onClick={leaveRoom} className="exit-btn">Exit</button>
    </div>

    {/* MESSAGES */}
    <div className="chat-body">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`message ${m.author === username ? "own" : ""}`}
        >
          <span className="author">{m.author}</span>
          <p>{m.message}</p>
          <span className="time">{m.time}</span>
        </div>
      ))}
    </div>

    {/* INPUT */}
    <div className="chat-footer">
      <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
      if (e.key === "Enter" && message.trim() !== "") {
        sendMessage();
        }
    }   
  }
    placeholder="Type a message..."
  />

      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
 );
}

export default Chat;
