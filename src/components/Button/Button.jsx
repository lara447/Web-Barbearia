import styles from './Button.module.css';

export default function Button({ variant = 'primary', size = 'md', children, ...rest }) {
  const cls = [styles.button, styles[variant], size === 'sm' && styles.sm]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
