import * as React from 'react';
import { observer } from 'mobx-react';
import { ContainerStyled, StyledWrapper } from './style';
import { SearchBox } from '../SearchBox';
import { Suggestions } from '../Suggestions';

export const Container = observer(() => {
  return (
    <ContainerStyled>
      <StyledWrapper>
        <SearchBox />
        <Suggestions visible={true} />
      </StyledWrapper>
    </ContainerStyled>
  );
});
