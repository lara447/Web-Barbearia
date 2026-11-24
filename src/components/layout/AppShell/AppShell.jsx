import { Outlet, useLocation } from 'react-router-dom';
import TabBar from '../TabBar/TabBar';
import Toast from '../../Toast/Toast';
import styles from './AppShell.module.css';

export default function AppShell() {
  const { pathname } = useLocation();

  const hideTabBar =
    pathname === '/entrar' ||
    pathname === '/cadastro' ||
    pathname === '/filtros' ||
    pathname.startsWith('/barbearia/') ||
    pathname.startsWith('/agendar/');

  return (
    <div className="appViewport">
      <div className={styles.shell}>
        <main className={styles.main}>
          <Outlet />
        </main>
        {!hideTabBar && <TabBar />}
        <Toast />
      </div>
    </div>
  );
}
