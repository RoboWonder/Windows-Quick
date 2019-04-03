import * as React from 'react';
import { observer } from 'mobx-react';
import { ContainerStyled, StyledWrapper } from './style';
import { SearchBox } from '../SearchBox';
import { Results } from '../Results';

export const Container = observer(() => {
  return (
    <ContainerStyled>
      <StyledWrapper>
        <SearchBox />
        <Results visible={true} />
      </StyledWrapper>
    </ContainerStyled>
  );
});
