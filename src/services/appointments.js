export function isSlotFree({ appointments, enabledHours, barberId, date, time }) {
  if (!enabledHours.includes(time)) return false;

  const hasConflict = appointments.some(
    (appt) =>
      appt.status !== 'Cancelado' &&
      appt.barberId === Number(barberId) &&
      appt.date === date &&
      appt.time === time
  );

  return !hasConflict;
}

export function buildAppointment({ shopId, serviceKey, barberId, date, time, clientName }) {
  return {
    id: Date.now(),
    shopId: Number(shopId),
    serviceKey,
    barberId: Number(barberId),
    date,
    time,
    status: 'Pendente',
    client: clientName || 'Lucas Martins',
  };
}
