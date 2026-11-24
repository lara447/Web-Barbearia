import styles from './Input.module.css';

export default function Input({ id, label, ...rest }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.control} {...rest} />
    </div>
  );
}

export function Select({ id, label, children, ...rest }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={styles.control} {...rest}>
        {children}
      </select>
    </div>
  );
}

export function Checkbox({ id, label, ...rest }) {
  return (
    <label htmlFor={id} className={styles.checkboxRow}>
      <input id={id} type="checkbox" className={styles.checkbox} {...rest} />
      <span>{label}</span>
    </label>
  );
}
