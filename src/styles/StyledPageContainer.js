import styled from 'styled-components';

const StyledPageContainer = styled.div`
  background: ${props => props.theme.darkGray};
  padding-top: 20px;
  min-height: calc(100vh - 20px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  background-size: cover;
  height: 100%;

  > .columns {
    flex: 1 1 100%;
  }
`;

export default StyledPageContainer;
