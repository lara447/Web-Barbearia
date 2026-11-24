import { useState } from 'react';
import { useApp } from '../../store/useApp';
import { brl, formatDate } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import styles from './Owner.module.css';

export default function Agenda() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState('Todos');

  const list = state.appointments.filter((a) => {
    if (filter === 'Pendentes') return a.status === 'Pendente';
    if (filter === 'Confirmados') return a.status === 'Confirmado';
    return true;
  });

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.title}>Agenda da Barbearia</h1>

        <SegmentedControl
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'Todos', label: 'Todos' },
            { value: 'Pendentes', label: 'Pendentes' },
            { value: 'Confirmados', label: 'Confirmados' },
          ]}
        />

        <div className={styles.stack}>
          {list.map((appt) => {
            const srv = state.services.find((s) => s.key === appt.serviceKey);
            return (
              <div key={appt.id} className={styles.card}>
                <div className={styles.rowBetween}>
                  <strong>{appt.client}</strong>
                  <Badge status={appt.status} />
                </div>
                <p className={styles.meta}>
                  {srv?.name} · {formatDate(appt.date)} • {appt.time} ({brl(srv?.price)})
                </p>
                {appt.status !== 'Cancelado' && (
                  <div className={styles.rowBetween}>
                    {appt.status === 'Pendente' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_APPOINTMENT_STATUS',
                            payload: { id: appt.id, status: 'Confirmado', toast: 'Confirmado' },
                          })
                        }
                      >
                        Confirmar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="line"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_APPOINTMENT_STATUS',
                          payload: { id: appt.id, status: 'Cancelado', toast: 'Cancelado' },
                        })
                      }
                    >
                      {appt.status === 'Pendente' ? 'Recusar' : 'Cancelar'}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
