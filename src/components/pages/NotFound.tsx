import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TextLink = styled(Link)`
  padding: .2rem 1rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  border-radius: .5rem;
`;

export const NotFound = () => (
  <h2>
    This page doesn`t exist. Go to
    {' '}
    <TextLink to="/">Garage</TextLink>
  </h2>
);
