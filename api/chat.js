// /pages/api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Historial en memoria temporal (solo dura mientras el server esté activo)
let chatHistory = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GEMINI_API_KEY) {
    console.error('ERROR: No se encontró GEMINI_API_KEY en el entorno.');
    return res.status(500).json({ error: 'Clave API no configurada.' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No se envió ningún mensaje.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Agregamos el mensaje del usuario al historial
    chatHistory.push({ role: 'user', parts: [{ text: message }] });

    // Creamos el chat con historial
    const chat = model.startChat({ history: chatHistory });

    // Enviamos el mensaje y obtenemos la respuesta
    const result = await chat.sendMessage(message);
    const botReply = result.response.text();

    // Guardamos la respuesta del bot en el historial
    chatHistory.push({ role: 'model', parts: [{ text: botReply }] });

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error al conectarse con Gemini:', error);
    res.status(500).json({ error: 'Error al conectarse con Google Gemini' });
  }
}
