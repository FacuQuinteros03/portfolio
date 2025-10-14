// chat.js
import { GoogleGenAI } from '@google/genai';

// Inicializa el cliente de la API con tu clave de entorno
// Asegúrate de que tu clave esté guardada en una variable de entorno llamada GEMINI_API_KEY
// por ejemplo: process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Método no permitido
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    // 1. Iniciar un chat con la configuración del sistema
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash', // Un modelo rápido y eficiente para chat
      config: {
        systemInstruction:
          'Sos un asistente amigable del portfolio de Facundo. Responde de manera concisa y útil.',
      },
    });

    // 2. Enviar el mensaje del usuario y obtener la respuesta
    const response = await chat.sendMessage({
      message: message,
    });

    // 3. Acceder a la respuesta
    const botReply = response.text || 'No hay respuesta del modelo.';

    // 4. Enviar la respuesta al cliente
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error al conectarse con la API de Gemini:', error);
    // Cambiar el mensaje de error para reflejar que es un problema con Gemini
    res.status(500).json({ error: 'Error al conectarse con Google Gemini' });
  }
}
