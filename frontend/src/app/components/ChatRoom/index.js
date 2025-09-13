"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5233";
const socket = io(baseUrl);

const ChatUI = ({ id }) => {
  const aliciIdStored = `${id}`;
  const [storedData, setStoredData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const localId = storedData?.kullanici?.id; 
  const gonderenId = localId;


  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        selectedUser &&
        ((msg.gonderenId === gonderenId && msg.aliciId === selectedUser) ||
          (msg.gonderenId === selectedUser && msg.aliciId === gonderenId))
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser, gonderenId]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/kullanicilar`);
        setUserList(res.data.kullanicilar);

      } catch (error) {
        console.error("Kullanıcı çekme hatası:", error);
      }
    };

    const fetchKonusmalar = async () => {
      try {
        const res = await axios.get(`${baseUrl}/konusmalar/${aliciIdStored}`);
        setData(res.data);
        
      } catch (error) {
        console.error("Mesaj çekme hatası:", error);
      }
    };
    fetchUsers();
    fetchKonusmalar();

    const stored = JSON.parse(localStorage.getItem("kullanici"));
    setStoredData(stored);
  }, [aliciIdStored]);

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(`${baseUrl}/mesajlar/${gonderenId}/${userId}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Mesaj çekme hatası:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage || !selectedUser) return;

    const msgData = {
      gonderenId,
      aliciId: selectedUser,
      text: newMessage,
      time: new Date(),
    };

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
  const filteredData = userList.filter(user =>
    user._id !== gonderenId &&
    data.some(kon =>
      (kon.gonderenId === user._id && kon.aliciId === gonderenId) ||
      (kon.aliciId === user._id && kon.gonderenId === gonderenId)
    )
  );
  

  return (
    <div className="flex h-[82vh] bg-gray-100">
     
      <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Kullanıcılar</h2>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                setSelectedUser(item._id);
                fetchMessages(item._id);
              }}
              className="cursor-pointer mb-2 hover:bg-gray-100 p-2 rounded"
            >
              {item.email}
              {`${item.ad.charAt(0).toUpperCase() + item.ad.slice(1)} ${item.soyad.charAt(0).toUpperCase() + item.soyad.slice(1)}`}
            </div>
          ))
        ) : (
          <p>Kullanıcı bulunamadı</p>
        )}
      </div>


      <div className="flex-1 flex flex-col p-4 bg-gray-50">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500">Henüz mesaj yok</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-2 ${msg.gonderenId === gonderenId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.gonderenId === gonderenId
                      ? "bg-[rgb(255,190,60)] text-white"
                      : "bg-gray-200 text-gray-900"
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
            className="flex-1 border border-amber-500 rounded px-3 py-2 focus:outline-none"
            placeholder="Mesaj yazın..."
          />
          <button
            type="submit"
            className="bg-[rgb(255,127,58)] cursor-pointer text-white px-4 py-2 rounded"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
