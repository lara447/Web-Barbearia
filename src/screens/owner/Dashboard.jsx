import { useApp } from '../../store/useApp';
import { brl, formatDate } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import styles from './Owner.module.css';

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const pending = state.appointments.filter((a) => a.status === 'Pendente');
  const confirmed = state.appointments.filter((a) => a.status === 'Confirmado');

  const totalConfirmed = confirmed.reduce((sum, a) => {
    const srv = state.services.find((s) => s.key === a.serviceKey);
    return sum + (srv?.price || 0);
  }, 0);

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.title}>The Barber · Painel</h1>

        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiValue}>{state.appointments.length}</div>
            <div className={styles.kpiLabel}>Agendamentos</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiValue}>{pending.length}</div>
            <div className={styles.kpiLabel}>Pendentes</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiValue}>{brl(totalConfirmed)}</div>
            <div className={styles.kpiLabel}>Confirmado</div>
          </div>
        </div>

        <section className={styles.stack}>
          <h2>Pendentes para resolver</h2>
          {pending.length === 0 ? (
            <p className={styles.meta}>Nenhuma solicitação pendente.</p>
          ) : (
            pending.map((appt) => {
              const srv = state.services.find((s) => s.key === appt.serviceKey);
              return (
                <div key={appt.id} className={styles.card}>
                  <div className={styles.rowBetween}>
                    <strong>{appt.client}</strong>
                    <Badge status={appt.status} />
                  </div>
                  <p className={styles.meta}>
                    {srv?.name} · {formatDate(appt.date)} às {appt.time} ({brl(srv?.price)})
                  </p>
                  <div className={styles.rowBetween}>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_APPOINTMENT_STATUS',
                          payload: { id: appt.id, status: 'Confirmado', toast: 'Confirmado!' },
                        })
                      }
                    >
                      Confirmar
                    </Button>
                    <Button
                      size="sm"
                      variant="line"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_APPOINTMENT_STATUS',
                          payload: { id: appt.id, status: 'Cancelado', toast: 'Recusado' },
                        })
                      }
                    >
                      Recusar
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
