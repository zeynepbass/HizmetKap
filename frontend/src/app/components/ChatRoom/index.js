"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5233";


const socket = io(baseUrl);

const ChatUI = ({ id }) => {
  const storedData =JSON.parse(localStorage.getItem("kullanici"))
 
  const gonderenId = storedData?.kullanici.id;

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        selectedUser &&
        (msg.gonderenId === gonderenId && msg.aliciId === selectedUser._id) ||
        (msg.gonderenId === selectedUser._id && msg.aliciId === gonderenId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser, gonderenId]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/kullanici/${id}`);
        setUserList(res.data);
      } catch (error) {
        console.error("Kullanıcı çekme hatası:", error);
      }
    };
    fetchUsers();
  }, []);


  const fetchMessages = async (user) => {
    try {
      const res = await axios.get(
        `${baseUrl}/mesajlar/${gonderenId}/${user}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Mesaj çekme hatası:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const msgData = {
      gonderenId,
      aliciId: selectedUser,
      text: newMessage,
      time: new Date(),
    };
console.log(msgData)
    try {
      const res = await axios.post(`${baseUrl}/mesajlar`, msgData);
      const savedMsg = res.data;

      socket.emit("sendMessage", savedMsg);

      setMessages((prev) => [...prev, savedMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("Mesaj gönderme hatası:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Kullanıcılar</h2>

          <div
            key={userList._id}
            onClick={() => {
              setSelectedUser(userList._id);
              fetchMessages(userList._id);
            }}
    
          >
            {userList.ad} {userList.soyad}
          </div>

      </div>


      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500">Henüz mesaj yok</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-2 ${
                  msg.gonderenId === gonderenId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.gonderenId === gonderenId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-900"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs opacity-50 mt-1">
                    {new Date(msg.time).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none"
            placeholder="Mesaj yazın..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
