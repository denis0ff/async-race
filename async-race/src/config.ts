const BASE = 'http://127.0.0.1:3000/';

export const GARAGE = `${BASE}garage`;

export const chooseCar = (id: number) => `${GARAGE}/${id}`;

export const ENGINE = `${BASE}engine/`;
