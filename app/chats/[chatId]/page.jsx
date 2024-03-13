"use client"

import ChatDetails from "../../../components/chat/ChatDetails"
import ChatList from "../../../components/chat/ChatList"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "../../../contexts/AuthProvider"
import TopBar from"../../../components/chat/TopBar"

const ChatPage = () => {
  const { chatId } = useParams()

    const { user, logout } = useAuth();
  const currentUser = user;

  const seenMessages = async () => {
    try {
      await fetch (`/api/chats/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentUserId: currentUser._id
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (currentUser && chatId) seenMessages()
  }, [currentUser, chatId])

  return ( 
    <>
    <TopBar />
    <div className="main-container">
     
      <div className="w-1/3 max-lg:hidden"><ChatList currentChatId={chatId}/></div>
      <div className="w-2/3 max-lg:w-full"><ChatDetails chatId={chatId}/></div>
    </div>
    </>
  )
}

export default ChatPage