import { observer } from 'mobx-react';
import * as React from 'react';
import controller from '@vergo/main/controller';
import { StyledResults } from './style';
import { ResultItem } from '../ResultItem';

interface Props {
  visible: boolean;
}

const onMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export const Results = observer(({ visible }: Props) => {
  return (
    <StyledResults visible={visible} onMouseDown={onMouseDown}>
    {controller.resultController.results.map(x => {
      <ResultItem result={x} />
    })}
    </StyledResults>
  );
});
