import { useState } from 'react';
import { useApp } from '../../store/useApp';
import TopBar from '../../components/layout/TopBar/TopBar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Owner.module.css';

export default function Team() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: 'ADD_BARBER', payload: name.trim() });
    setName('');
  }

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.title}>Equipe</h1>

        <form className={styles.card} onSubmit={handleAdd}>
          <Input id="barb-name" label="Novo barbeiro" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" variant="primary">+ Adicionar barbeiro</Button>
        </form>

        <div className={styles.stack}>
          {state.barbers.map((b) => (
            <div key={b.id} className={styles.card}>
              <div className={styles.rowBetween}>
                <strong>{b.name} (★ {b.rating.toFixed(1)})</strong>
                {state.barbers.length > 1 && (
                  <Button
                    size="sm"
                    variant="line"
                    onClick={() => dispatch({ type: 'REMOVE_BARBER', payload: b.id })}
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
