import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { IPaginationProps } from '../../types';

const Container = styled.div``;

const Button = styled.button``;

export const Pagination = (
  {
    page, length, limit, setPage, isRace,
  }: IPaginationProps,
) => {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(length < limit);

  useEffect(() => {
    if (page > 1) setDisabledPrev(false);
    else setDisabledPrev(true);
    if (length - page * limit <= 0) setDisabledNext(true);
    else setDisabledNext(false);
  }, [length, page]);

  return (
    <Container>
      <Button
        disabled={disabledPrev || isRace}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </Button>
      <Button
        disabled={disabledNext || isRace}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </Container>
  );
};
