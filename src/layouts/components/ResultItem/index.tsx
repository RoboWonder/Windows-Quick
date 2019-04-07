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

const onMouseEnter = (result: Result) => () => {
  controller.resultController.selected = result.id;
};
const onClick = (result: Result) => () => {
  controller.execItem(result.id);
};

export const ResultItem = observer(({ result }: Props) => {
  const { hovered } = result;
  const { primaryText, secondaryText, id, icon } = result;

  const selected = controller.resultController.selected === result.id;

  return (
    <StyledContainer
      selected={selected}
      hovered={hovered}
      onMouseEnter={onMouseEnter(result)}
      onClick={onClick(result)}
    >
    <Icon
        style={{
          backgroundImage: `url(${icon})`,
          opacity: 0.9,
        }}
      />
      <div>
      <PrimaryText>{primaryText}</PrimaryText>
      <SecondaryText>{secondaryText}</SecondaryText>
      </div>
    </StyledContainer>
  );
});
