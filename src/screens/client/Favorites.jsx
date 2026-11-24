import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import TopBar from '../../components/layout/TopBar/TopBar';
import Button from '../../components/Button/Button';
import Thumb from '../../components/Thumb/Thumb';
import styles from './Client.module.css';

export default function Favorites() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const favShops = state.shops.filter((s) => state.favorites.includes(s.id));

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <h1 className={styles.sectionTitle}>Favoritas ({favShops.length})</h1>

        {favShops.length === 0 ? (
          <div className={styles.stack}>
            <p className={styles.meta}>Você ainda não favoritou nenhuma barbearia.</p>
            <Button variant="primary" onClick={() => navigate('/buscar')}>
              Buscar barbearias
            </Button>
          </div>
        ) : (
          <div className={styles.stack}>
            {favShops.map((shop) => (
              <article key={shop.id} className={styles.listCard}>
                <div className={styles.listThumb}>
                  <Thumb />
                </div>
                <div className={styles.listBody}>
                  <h2 className={styles.cardTitle}>{shop.name}</h2>
                  <p className={styles.meta}>★ {shop.rating.toFixed(1)} · {shop.distanceKm} km</p>
                  <div className={styles.rowBetween}>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/barbearia/${shop.id}`)}>
                      Ver barbearia
                    </Button>
                    <Button
                      size="sm"
                      variant="line"
                      onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: shop.id })}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
