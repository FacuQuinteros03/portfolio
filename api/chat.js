// /pages/api/chat.js (VERSIÓN FINAL Y COMPATIBLE)

import { GoogleGenAI } from '@google/genai'; // ✅ SDK INSTALADO

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Leer la clave de forma segura
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res
      .status(500)
      .json({ error: 'Clave API no configurada en Vercel.' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No se envió ningún mensaje.' });
  }

  try {
    // 1. Inicialización del cliente
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // 2. Definición de la instrucción del sistema
    const systemInstruction =
      'Sos un asistente amigable del portfolio de Facundo. Responde de manera concisa y útil.';

    // NOTA: ELIMINAMOS EL HISTORIAL GLOBAL por ser inseguro en Vercel.
    // Ahora, cada solicitud es una pregunta nueva.

    // 3. Llamada al método de generación de contenido (el equivalente a 'getGenerativeModel' + 'generateContent')
    const result = await genAI.generateContent({
      model: 'gemini-2.5-flash', // Modelo a usar
      contents: [{ role: 'user', parts: [{ text: message }] }], // Mensaje de usuario
      config: {
        systemInstruction: systemInstruction, // Instrucción del sistema
      },
    });

    // 4. Obtener la respuesta (la sintaxis es simple con el nuevo SDK)
    const botReply = result.text || 'No hay respuesta del modelo.';

    res.status(200).json({ reply: botReply });
  } catch (error) {
    // Si la clave es inválida, este error se capturará aquí y devolverá JSON.
    console.error('Error FATAL de la API de Gemini:', error.message || error);
    res
      .status(500)
      .json({
        error: `Error de la API de Gemini: ${
          error.message || 'Error desconocido'
        }`,
      });
  }
}
