"use client";
import {useState } from "react";
import { Rating, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import {Button}from "@/shared/components/atoms"
import {scoreUpdated,MessageDelete} from "@/services/api"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Degerlendirme = ({ kullaniciId, setOpen,gonderenId,setMessages,setUserList }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (rating === 0) return alert("Lütfen bir yıldız seçin");

    try {
      const response = await scoreUpdated(kullaniciId, rating, comment);
  
      if (!response) throw new Error("API'den cevap alınamadı");
  


    toast.success("Değerlendirme başarıyla kaydedildi!", { position: "top-right", autoClose: 3000 })
      if (setOpen) setOpen(false);
      router.back();
    } catch (err) {
      console.error("Değerlendirme gönderilemedi:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };
  const handleDelete = async (gonderenId, kullaniciId) => {
   
    try {
      const res = await MessageDelete(gonderenId, kullaniciId);
      if (res) {

        
        setMessages([]);
        setUserList("");
        router.push("/ana-sayfa");
      } else {
        console.error("Mesaj silinemedi");
      }
    } catch (error) {
      console.error("Mesaj silme hatası:", error);
    }
  };


  return (
    <div className="fixed inset-0 bg-[rgb(242,247,250)] bg-opacity-40 flex items-center justify-center z-50">
          <ToastContainer />
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Hizmeti Değerlendir
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Birkaç soruya daha cevap vererek kullanıcıyı değerlendirebilirsin.
        </p>

        <Box className="text-center">
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="İstersen yorum yazabilirsin..."
            className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
            rows={3}
          />

          <Button
            onClick={handleSubmit}
            className="
            w-[50%]
            rounded-[2rem]
            mx-auto
            p-1.5
            bg-[rgb(78,36,77)]
            text-[rgb(242,247,250)]
            hover:bg-[rgb(255,127,60)]
            hover:text-[#f2f7fa]
            mt-2
          "
          >
            Gönder
          </Button>
          <div className="flex gap-3 mb-4">
          <Button
        onClick={() => handleDelete(gonderenId, kullaniciId)}
        type="button"
        className="flex-1 py-2 bg-gradient-to-r mt-2 from-pink-400 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-white font-semibold rounded-xl shadow-md transition-transform duration-200 transform hover:scale-105"
      >
        Sohbeti Sil
</Button>
          
                </div>{" "}

        </Box>
        <Button
        onClick={() => router.back()}
        className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-gray-700 transition-all"
     
  type="button"

>
✕
</Button>

      </div>
    </div>
  );
};

export default Degerlendirme;
