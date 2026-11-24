import Icon from '../Icon/Icon';
import styles from './Thumb.module.css';

export default function Thumb() {
  return (
    <div className={styles.thumb} aria-hidden="true">
      <Icon name="scissors" size={26} />
    </div>
  );
}
