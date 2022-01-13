const BASE = 'http://127.0.0.1:3000/';

export const GARAGE = `${BASE}garage`;

export const deleteCar = (id: number) => `${GARAGE}/${id}`;
