import { useState } from 'react';
import styles from '../styles/Contact.module.css';
import Button from './Button';
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Bloquear números en el nombre directamente
    if (name === 'name') {
      setForm((f) => ({ ...f, [name]: value.replace(/[0-9]/g, '') }));
    } else if (name === 'phone') {
      // Bloquear todo lo que no sea número en el teléfono
      setForm((f) => ({ ...f, [name]: value.replace(/[^0-9]/g, '') }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setErrorMsg('Por favor completá los campos faltantes.');
      return;
    }

    if (!nameRegex.test(form.name.trim())) {
      setErrorMsg(
        'El nombre no puede contener números ni caracteres especiales.'
      );
      return;
    }

    if (!emailRegex.test(form.email.trim())) {
      setErrorMsg('El email no tiene un formato válido.');
      return;
    }

    if (!phoneRegex.test(form.phone.trim())) {
      setErrorMsg('El teléfono debe contener solo números.');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('No se pudo enviar el mensaje. Intentá de nuevo más tarde.');
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>Contacto</h2>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label} htmlFor="name">
            Nombre y Apellido
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Roberto Gómez"
            required
          />

          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="tu@email.com"
            required
          />

          <label className={styles.label} htmlFor="phone">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder="+54 9 11 1234 5678"
            required
          />

          <label className={styles.label} htmlFor="message">
            Mensaje (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Contame brevemente de tu proyecto..."
            rows={4}
          />

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}

          <div className={styles.actions}>
            <Button
              type="submit"
              disabled={status === 'sending'}
              animated={false}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar'}
            </Button>

            {status === 'success' && (
              <span className={styles.success}>Mensaje enviado. ¡Gracias!</span>
            )}
            {status === 'error' && (
              <span className={styles.error}>
                Ocurrió un error. Intentá de nuevo.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
