import { observer } from 'mobx-react';
import * as React from 'react';
import controller from '@vergo/main/controller';
import { Result } from '@vergo/main/results/model';

import {
  StyledContainer,
  PrimaryText,
  SecondaryText,
  Icon,
} from './style';

interface Props {
  result: Result;
}

export const ResultItem = observer((result: Props) => {
  const { hovered } = result;
  const { primaryText, secondaryText } = result;

  const selected = controller.resultController.selected === result.id;

  return (
    <StyledContainer
      selected={selected}
      hovered={hovered}
    >
      <PrimaryText>{primaryText}</PrimaryText>
      <SecondaryText>{secondaryText}</SecondaryText>
    </StyledContainer>
  );
});
