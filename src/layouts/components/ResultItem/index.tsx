import { observer } from 'mobx-react';
import * as React from 'react';

import {
  StyledContainer,
  PrimaryText,
  Dash,
  SecondaryText,
  Icon,
} from './style';

const selected = false;
const hovered = false;

export const ResultItem = observer(() => {

  return (
    <StyledContainer
      selected={selected}
      hovered={hovered}
    >
      <PrimaryText>Visual Studio Code</PrimaryText>
      <SecondaryText>Desktop App</SecondaryText>
    </StyledContainer>
  );
});
