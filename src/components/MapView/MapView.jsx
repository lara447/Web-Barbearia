import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import styles from './MapView.module.css';

const DEFAULT_CENTER = [-20.2975, -40.2945];

export default function MapView({ shops = [], selectedId, onSelect, showHeader = true }) {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState('');

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialShop = shops.find((s) => s.id === selectedId) || shops[0];
    const center =
      initialShop && typeof initialShop.latitude === 'number'
        ? [initialShop.latitude, initialShop.longitude]
        : DEFAULT_CENTER;

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: shops.length === 1 ? 15 : 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
      userMarkerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    shops.forEach((shop) => {
      if (typeof shop.latitude !== 'number' || typeof shop.longitude !== 'number') return;

      const isSelected = shop.id === selectedId;
      const pinIcon = L.divIcon({
        className: 'barber-pin-wrapper',
        html: `<div style="
          width:${isSelected ? '28px' : '22px'};
          height:${isSelected ? '28px' : '22px'};
          border-radius:50%;
          background:${isSelected ? '#c9a15b' : '#16130f'};
          border:2.5px solid #c9a15b;
          box-shadow:0 2px 10px rgba(0,0,0,0.65);
          display:flex;
          align-items:center;
          justify-content:center;
        "><div style="width:7px;height:7px;border-radius:50%;background:${isSelected ? '#17120a' : '#c9a15b'};"></div></div>`,
        iconSize: [isSelected ? 28 : 22, isSelected ? 28 : 22],
        iconAnchor: [isSelected ? 14 : 11, isSelected ? 14 : 11],
      });

      const marker = L.marker([shop.latitude, shop.longitude], { icon: pinIcon });

      const popupContent = document.createElement('div');
      popupContent.style.minWidth = '175px';
      popupContent.innerHTML = `
        <strong style="font-size: 14px; color: #17120a; display: block;">${shop.name}</strong>
        <span style="font-size: 12px; color: #555; display: block; margin-top: 2px;">
          ${shop.neighborhood || ''}${shop.city ? ` · ${shop.city}` : ''}
        </span>
        <span style="font-size: 12px; color: #8a6423; font-weight: 600; display: block; margin-top: 2px;">
          ★ ${shop.rating.toFixed(1)} (${shop.reviews} avaliações)
        </span>
      `;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'botao-ver-barbearia';
      btn.textContent = 'Ver barbearia';
      btn.onclick = () => navigate(`/barbearia/${shop.id}`);
      popupContent.appendChild(btn);

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        if (onSelect) onSelect(shop.id);
      });
      marker.addTo(layer);

      if (shop.id === selectedId && shops.length === 1) {
        marker.openPopup();
      }
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [shops, selectedId, navigate, onSelect]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedId) return;
    const target = shops.find((s) => s.id === selectedId);
    if (target && typeof target.latitude === 'number' && typeof target.longitude === 'number') {
      map.setView([target.latitude, target.longitude], Math.max(map.getZoom(), 14), {
        animate: true,
      });
    }
  }, [selectedId, shops]);

  function handleLocateUser() {
    setGeoError('');
    if (!('geolocation' in navigator)) {
      setGeoError('Seu navegador não suporta geolocalização.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const map = mapInstanceRef.current;
        if (map) {
          if (userMarkerRef.current) {
            userMarkerRef.current.remove();
          }

          const userIcon = L.divIcon({
            className: 'icone-localizacao-usuario',
            html: '<div class="ponto-usuario"><div class="ponto-usuario-centro"></div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
            .addTo(map)
            .bindTooltip('Você está aqui', {
              permanent: true,
              direction: 'top',
              offset: [0, -14],
              className: 'tooltip-localizacao-usuario',
            })
            .openTooltip();

          map.setView([latitude, longitude], 14, { animate: true });
        }
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Permissão de localização negada. Ative o GPS ou autorize o navegador.');
        } else {
          setGeoError('Não foi possível obter sua localização atual. Tente novamente.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  return (
    <section className={styles.mapaSecao} aria-label="Mapa de barbearias">
      {showHeader && (
        <div className={styles.mapaCabecalho}>
          <div>
            <span className={styles.textoDestaque}>GRANDE VITÓRIA · ES</span>
            <h2>Barbearias no mapa</h2>
            <p>Explore as unidades próximas ou ative sua localização.</p>
          </div>
          <button
            type="button"
            className={styles.botaoLocalizacao}
            onClick={handleLocateUser}
            disabled={isLocating}
          >
            {isLocating ? 'Localizando...' : 'Usar minha localização'}
          </button>
        </div>
      )}

      {geoError && (
        <div className={styles.mapaErro} role="alert">
          {geoError}
        </div>
      )}

      <div className={styles.mapaContainer}>
        {isLocating && (
          <div className={styles.mapaLoadingOverlay} role="status" aria-live="polite">
            <div className={styles.mapaLoadingSpinner} />
            <p>Buscando sua localização...</p>
            <span>Aguarde enquanto centralizamos as barbearias perto de você.</span>
          </div>
        )}
        <div ref={mapContainerRef} className={styles.mapaInterativo} />
      </div>
    </section>
  );
}
