// pages/index.js
"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:3001');

const IndexPage = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
      // Listen for updates on online users
      socket.on('updateOnlineUsers', (users) => {
        setOnlineUsers(users);
      });
  
      // Clean up event listener when component unmounts
      return () => {
        socket.off('updateOnlineUsers');
      };
    }, []);

  return (
    <div>
      <h1>Online Users</h1>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
