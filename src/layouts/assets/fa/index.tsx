import * as React from 'react';
import { observer } from 'mobx-react';
import { StyledI } from './style';

interface Props {
  icon: string;
  type?: string;
  isPulse?: boolean;
  isSpin?: boolean;
}

export const FaIcon = observer(({ icon, type, isPulse, isSpin }: Props) => {
  if (typeof type === 'undefined' || !type) {
    type = 'far';
  }
  return (<StyledI type={type} icon={icon} isPulse={isPulse} isSpin={isSpin} />);
});
