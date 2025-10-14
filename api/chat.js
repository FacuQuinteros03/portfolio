// chat.js
import { GoogleGenAI } from '@google/genai';

// CAMBIO CLAVE: Obtener la clave de entorno y pasarla explícitamente
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Inicializa el cliente de la API
// Si la clave no está disponible, esto fallará, lo cual es lo que queremos detectar.
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY, // PASAR LA CLAVE DE FORMA EXPLÍCITA
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ANTES DE INTENTAR USAR LA API: Verificar si la clave existe.
  if (!GEMINI_API_KEY) {
    console.error(
      'ERROR CRÍTICO: La variable GEMINI_API_KEY no se encontró en el entorno.'
    );
    return res
      .status(500)
      .json({
        error: 'Error interno: La clave de la API no está configurada.',
      });
  }

  const { message } = req.body;

  try {
    // ... (el resto del código sigue igual)

    // 1. Iniciar un chat con la configuración del sistema
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      // ...
    });

    // 2. Enviar el mensaje del usuario
    const response = await chat.sendMessage({
      message: message,
    });

    // ...

    const botReply = response.text || 'No hay respuesta del modelo.';
    res.status(200).json({ reply: botReply });
  } catch (error) {
    // Esta línea es crucial para ver el error real
    console.error(
      'Error al conectarse con la API de Gemini:',
      error.message || error
    );
    res.status(500).json({ error: 'Error al conectarse con Google Gemini' });
  }
}
