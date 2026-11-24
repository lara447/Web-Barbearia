import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './store/useApp';
import AppShell from './components/layout/AppShell/AppShell';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import Home from './screens/client/Home';
import Results from './screens/client/Results';
import Filters from './screens/client/Filters';
import Shop from './screens/client/Shop';
import Book from './screens/client/Book';
import Appointments from './screens/client/Appointments';
import Favorites from './screens/client/Favorites';
import Profile from './screens/client/Profile';
import Dashboard from './screens/owner/Dashboard';
import Agenda from './screens/owner/Agenda';
import Services from './screens/owner/Services';
import Team from './screens/owner/Team';
import Hours from './screens/owner/Hours';

function RoleGuard({ allowedRole, children }) {
  const { state } = useApp();
  const currentRole = state.user?.role || 'cliente';
  if (currentRole !== allowedRole) {
    return <Navigate to={currentRole === 'barbearia' ? '/painel' : '/'} replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        {/* Autenticação */}
        <Route path="/entrar" element={<Login />} />
        <Route path="/cadastro" element={<Signup />} />

        {/* Visão Cliente */}
        <Route path="/" element={<RoleGuard allowedRole="cliente"><Home /></RoleGuard>} />
        <Route path="/buscar" element={<RoleGuard allowedRole="cliente"><Results /></RoleGuard>} />
        <Route path="/filtros" element={<RoleGuard allowedRole="cliente"><Filters /></RoleGuard>} />
        <Route path="/barbearia/:id" element={<RoleGuard allowedRole="cliente"><Shop /></RoleGuard>} />
        <Route path="/agendar/:id" element={<RoleGuard allowedRole="cliente"><Book /></RoleGuard>} />
        <Route path="/agenda" element={<RoleGuard allowedRole="cliente"><Appointments /></RoleGuard>} />
        <Route path="/favoritos" element={<RoleGuard allowedRole="cliente"><Favorites /></RoleGuard>} />
        <Route path="/perfil" element={<RoleGuard allowedRole="cliente"><Profile /></RoleGuard>} />

        {/* Visão Barbearia */}
        <Route path="/painel" element={<RoleGuard allowedRole="barbearia"><Dashboard /></RoleGuard>} />
        <Route path="/painel/agenda" element={<RoleGuard allowedRole="barbearia"><Agenda /></RoleGuard>} />
        <Route path="/painel/servicos" element={<RoleGuard allowedRole="barbearia"><Services /></RoleGuard>} />
        <Route path="/painel/equipe" element={<RoleGuard allowedRole="barbearia"><Team /></RoleGuard>} />
        <Route path="/painel/horarios" element={<RoleGuard allowedRole="barbearia"><Hours /></RoleGuard>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
