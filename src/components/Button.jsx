import styles from '../styles/Button.module.css';

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled,
  href,
}) {
  if (href) {
    return (
      <a href={href} className={styles.button}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
