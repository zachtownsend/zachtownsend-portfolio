import styled from 'styled-components';

const PageContainer = styled.div`
  background: ${props =>
    props.backgroundimage
      ? `url(${props.backgroundimage})`
      : props.theme.darkGray};
  padding-top: ${props => (props.noPadding ? '0px' : '210px')};
  min-height: calc(100vh - 20px);
  display: flex;
  justify-content: flex-start;
  align-items: ${props => props.vAlign || 'center'};
  text-align: center;
  background-size: cover;
  height: 100%;

  > .columns {
    flex: 1 1 100%;
  }
`;

export default PageContainer;
