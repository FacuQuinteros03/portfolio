// /pages/api/chat.js

// Usamos el SDK correcto para Node.js
import { GoogleGenAI } from '@google/genai';

// NO uses variables globales en serverless como chatHistory
// (Si necesitas historial, debes implementarlo con cookies o DB)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // --- SECCIÓN DE VERIFICACIÓN DE CLAVE DENTRO DEL HANDLER ---
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error('ERROR CRÍTICO: Clave API no configurada.');
    // Devolvemos JSON para EVITAR el SyntaxError en el frontend
    return res
      .status(500)
      .json({ error: 'Clave API no configurada en Vercel.' });
  }
  // -----------------------------------------------------------

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No se envió ningún mensaje.' });
  }

  try {
    // 1. Inicialización POSPUESTA dentro del try/catch
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 2. Ejecutar sin historial (para simplificar la depuración)
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction:
          'Sos un asistente amigable del portfolio de Facundo. Responde de manera concisa y útil.',
      },
    });

    const botReply = result.text || 'No hay respuesta del modelo.';
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error(
      'Error al conectarse con Gemini (traza):',
      error.message || error
    );
    // 3. Devolvemos el error en JSON de forma robusta
    res
      .status(500)
      .json({
        error: `Error de la API de Gemini: ${
          error.message || 'Error desconocido'
        }`,
      });
  }
}
