import Icon from '../Icon/Icon';
import styles from './IconButton.module.css';

export default function IconButton({ label, icon, active = false, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={[styles.btn, active && styles.isActive].filter(Boolean).join(' ')}
    >
      <Icon name={icon} size={18} />
    </button>
  );
}
