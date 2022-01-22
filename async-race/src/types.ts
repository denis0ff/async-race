import { Dispatch, SetStateAction } from 'react';

export interface ICar {
  name: string,
  color: string,
  id: number
}

export type ReturnPromiseVoid = () => Promise<void>;

export interface INewCar {
  color: string
  name: string
}
export interface IGarageProps {
  page: number,
  setPage: Dispatch<SetStateAction<number>>
  newCar: INewCar,
  setNewCar: Dispatch<SetStateAction<INewCar>>
  updateCar: ICar,
  setUpdateCar: Dispatch<SetStateAction<ICar>>
}

export interface IUpdateCarProps {
  updateCar: ICar,
  setUpdateCar: Dispatch<SetStateAction<ICar>>
  changeGarage: ReturnPromiseVoid
}

export interface ICreateCarProps {
  newCar: INewCar,
  setNewCar: Dispatch<SetStateAction<INewCar>>
  changeGarage: ReturnPromiseVoid
  isRace: boolean
}

export interface INewWinner {
  id: number
  name: string
  time: number
}

export interface ICarProps {
  changeGarage:ReturnPromiseVoid
  car: ICar
  updateCar: Dispatch<SetStateAction<ICar>>
  isRace: boolean
  setWinner: Dispatch<INewWinner>
  needReset: boolean
  setNeedReset: Dispatch<SetStateAction<boolean>>
  increaseFinishedCars: Dispatch<number>
}

export interface IWinnersConfig {
  sort: string
  order: string
}
export interface IWinnersProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  config: IWinnersConfig
  setConfig: Dispatch<SetStateAction<IWinnersConfig>>
}
export interface IWinner {
  id: number
  time: number
  wins: number
}

export interface IPaginationProps {
  length: number
  limit: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isRace?: boolean
}

export interface IWinnerCarProps {
  id: number
  wins: number
  time: number
  number: number
}

export interface IOrderPick {
  [x: string]: string
}
