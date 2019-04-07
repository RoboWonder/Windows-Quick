import * as React from 'react';
import { observer } from 'mobx-react';
import { ContainerStyled, StyledWrapper, AppContainer } from './style';
import { SearchBox } from '../SearchBox';
import { Results } from '../Results';
import { ipcRenderer } from 'electron';


const onClickOut = () => {
  ipcRenderer.send('an-no-di', []);
}

const onClickIn = (e) => {
  e.stopPropagation();
}

export const Container = observer(() => {
  return (
    <AppContainer  onClick={onClickOut}>
    <ContainerStyled>
      <StyledWrapper onClick={onClickIn}>
        <SearchBox />
        <Results />
      </StyledWrapper>
    </ContainerStyled>
    </AppContainer>
  );
});
