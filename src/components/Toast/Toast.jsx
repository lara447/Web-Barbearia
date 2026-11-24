import { useApp } from '../../store/useApp';
import styles from './Toast.module.css';

export default function Toast() {
  const { state } = useApp();
  if (!state.toast) return null;

  return (
    <div role="status" className={styles.toast}>
      {state.toast}
    </div>
  );
}
