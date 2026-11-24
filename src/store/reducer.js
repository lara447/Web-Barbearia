import { INITIAL_SHOPS } from '../data/shops';
import { INITIAL_SERVICES } from '../data/services';
import { INITIAL_BARBERS } from '../data/barbers';
import { SEED_APPOINTMENTS } from '../data/seedAppointments';
import { ALL_HOURS } from '../utils/constants';
import { toISO } from '../utils/format';
import { toggleFavoriteId } from '../services/favorites';
import { buildAppointment } from '../services/appointments';

export const initialState = {
  user: { name: 'Lucas Martins', role: 'cliente' },
  shops: INITIAL_SHOPS,
  services: INITIAL_SERVICES,
  barbers: INITIAL_BARBERS,
  enabledHours: [...ALL_HOURS],
  appointments: SEED_APPOINTMENTS,
  favorites: [1, 2],
  filters: {
    query: '',
    services: [],
    date: toISO(0),
    maxPrice: 100,
    minRating: 0,
  },
  toast: null,
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null, toast: 'Sessão encerrada' };

    case 'SWITCH_ROLE': {
      const nextRole = state.user?.role === 'barbearia' ? 'cliente' : 'barbearia';
      return {
        ...state,
        user: {
          name: nextRole === 'barbearia' ? 'The Barber' : 'Lucas Martins',
          role: nextRole,
        },
        toast: nextRole === 'barbearia' ? 'Modo Painel da Barbearia' : 'Modo Cliente',
      };
    }

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          query: '',
          services: [],
          date: toISO(0),
          maxPrice: 100,
          minRating: 0,
        },
        toast: 'Filtros limpos',
      };

    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: toggleFavoriteId(state.favorites, action.payload),
        toast: exists ? 'Removida dos favoritos' : 'Adicionada aos favoritos',
      };
    }

    case 'CREATE_APPOINTMENT': {
      const appt = buildAppointment({
        ...action.payload,
        clientName: state.user?.name,
      });
      return {
        ...state,
        appointments: [appt, ...state.appointments],
        toast: 'Agendamento enviado! Aguardando a barbearia',
      };
    }

    case 'UPDATE_APPOINTMENT_STATUS':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? { ...a, status: action.payload.status } : a
        ),
        toast: action.payload.toast || 'Status atualizado',
      };

    case 'ADD_SERVICE': {
      const key = `srv_${Date.now()}`;
      return {
        ...state,
        services: [
          ...state.services,
          { key, name: action.payload.name, price: action.payload.price, duration: '30 min' },
        ],
        shops: state.shops.map((s) =>
          s.id === 1 ? { ...s, services: [...s.services, key] } : s
        ),
        toast: 'Serviço adicionado',
      };
    }

    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map((s) =>
          s.key === action.payload.key ? { ...s, ...action.payload.data } : s
        ),
        toast: 'Serviço atualizado',
      };

    case 'REMOVE_SERVICE':
      if (state.services.length <= 1) return state;
      return {
        ...state,
        services: state.services.filter((s) => s.key !== action.payload),
        toast: 'Serviço removido',
      };

    case 'ADD_BARBER':
      return {
        ...state,
        barbers: [
          ...state.barbers,
          { id: Date.now(), name: action.payload, rating: 4.9 },
        ],
        toast: 'Barbeiro adicionado',
      };

    case 'UPDATE_BARBER':
      return {
        ...state,
        barbers: state.barbers.map((b) =>
          b.id === action.payload.id ? { ...b, name: action.payload.name } : b
        ),
        toast: 'Barbeiro atualizado',
      };

    case 'REMOVE_BARBER':
      if (state.barbers.length <= 1) return state;
      return {
        ...state,
        barbers: state.barbers.filter((b) => b.id !== action.payload),
        toast: 'Barbeiro removido',
      };

    case 'TOGGLE_HOUR': {
      const hour = action.payload;
      const exists = state.enabledHours.includes(hour);
      const enabledHours = exists
        ? state.enabledHours.filter((h) => h !== hour)
        : [...state.enabledHours, hour].sort();
      return {
        ...state,
        enabledHours,
        toast: exists ? `Horário ${hour} desativado` : `Horário ${hour} ativado`,
      };
    }

    case 'SHOW_TOAST':
      return { ...state, toast: action.payload };

    case 'CLEAR_TOAST':
      return { ...state, toast: null };

    default:
      return state;
  }
}
