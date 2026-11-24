import { useState } from 'react';
import { useApp } from '../../store/useApp';
import { brl } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Owner.module.css';

export default function Services() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim() || Number(price) <= 0) return;
    dispatch({ type: 'ADD_SERVICE', payload: { name: name.trim(), price: Number(price) } });
    setName('');
    setPrice('');
  }

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.title}>Serviços</h1>

        <form className={styles.card} onSubmit={handleAdd}>
          <Input id="srv-name" label="Novo serviço" value={name} onChange={(e) => setName(e.target.value)} />
          <Input id="srv-price" label="Preço (R$)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Button type="submit" variant="primary">+ Adicionar serviço</Button>
        </form>

        <div className={styles.stack}>
          {state.services.map((srv) => (
            <div key={srv.key} className={styles.card}>
              <div className={styles.rowBetween}>
                <div>
                  <strong>{srv.name}</strong>
                  <div className={styles.gold}>{brl(srv.price)}</div>
                </div>
                {state.services.length > 1 && (
                  <Button
                    size="sm"
                    variant="line"
                    onClick={() => dispatch({ type: 'REMOVE_SERVICE', payload: srv.key })}
                  >
                    Remover
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
