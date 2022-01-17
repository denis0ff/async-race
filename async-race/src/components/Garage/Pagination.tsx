import styled from 'styled-components';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

const Container = styled.div``;

const Button = styled.button``;

export const Pagination = ({ length, page, setPage }:
{ length: number, page: number, setPage: Dispatch<SetStateAction<number>> }) => {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(length < 7);

  useEffect(() => {
    if (page > 1) setDisabledPrev(false);
    else setDisabledPrev(true);
    if (length - page * 7 <= 1) setDisabledNext(true);
    else setDisabledNext(false);
  }, [length, page]);

  return (
    <Container>
      <Button
        disabled={disabledPrev}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </Button>
      <Button
        disabled={disabledNext}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </Container>
  );
};
