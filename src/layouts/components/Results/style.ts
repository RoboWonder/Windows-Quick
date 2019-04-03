import styled, { css } from 'styled-components';

export const StyledResults = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `};
`;
