import { useState } from "react";
import Chat from "./Chat";
import { socket } from "./socket";
import "./App.css";


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leave_room", room);
    setShowChat(false);
    setRoom("");
  };

  return (
    <div>
      {!showChat ? (
  <div className="join-container">
    <div className="join-card">
      <h2> Join Chat Room</h2>

      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter room ID"
        onChange={(e) => setRoom(e.target.value)}
      />

      <button onClick={joinRoom}>Join Room</button>
    </div>
  </div>
) : (
  <Chat
    socket={socket}
    username={username}
    room={room}
    leaveRoom={leaveRoom}
  />
)}

    </div>
  );
}

export default App;
