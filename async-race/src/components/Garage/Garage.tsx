import styled from 'styled-components';
import React, {
  Dispatch, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import axios from 'axios';
import { GARAGE } from '../../config';
import { UpdateCar } from './UpdateCar';
import { CreateCar } from './CreateCar';
import { ICar } from '../../types';
import { Car } from './Car';
import { Pagination } from './Pagination';
import { GenerateCars } from './GenerateCars';

const Wrapper = styled.section``;

const Container = styled.div``;

const Button = styled.button``;

const List = styled.ul``;

const getPageCars = (page: number, length: number) => {
  const start = (page - 1) * 7;
  const limit = page * 7;
  const end = length - 1 > limit ? limit : length - 1;
  return [start, end];
};

export const Garage = () => {
  const [garage, setGarage]: [ICar[], Dispatch<SetStateAction<ICar[]>>] = useState([]);

  const [page, setPage] = useState(1);

  const changeGarage = useCallback(() => axios.get<ICar[]>(GARAGE)
    .then(({ data }) => setGarage(data)), [garage]);

  useEffect(() => {
    changeGarage();
  }, []);

  const [updateCar, setUpdateCar]:
  [number | null, Dispatch<SetStateAction<number | null>>] = useState(null);

  return (
    <>
      <Wrapper>
        <CreateCar changeGarage={changeGarage} />
        <UpdateCar updateCar={updateCar} setUpdateCar={setUpdateCar} changeGarage={changeGarage} />
        <Container>
          <Button>Race</Button>
          <Button>Reset</Button>
          <GenerateCars changeGarage={changeGarage} />
        </Container>
      </Wrapper>
      <Wrapper>
        <List>
          <h2>
            Garage(
            {garage.length - 1}
            )
          </h2>
          <h3>
            Page #
            {page}
          </h3>
          {garage.slice(...getPageCars(page, garage.length)).map((car) => (
            <Car
              key={car.id}
              changeGarage={changeGarage}
              id={car.id}
              name={car.name}
              color={car.color}
              updateCar={setUpdateCar}
            />
          ))}
        </List>
        <Pagination length={garage.length} page={page} setPage={setPage} />
      </Wrapper>
    </>
  );
};
