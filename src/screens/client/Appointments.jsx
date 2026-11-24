import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { brl, formatDate } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import styles from './Client.module.css';

export default function Appointments() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.sectionTitle}>Meus Agendamentos</h1>

        <div className={styles.stack}>
          {state.appointments.map((appt) => {
            const shop = state.shops.find((s) => s.id === appt.shopId) || state.shops[0];
            const srv = state.services.find((s) => s.key === appt.serviceKey);
            const barber = state.barbers.find((b) => b.id === appt.barberId);

            return (
              <article key={appt.id} className={styles.listCard}>
                <div className={styles.listBody}>
                  <div className={styles.rowBetween}>
                    <h2 className={styles.cardTitle}>{shop.name}</h2>
                    <Badge status={appt.status} />
                  </div>
                  <p className={styles.meta}>
                    {srv?.name} · {barber?.name} · {formatDate(appt.date)} • {appt.time} ({brl(srv?.price)})
                  </p>
                  <div className={styles.rowBetween}>
                    {appt.status !== 'Cancelado' && (
                      <Button
                        size="sm"
                        variant="line"
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_APPOINTMENT_STATUS',
                            payload: { id: appt.id, status: 'Cancelado', toast: 'Agendamento cancelado' },
                          })
                        }
                      >
                        Cancelar
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/barbearia/${shop.id}`)}>
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
