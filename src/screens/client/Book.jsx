import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { ALL_HOURS } from '../../utils/constants';
import { brl, toISO } from '../../utils/format';
import { isSlotFree } from '../../services/appointments';
import TopBar from '../../components/layout/TopBar/TopBar';
import Input, { Select } from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Client.module.css';

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const shop = state.shops.find((s) => s.id === Number(id)) || state.shops[0];
  const shopServices = state.services.filter((s) => shop.services.includes(s.key));

  const [serviceKey, setServiceKey] = useState(shopServices[0]?.key || 'corte');
  const [barberId, setBarberId] = useState(state.barbers[0]?.id || 1);
  const [date, setDate] = useState(toISO(0));
  const [time, setTime] = useState('');

  const selectedService = state.services.find((s) => s.key === serviceKey);

  function handleConfirm() {
    if (!state.user) {
      navigate('/entrar');
      return;
    }
    if (!time) return;

    dispatch({
      type: 'CREATE_APPOINTMENT',
      payload: { shopId: shop.id, serviceKey, barberId, date, time },
    });
    navigate('/agenda');
  }

  return (
    <div className={styles.page}>
      <TopBar title="Agendar Horário" onBack={() => navigate(-1)} />

      <div className={styles.body}>
        <div className={styles.listCard}>
          <div>
            <h1 className={styles.cardTitle}>{shop.name}</h1>
            <p className={styles.meta}>★ {shop.rating.toFixed(1)} · {shop.address}</p>
          </div>
        </div>

        <Select
          id="bk-srv"
          label="1. Serviço"
          value={serviceKey}
          onChange={(e) => setServiceKey(e.target.value)}
        >
          {shopServices.map((srv) => (
            <option key={srv.key} value={srv.key}>
              {srv.name} — {brl(srv.price)}
            </option>
          ))}
        </Select>

        <Select
          id="bk-barber"
          label="2. Barbeiro"
          value={barberId}
          onChange={(e) => {
            setBarberId(Number(e.target.value));
            setTime('');
          }}
        >
          {state.barbers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} (★ {b.rating.toFixed(1)})
            </option>
          ))}
        </Select>

        <Input
          id="bk-date"
          label="3. Data"
          type="date"
          min={toISO(0)}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime('');
          }}
        />

        <div className={styles.stack}>
          <span className={styles.sectionTitle}>4. Horário</span>
          <div className={styles.slotsGrid}>
            {ALL_HOURS.map((slot) => {
              const free = isSlotFree({
                appointments: state.appointments,
                enabledHours: state.enabledHours,
                barberId,
                date,
                time: slot,
              });
              const selected = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!free}
                  onClick={() => setTime(slot)}
                  className={[
                    styles.slotBtn,
                    selected && styles.slotSelected,
                    !free && styles.slotDisabled,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.rowBetween}>
          <span>Total:</span>
          <span className={styles.priceBig}>{brl(selectedService?.price)}</span>
        </div>

        <Button variant="primary" disabled={!time} onClick={handleConfirm}>
          Confirmar agendamento
        </Button>
      </div>
    </div>
  );
}
