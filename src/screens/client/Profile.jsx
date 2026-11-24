import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { clearSession } from '../../services/auth';
import TopBar from '../../components/layout/TopBar/TopBar';
import Button from '../../components/Button/Button';
import styles from './Client.module.css';

export default function Profile() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    dispatch({ type: 'LOGOUT' });
    navigate('/entrar');
  }

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <section className={styles.listCard}>
          <div className={styles.listBody}>
            <h1 className={styles.heroTitle}>Olá, {state.user?.name || 'Cliente'}</h1>
            <p className={styles.meta}>Vitória, ES · Favoritas: {state.favorites.length}</p>
          </div>
        </section>

        <Button variant="ghost" onClick={() => navigate('/agenda')}>
          Meus agendamentos
        </Button>
        <Button variant="line" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
