export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Sos un asistente amigable del portfolio de Facundo.',
          },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();
    const botReply =
      data?.choices?.[0]?.message?.content || 'No hay respuesta del modelo.';
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectarse con OpenAI' });
  }
}
