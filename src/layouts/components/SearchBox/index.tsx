import * as React from 'react';
import { observer } from 'mobx-react';
import { InputContainer, Input, Icon } from './style';
import { FaIcon } from '@vergo/layouts/assets/fa';

export const SearchBox = observer(() => {
  return (
    <InputContainer>
      <Icon>
      <FaIcon icon="search" />
      </Icon>
      <Input
        placeholder="Search or command"
      />
    </InputContainer>
  );
});
