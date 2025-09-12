import Message from '../models/message.js';
import mongoose from 'mongoose';
export const getMessage = async (req, res) => {
  const { gonderenId, aliciId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { gonderenId, aliciId },
        { gonderenId: aliciId, aliciId: gonderenId }
      ]
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteMessagesBetweenUsers = async (req, res) => {
  const { gonderenId, aliciId } = req.params;
  try {
    await Message.deleteMany({
      $or: [
        { gonderenId, aliciId },
        { gonderenId: aliciId, aliciId: gonderenId }
      ]
    });

    res.status(200).json({ message: "Mesajlar başarıyla silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const postMessage = async (req, res) => {
  const { gonderenId, aliciId, text, time } = req.body;

  if (!gonderenId || !aliciId || !text) {
    return res.status(400).json({ error: "Gerekli alanlar eksik" });
  }

  try {
    const yeniMesaj = new Message({
      gonderenId,
      aliciId,
      text,
      time: time ? new Date(time) : new Date(),
    });

    await yeniMesaj.save();
    res.status(201).json(yeniMesaj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const objectUserId = new mongoose.Types.ObjectId(userId); 

    const messages = await Message.find({
      $or: [
        { gonderenId: objectUserId },
        { aliciId: objectUserId }
      ]
    }).sort({ createdAt: -1 });

    const conversations = {};
    messages.forEach(msg => {
      const otherUser = msg.gonderenId.toString() === userId ? msg.aliciId.toString() : msg.gonderenId.toString();
      conversations[otherUser] = msg;
    });

    res.json(Object.values(conversations));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};