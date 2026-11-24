import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { brl } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import Button from '../../components/Button/Button';
import IconButton from '../../components/IconButton/IconButton';
import MapView from '../../components/MapView/MapView';
import styles from './Client.module.css';

export default function Shop() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const shop = state.shops.find((s) => s.id === Number(id)) || state.shops[0];
  const fav = state.favorites.includes(shop.id);
  const shopServices = state.services.filter((s) => shop.services.includes(s.key));

  return (
    <div className={styles.page}>
      <TopBar title={shop.name} onBack={() => navigate(-1)} />

      <div className={styles.body}>
        <section className={styles.stack}>
          <h1 className={styles.heroTitle}>{shop.name}</h1>
          <p className={styles.meta}>
            ★ {shop.rating.toFixed(1)} ({shop.reviews} avaliações) · {shop.distanceKm} km
          </p>
          <p>{shop.description}</p>

          <div className={styles.rowBetween}>
            <Button variant="primary" onClick={() => navigate(`/agendar/${shop.id}`)}>
              Agendar horário
            </Button>
            <IconButton
              label="Favoritar"
              icon={fav ? 'star' : 'heart'}
              active={fav}
              onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: shop.id })}
            />
          </div>
        </section>

        <section className={styles.stack}>
          <h2 className={styles.sectionTitle}>Serviços</h2>
          <div className={styles.servicesGrid}>
            {shopServices.map((srv) => (
              <div key={srv.key} className={styles.serviceTile}>
                <span>{srv.name}</span>
                <span className={styles.priceBig}>{brl(srv.price)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.stack}>
          <h2 className={styles.sectionTitle}>Barbeiros</h2>
          <div className={styles.stack}>
            {state.barbers.map((b) => (
              <div key={b.id} className={styles.listCard}>
                <strong>{b.name}</strong>
                <span className={styles.gold}>★ {b.rating.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.stack}>
          <h2 className={styles.sectionTitle}>Localização</h2>
          <p className={styles.meta}>{shop.address}</p>
          <MapView shops={[shop]} selectedId={shop.id} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: 'SHOW_TOAST', payload: 'Abrindo localização no mapa' })}
          >
            Abrir no mapa
          </Button>
        </section>
      </div>
    </div>
  );
}
