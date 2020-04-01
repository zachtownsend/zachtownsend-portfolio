import styled from 'styled-components';
import { getJustifyContentPosition, getAlignItemsPosition } from '../lib/helpers';

const StyledPageContainer = styled.div`
  background: ${props => props.theme.darkGray};
  padding-top: 20px;
  min-height: calc(100vh - 20px);
  display: ${({ display }) => display || 'flex'};
  justify-content: ${({ hAlign }) => getJustifyContentPosition(hAlign || 'left')};
  align-items: ${({ vAlign }) => getAlignItemsPosition(vAlign)};
  text-align: center;
  background-size: cover;
  height: 100%;

  > .columns {
    flex: 1 1 100%;
  }
`;

export default StyledPageContainer;
