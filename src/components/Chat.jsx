import { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import styles from '../styles/Chatbot.module.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const botMsg = {
        sender: 'bot',
        text: 'Error al conectarse con el chat.',
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.chatButton}>
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>🤖 Chat conmigo</div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.sender === 'user' ? styles.messageUser : styles.messageBot
                }
              >
                <p
                  className={
                    msg.sender === 'user' ? styles.bubbleUser : styles.bubbleBot
                  }
                >
                  {msg.text}
                </p>
              </div>
            ))}
            {loading && <p className={styles.loading}>Escribiendo...</p>}
          </div>
          <div className={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.input}
              placeholder="Preguntame algo..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
