"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  fetchUsersGet,
  fetchKonusmalarGet,
  fetchMessagesGet,
  sendMessage
} from "../../services/api";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Score from "../../components/Score";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5233";
const socket = io(baseUrl);

const ChatUI = ({ id }) => {
  const aliciIdStored = `${id}`;
  const [storedData, setStoredData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [open, setOpen] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const localId = storedData?.kullanici.id;
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
        const res = await fetchUsersGet();
        setUserList(res);
      } catch (error) {
        console.error("Kullanıcı çekme hatası:", error);
      }
    };

    const fetchKonusmalar = async () => {
      try {
        const res = await fetchKonusmalarGet(aliciIdStored);
        setData(res);
      } catch (error) {
        console.error("Mesaj çekme hatası:", error);
      }
    };
    fetchUsers();
    fetchKonusmalar();

    const stored = JSON.parse(localStorage.getItem("kullanici"));
    setStoredData(stored);
  }, [aliciIdStored]);

  const fetchMessages = async (gonderenId, userId) => {
    try {
      const res = await fetchMessagesGet(gonderenId, userId);
      setMessages(res);
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
      const res = await sendMessage(msgData);
      const savedMsg = res;
      socket.emit("sendMessage", savedMsg);
      setMessages((prev) => [...prev, savedMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("Mesaj gönderme hatası:", err);
    }
  };

  const filteredData =
    (userList &&
      userList.filter((user) => {
        if (!user) return false;

        const isAlıcı = user._id === aliciIdStored;

        const hasConversation = data?.some(
          (kon) =>
            (kon.gonderenId === user._id && kon.aliciId === gonderenId) ||
            (kon.aliciId === user._id && kon.gonderenId === gonderenId)
        );

        return user._id !== gonderenId && (hasConversation || isAlıcı);
      })) ||
    [];


  return (
    <div className="flex h-[80vh] bg-gray-100">
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center text-[rgb(237,203,206)] pt-5">
          Kullanıcılar
        </h2>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
   
         
           
         
          
            <div
              key={item._id}
              onClick={() => {
                setSelectedUser(item._id);
                fetchMessages(gonderenId, item._id);
              }}
              className="cursor-pointer pl-10 text-gray-600 font-bold  mb-2 flex justify-around p-2 rounded"
            >
              {`${item.ad.charAt(0).toUpperCase() + item.ad.slice(1)} ${
                item.soyad.charAt(0).toUpperCase() + item.soyad.slice(1)
              }`}

              <PersonRemoveIcon
                onClick={() => setOpen(true)}
                className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-100 transition duration-300 ease-in-out"
              />
                   {open ? <Score  kullaniciId={item._id} gonderenId={gonderenId} setMessages={setMessages} setUserList={setUserList} /> : null}
          
            </div>
          ))
        ) : (
          <p className="text-center">Kullanıcı bulunamadı</p>
        )}
      </div>

      <div className="flex-1 flex flex-col p-4 bg-gray-50">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-400 flex justify-center">Henüz mesaj yok</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-2 ${
                  msg.gonderenId === gonderenId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.gonderenId === gonderenId
                      ? "bg-[rgb(255,176,73)] text-[rgb(242,247,250)]"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-xs ${
                      msg.gonderenId === gonderenId ? "text-right" : "text-left"
                    } opacity-50 mt-1`}
                  >
                    {new Date(msg.time).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 bg-gray-50 rounded-xl shadow-md">
      

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesaj yazın..."
              className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
            <button
              type="submit"
              className="w-28 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-200"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
