import { NavLink } from 'react-router-dom';
import { useApp } from '../../../store/useApp';
import Icon from '../../Icon/Icon';
import styles from './TabBar.module.css';

const CLIENT_TABS = [
  { to: '/', label: 'Início', icon: 'home' },
  { to: '/buscar', label: 'Buscar', icon: 'search' },
  { to: '/favoritos', label: 'Favoritos', icon: 'heart' },
  { to: '/agenda', label: 'Agenda', icon: 'calendar' },
  { to: '/perfil', label: 'Perfil', icon: 'user' },
];

const OWNER_TABS = [
  { to: '/painel', label: 'Resumo', icon: 'store' },
  { to: '/painel/agenda', label: 'Agenda', icon: 'calendar' },
  { to: '/painel/servicos', label: 'Serviços', icon: 'scissors' },
  { to: '/painel/equipe', label: 'Equipe', icon: 'user' },
  { to: '/painel/horarios', label: 'Horários', icon: 'clock' },
];

export default function TabBar() {
  const { state } = useApp();
  const tabs = state.user?.role === 'barbearia' ? OWNER_TABS : CLIENT_TABS;

  return (
    <nav className={styles.tabBar} aria-label="Navegação inferior">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/' || tab.to === '/painel'}
          className={({ isActive }) =>
            [styles.tab, isActive && styles.isActive].filter(Boolean).join(' ')
          }
        >
          <Icon name={tab.icon} size={20} />
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
