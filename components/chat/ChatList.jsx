"use client";

import { use, useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Loader from "./Loader";
import { pusherClient } from "../../lib/pusher";
import { useAuth } from "../../contexts/AuthProvider";

const ChatList = ({ currentChatId }) => {
  const { user, logout } = useAuth();
  const userData = user;


  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const getChats = async () => {
    try {
      const res = await fetch(
        search !== ""
          ? `/api/usersChat/${userData._id}/searchChat/${search}`
          : `/api/usersChat/${userData._id}`
      );
      const data = await res.json();
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData) {
      getChats();
    }
  }, [userData, search]);

  useEffect(() => {
    if (userData) {
      pusherClient.subscribe(userData._id);

      const handleChatUpdate = (updatedChat) => {
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          })
        );
      };

      const handleNewChat = (newChat) => {
        setChats((allChats) => [...allChats, newChat]);
      }

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(userData._id);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      };
    }
  }, [userData]);

  return loading ? (
      <Loader />
  ) : (
       <div className="chat-list">
     

      <div className="chats">
         <input
        placeholder="Search chat..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br/>
        {chats?.map((chat, index) => (
          <ChatBox
            key={chat._id}
            chat={chat}
           // index={index}
            currentUser={userData}
            currentChatId={currentChatId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
