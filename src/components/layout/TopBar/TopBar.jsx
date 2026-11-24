import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../../store/useApp';
import IconButton from '../../IconButton/IconButton';
import Icon from '../../Icon/Icon';
import styles from './TopBar.module.css';

export default function TopBar({ title, onBack }) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const isOwner = state.user?.role === 'barbearia';

  function handleSwitchRole() {
    dispatch({ type: 'SWITCH_ROLE' });
    navigate(isOwner ? '/' : '/painel');
  }

  const navClass = ({ isActive }) =>
    [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ');

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {onBack ? (
            <IconButton label="Voltar" icon="chevronLeft" onClick={onBack} />
          ) : (
            <button
              type="button"
              className={styles.brand}
              onClick={() => navigate(isOwner ? '/painel' : '/')}
            >
              <Icon name="scissors" size={22} />
              <span>
                BARBER <span className={styles.brandAccent}>FIND</span>
              </span>
            </button>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
        </div>

        <nav className={styles.desktopNav} aria-label="Menu principal web">
          {isOwner ? (
            <>
              <NavLink to="/painel" end className={navClass}>Resumo</NavLink>
              <NavLink to="/painel/agenda" className={navClass}>Agendamentos</NavLink>
              <NavLink to="/painel/servicos" className={navClass}>Serviços</NavLink>
              <NavLink to="/painel/equipe" className={navClass}>Barbeiros</NavLink>
              <NavLink to="/painel/horarios" className={navClass}>Horários</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end className={navClass}>Início</NavLink>
              <NavLink to="/buscar" className={navClass}>Barbearias</NavLink>
              <NavLink to="/favoritos" className={navClass}>Favoritos</NavLink>
              <NavLink to="/agenda" className={navClass}>Agendamentos</NavLink>
              <NavLink to="/perfil" className={navClass}>Perfil</NavLink>
            </>
          )}
        </nav>

        <button type="button" className={styles.roleChip} onClick={handleSwitchRole}>
          {isOwner ? 'Visão Cliente' : 'Painel Barbearia'}
        </button>
      </div>
    </header>
  );
}
