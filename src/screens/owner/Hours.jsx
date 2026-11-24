import { useApp } from '../../store/useApp';
import { ALL_HOURS } from '../../utils/constants';
import TopBar from '../../components/layout/TopBar/TopBar';
import styles from './Owner.module.css';

export default function Hours() {
  const { state, dispatch } = useApp();

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.title}>Horários de Atendimento</h1>

        <div className={styles.stack}>
          {ALL_HOURS.map((hour) => {
            const on = state.enabledHours.includes(hour);
            return (
              <div key={hour} className={styles.card}>
                <div className={styles.rowBetween}>
                  <strong>{hour}</strong>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`Alternar ${hour}`}
                    onClick={() => dispatch({ type: 'TOGGLE_HOUR', payload: hour })}
                    className={[styles.toggle, on && styles.toggleOn].filter(Boolean).join(' ')}
                  >
                    <span className={styles.thumb} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
