import * as React from 'react';
import { observer } from 'mobx-react';
import { InputContainer, Input, Icon } from './style';
import { FaIcon } from '@vergo/layouts/assets/fa';
import controller from '@vergo/main/controller';


const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.which === 13) {
    // Enter.
    e.preventDefault();
    controller.execItem(
      controller.resultController.selected
    );
  }
};

const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  controller.inputRef.current.select();
};

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const key = e.keyCode;
  const { resultController } = controller;
  const { results } = resultController;
  const input = controller.inputRef.current;

  if (
    key !== 8 && // backspace
    key !== 13 && // enter
    key !== 17 && // ctrl
    key !== 18 && // alt
    key !== 16 && // shift
    // key !== 9 && // tab
    key !== 20 && // capslock
    key !== 46 && // delete
    key !== 32 // space
  ) {
    controller.canComplete = true;
  } else {
    controller.canComplete = false;
  }

  if (e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault();
    if (
      e.keyCode === 40 &&
      resultController.selected + 1 <= results.length
    ) {
      resultController.selected++;
    } else if (e.keyCode === 38 && resultController.selected > 1) {
      resultController.selected--;
    }

    const suggestion = results.find(
      x => x.id === resultController.selected,
    );

    input.value = suggestion.primaryText;
  }
  if(key === 9){
    input.value = results[0].primaryText;
    controller.complete();
  }
};

const onInput = () => {
  controller.complete();
};

const onInputBlur = () => {

};

export const SearchBox = observer(() => {
  return (
    <InputContainer>
      <Icon>
      <FaIcon icon="search" />
      </Icon>
      <Input
        placeholder="Search or command"
        onKeyPress={onKeyPress}
        onFocus={onInputFocus}
        onChange={onInput}
        onKeyDown={onKeyDown}
        onBlur={onInputBlur}
        ref={controller.inputRef}
      />
    </InputContainer>
  );
});
