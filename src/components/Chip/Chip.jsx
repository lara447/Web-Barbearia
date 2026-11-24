import Icon from '../Icon/Icon';
import styles from './Chip.module.css';

export default function Chip({ icon, active = false, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[styles.chip, active && styles.isActive].filter(Boolean).join(' ')}
    >
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} size={14} />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
