import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { brl, toISO } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import Input, { Checkbox } from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Client.module.css';

export default function Filters() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [services, setServices] = useState(state.filters.services);
  const [date, setDate] = useState(state.filters.date || toISO(0));
  const [maxPrice, setMaxPrice] = useState(state.filters.maxPrice);
  const [minRating, setMinRating] = useState(state.filters.minRating);

  function toggleSrv(key) {
    setServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function handleApply() {
    dispatch({ type: 'SET_FILTERS', payload: { services, date, maxPrice, minRating } });
    dispatch({ type: 'SHOW_TOAST', payload: 'Filtros aplicados' });
    navigate('/buscar');
  }

  function handleClear() {
    setServices([]);
    setMaxPrice(100);
    setMinRating(0);
    dispatch({ type: 'CLEAR_FILTERS' });
  }

  return (
    <div className={styles.page}>
      <TopBar title="Filtros" onBack={() => navigate(-1)} />

      <div className={styles.body}>
        <Input id="flt-city" label="Localização" defaultValue="Vitória, ES" />
        <Input
          id="flt-date"
          label="Data"
          type="date"
          min={toISO(0)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className={styles.stack}>
          <span className={styles.sectionTitle}>Serviços</span>
          {state.services.map((srv) => (
            <Checkbox
              key={srv.key}
              id={`flt-${srv.key}`}
              label={`${srv.name} (${brl(srv.price)})`}
              checked={services.includes(srv.key)}
              onChange={() => toggleSrv(srv.key)}
            />
          ))}
        </div>

        <div className={styles.stack}>
          <div className={styles.rowBetween}>
            <label htmlFor="flt-range">Preço máximo</label>
            <strong className={styles.gold}>Até {brl(maxPrice)}</strong>
          </div>
          <input
            id="flt-range"
            type="range"
            min={30}
            max={100}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className={styles.stack}>
          <span className={styles.sectionTitle}>Avaliação mínima</span>
          <div className={styles.chips}>
            {[0, 4.0, 4.5, 4.8].map((r) => (
              <Button
                key={r}
                size="sm"
                variant={minRating === r ? 'primary' : 'line'}
                onClick={() => setMinRating(r)}
              >
                {r === 0 ? 'Todas' : `★ ${r.toFixed(1)}+`}
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.stack}>
          <Button variant="primary" onClick={handleApply}>Aplicar filtros</Button>
          <Button variant="line" onClick={handleClear}>Limpar filtros</Button>
        </div>
      </div>
    </div>
  );
}
