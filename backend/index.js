import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import post from "./routes/index.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from "path";
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/message.js';
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/', post);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB bağlantısı kuruldu'))
.catch((err) => console.log('❌ Bağlantı hatası:', err));


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Yeni bağlantı:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const yeniMesaj = new Message(data);
      await yeniMesaj.save();

      io.emit("receiveMessage", yeniMesaj); 
      console.log("📩 Yeni mesaj:", yeniMesaj);
    } catch (err) {
      console.error("❌ Mesaj gönderme hatası:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Kullanıcı ayrıldı:", socket.id);
  });
});


const PORT = process.env.PORT || 5233;
server.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
