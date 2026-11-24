import { toISO } from '../utils/format';

export const SEED_APPOINTMENTS = [
  {
    id: 1001,
    shopId: 1,
    serviceKey: 'corte',
    barberId: 1,
    date: toISO(0),
    time: '10:00',
    status: 'Confirmado',
    client: 'Lucas Martins',
  },
  {
    id: 1002,
    shopId: 1,
    serviceKey: 'combo',
    barberId: 2,
    date: toISO(0),
    time: '14:00',
    status: 'Pendente',
    client: 'Gabriela Prado',
  },
  {
    id: 1003,
    shopId: 1,
    serviceKey: 'barba',
    barberId: 1,
    date: toISO(1),
    time: '16:00',
    status: 'Pendente',
    client: 'Rafael Costa',
  },
];
