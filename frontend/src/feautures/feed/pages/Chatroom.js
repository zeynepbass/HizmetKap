
"use client";

import { Button } from "@/shared/components/atoms";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { ChatScore } from "../components/ChatScore";
import { useChatroom } from "../hooks/useChatRoom";

export default function Chatroom({ id }) {
  const {
    filteredData,
    messages,
    selectedUser,
    newMessage,
    open,

    setNewMessage,
    setOpen,

    handleSelectUser,
    handleSend,

    isLoading,
    isSending,
  } = useChatroom(id);

  if (isLoading) {
    return (
      <p className="text-center font-bold text-gray-600">
        Yükleniyor...
      </p>
    );
  }

  return (
    <div className="flex h-[90vh] bg-gray-100">


      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center text-[rgb(237,203,206)] pt-5">
          Kullanıcılar
        </h2>

        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                handleSelectUser(item._id)
              }
              className="cursor-pointer pl-10 text-gray-600 font-bold mb-2 flex justify-around p-2 rounded"
            >
              {`${item.ad.charAt(0).toUpperCase()}${item.ad.slice(1)} ${
                item.soyad.charAt(0).toUpperCase()
              }${item.soyad.slice(1)}`}

              <PersonRemoveIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-100 transition duration-300 ease-in-out"
              />

              {open && (
                <ChatScore
                  kullaniciId={item._id}
                  gonderenId={id}
                  setOpen={setOpen}
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center">
            Kullanıcı bulunamadı
          </p>
        )}
      </div>


      <div className="flex-1 flex flex-col p-4 bg-gray-50">

        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-400 flex justify-center">
              Henüz mesaj yok
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-2 ${
                  msg.gonderenId === id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.gonderenId === id
                      ? "bg-[rgb(255,176,73)] text-[rgb(242,247,250)]"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {msg.text}

                  <div
                    className={`text-xs ${
                      msg.gonderenId === id
                        ? "text-right"
                        : "text-left"
                    } opacity-50 mt-1`}
                  >
                    {new Date(
                      msg.time
                    ).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        <div className="p-4 bg-gray-50 rounded-xl shadow-md">
          <form
            onSubmit={handleSend}
            className="flex gap-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) =>
                setNewMessage(e.target.value)
              }
              placeholder="Mesaj yazın..."
              className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />

            <Button
              type="submit"
              disabled={isSending}
              className="w-28 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-200"
            >
              {isSending ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}

