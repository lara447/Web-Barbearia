import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { brl } from '../../utils/format';
import TopBar from '../../components/layout/TopBar/TopBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Chip from '../../components/Chip/Chip';
import Thumb from '../../components/Thumb/Thumb';
import Icon from '../../components/Icon/Icon';
import styles from './Client.module.css';

export default function Home() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const headingRef = useRef(null);

  const [query, setQuery] = useState('');
  const [chipMode, setChipMode] = useState('name');

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    dispatch({ type: 'SET_FILTERS', payload: { query } });
    navigate('/buscar');
  }

  function handleChip(mode) {
    setChipMode(mode);
    if (mode === 'city') {
      setQuery('Vitória, ES');
    } else if (mode === 'location') {
      dispatch({ type: 'SHOW_TOAST', payload: 'Localização: Vitória, ES' });
      navigate('/buscar');
    }
  }

  return (
    <div className={styles.page}>
      <TopBar />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.cityTag}>Vitória, ES</span>
          <h1 ref={headingRef} tabIndex={-1} className={styles.heroTitle}>
            ENCONTRE SUA <span className={styles.gold}>BARBEARIA IDEAL</span>
          </h1>

          <form onSubmit={handleSearch} style={{ maxWidth: 620 }}>
            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar por nome da barbearia..."
            />
          </form>

          <div className={styles.chips}>
            <Chip icon="search" active={chipMode === 'name'} onClick={() => handleChip('name')}>
              Por nome
            </Chip>
            <Chip icon="mapPin" active={chipMode === 'city'} onClick={() => handleChip('city')}>
              Cidade
            </Chip>
            <Chip icon="navigation" active={chipMode === 'location'} onClick={() => handleChip('location')}>
              Localização
            </Chip>
          </div>
        </div>
      </section>

      <div className={styles.body}>
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Barbearias perto de você</h2>
            <button type="button" className={styles.textBtn} onClick={() => navigate('/buscar')}>
              Ver todas
            </button>
          </div>

          <div className={styles.carousel}>
            {state.shops.map((shop) => {
              const fav = state.favorites.includes(shop.id);
              return (
                <article key={shop.id} className={styles.miniCard}>
                  <div className={styles.miniThumb} onClick={() => navigate(`/barbearia/${shop.id}`)}>
                    <Thumb />
                    <button
                      type="button"
                      className={styles.favBadge}
                      aria-label="Favoritar"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'TOGGLE_FAVORITE', payload: shop.id });
                      }}
                    >
                      <Icon name={fav ? 'star' : 'heart'} size={14} />
                    </button>
                  </div>
                  <div className={styles.miniInfo} onClick={() => navigate(`/barbearia/${shop.id}`)}>
                    <h3 className={styles.cardTitle}>{shop.name}</h3>
                    <p className={styles.meta}>
                      ★ {shop.rating.toFixed(1)} ({shop.reviews}) · {shop.distanceKm} km
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Serviços populares</h2>
          </div>

          <div className={styles.servicesGrid}>
            {state.services.map((srv) => (
              <button
                key={srv.key}
                type="button"
                className={styles.serviceTile}
                onClick={() => {
                  dispatch({ type: 'SET_FILTERS', payload: { services: [srv.key] } });
                  navigate('/buscar');
                }}
              >
                <span className={styles.gold}>
                  <Icon name="scissors" size={20} />
                </span>
                <span>{srv.name}</span>
                <span className={styles.priceBig}>{brl(srv.price)}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
