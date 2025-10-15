// /pages/api/chat.js

// Usamos el SDK correcto, que tienes instalado en package.json
import { GoogleGenAI } from '@google/genai';

// Historial en memoria temporal (NOTA: ¡Esto es inseguro para producción multiusuario!)
let chatHistory = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Leer la clave de forma correcta y segura
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error('ERROR: No se encontró GEMINI_API_KEY en el entorno.');
    return res
      .status(500)
      .json({ error: 'Clave API no configurada. (Verifica Vercel ENV)' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No se envió ningún mensaje.' });
  }

  try {
    // 1. Inicialización con el constructor correcto
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Usaremos gemini-2.5-flash ya que gemini-1.5-flash no está siempre disponible
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 2. Establecer el rol del sistema (IMPORTANTE para darle contexto)
    const systemInstruction =
      'Sos un asistente amigable del portfolio de Facundo. Responde de manera concisa y útil.';

    // 3. Agregar el mensaje del usuario al historial para la solicitud
    const contents = [
      ...chatHistory, // Historial previo
      { role: 'user', parts: [{ text: message }] }, // Mensaje actual
    ];

    // 4. Enviar el mensaje con el historial y la instrucción del sistema
    const result = await model.generateContent({
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    // 5. Obtener la respuesta
    const botReply = result.text || 'No hay respuesta del modelo.';

    // 6. Actualizar el historial GLOBAL (con las advertencias de seguridad)
    chatHistory.push({ role: 'user', parts: [{ text: message }] });
    chatHistory.push({ role: 'model', parts: [{ text: botReply }] });

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error al conectarse con Gemini:', error.message || error);
    // Devolvemos el mensaje de error explícito para depurar en el frontend
    res
      .status(500)
      .json({
        error: `Error de la API de Gemini: ${
          error.message || 'Error desconocido'
        }`,
      });
  }
}
