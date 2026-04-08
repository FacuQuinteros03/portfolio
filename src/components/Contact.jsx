import { useState, useEffect } from 'react';
import styles from '../styles/Contact.module.css';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Limpiar mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - top}px`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validación: No números en nombre, solo números y + en teléfono
    const cleanedValue =
      name === 'name'
        ? value.replace(/[0-9]/g, '')
        : name === 'phone'
          ? value.replace(/[^0-9+]/g, '')
          : value;

    setForm((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg('Por favor, completá los campos obligatorios.');
      return;
    }

    setStatus('sending');

    try {
      // MAPEAMOS LAS VARIABLES PARA QUE COINCIDAN CON TU TEMPLATE DE EMAILJS
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: form.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error en EmailJS:', err);
      setStatus('error');
      setErrorMsg('Hubo un problema. ¿Me contactás por LinkedIn?');
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container} onMouseMove={handleMouseMove}>
        <div className={styles.header}>
          <h2 className={styles.title}>¿Tenés un proyecto?</h2>
          <p className={styles.subtitle}>
            Hablemos sobre cómo puedo ayudarte con software y datos.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nombre</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej. Facundo Q."
                required
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Teléfono (Opcional)</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+54 341..."
            />
          </div>

          <div className={styles.field}>
            <label>Mensaje</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Contame sobre tu idea o consulta..."
              required
            />
          </div>

          <div className={styles.footer}>
            {errorMsg && <p className={styles.error}>{errorMsg}</p>}
            {status === 'success' && (
              <p className={styles.success}>
                ¡Mensaje enviado con éxito! Te responderé pronto.
              </p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={status === 'sending'}
            >
              <span className={styles.btnText}>
                {status === 'sending' ? 'Enviando...' : 'Enviar Propuesta'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
