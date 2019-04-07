import styled, { css } from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  position: relative;
  align-items: center;
  overflow: hidden;
  padding: 5px;
  border-bottom: 1px solid #f5f5f5;
  &:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  ${({ selected, hovered }: { selected: boolean; hovered: boolean }) => {
    let backgroundColor = 'transparent';
    if (selected) {
      backgroundColor = 'rgba(0, 0, 0, 0.06)';
    } else if (hovered) {
      backgroundColor = 'rgba(0, 0, 0, 0.03)';
    }
    return css`
      background-color: ${backgroundColor};
    `;
  }};
`;

export const PrimaryText = styled.div`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.98;
  margin-bottom: 3px;
`;

export const SecondaryText = styled.div`
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 16px;
  font-size: 13px;
  opacity: 0.6;
`;

export const Icon = styled.div`
  margin-right: 10px;
  width: 36px;
  min-width: 16px;
  height: 36px;
  background-size: 32px 32px;
  background-position: center;
  background-repeat: no-repeat;
`;

