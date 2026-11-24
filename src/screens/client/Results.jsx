import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { filterShops } from '../../services/shops';
import TopBar from '../../components/layout/TopBar/TopBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import IconButton from '../../components/IconButton/IconButton';
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl';
import Button from '../../components/Button/Button';
import Thumb from '../../components/Thumb/Thumb';
import MapView from '../../components/MapView/MapView';
import styles from './Client.module.css';

export default function Results() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState('list');
  const [selectedPin, setSelectedPin] = useState(1);

  const shops = useMemo(
    () => filterShops(state.shops, state.filters, state.services),
    [state.shops, state.filters, state.services]
  );

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.body}>
        <div className={styles.rowBetween}>
          <SearchBar
            value={state.filters.query}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { query: e.target.value } })}
            placeholder="Buscar barbearia..."
          />
          <IconButton label="Filtros" icon="sliders" onClick={() => navigate('/filtros')} />
        </div>

        <div className={styles.rowBetween}>
          <h1 className={styles.sectionTitle}>Resultados ({shops.length})</h1>
          <div style={{ width: 160 }}>
            <SegmentedControl
              value={mode}
              onChange={setMode}
              options={[
                { value: 'list', label: 'Lista' },
                { value: 'map', label: 'Mapa' },
              ]}
            />
          </div>
        </div>

        <div className={styles.splitDesktop}>
          {mode === 'list' && (
            <div className={styles.stack}>
              {shops.map((shop) => (
                <article key={shop.id} className={styles.listCard}>
                  <div className={styles.listThumb}>
                    <Thumb />
                  </div>
                  <div className={styles.listBody}>
                    <div>
                      <h2 className={styles.cardTitle}>{shop.name}</h2>
                      <p className={styles.meta}>
                        ★ {shop.rating.toFixed(1)} ({shop.reviews}) · {shop.distanceKm} km · {shop.neighborhood}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/barbearia/${shop.id}`)}>
                      Ver barbearia
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {mode === 'map' && (
            <MapView shops={shops} selectedId={selectedPin} onSelect={setSelectedPin} />
          )}
        </div>
      </div>
    </div>
  );
}
