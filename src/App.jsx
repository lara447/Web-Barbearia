import { HashRouter } from 'react-router-dom';
import AppProvider from './store/AppProvider';
import AppRoutes from './routes';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}
