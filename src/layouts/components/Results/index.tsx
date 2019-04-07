import { observer } from 'mobx-react';
import * as React from 'react';
import controller from '@vergo/main/controller';
import { StyledResults } from './style';
import { ResultItem } from '../ResultItem';

const onMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export const Results = observer(() => {
  return (
    <StyledResults visible={controller.resultController.results.length > 0} onMouseDown={onMouseDown}>
    {controller.resultController.results.map(x => (
      <ResultItem result={x} key={x.id} />
    ))}
    </StyledResults>
  );
});
