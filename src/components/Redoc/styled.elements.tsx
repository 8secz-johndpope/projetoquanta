import styled, { media } from '../../styled-components';

export const RedocWrap = styled.div`
  ${({ theme }) => `
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize};
  font-weight: ${theme.typography.fontWeightRegular};
  line-height: ${theme.typography.lineHeight};
  color: ${theme.colors.text.primary};
  display: flex;
  position: relative;
  text-align: left;

  -webkit-font-smoothing: ${theme.typography.smoothing};
  font-smoothing: ${theme.typography.smoothing};
  ${(theme.typography.optimizeSpeed && 'text-rendering: optimizeSpeed !important') || ''};

  tap-highlight-color: rgba(0, 0, 0, 0);
  text-size-adjust: 100%;

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  .redoc-markdown h1 {
    padding-top: ${theme.spacing.unit * 16}px;
  }
`};
`;

export const ApiContentWrap = styled.div`
  z-index: 1;
  position: relative;
  overflow: hidden;
  width: calc(100% - ${props => props.theme.menu.width});
  contain: layout;
  ${media.lessThan('small')`
     width: 100%;
   `};
`;
//TODO REMOVE THIS BECAUSE BUG ON RESPONSIVE



export const BackgroundStub = styled.div`
  background: ${({ theme }) => theme.rightPanel.backgroundColor};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: calc((100% - ${({ theme }) => theme.menu.width}) * 0.4);
  ${media.lessThan('small')`
   width: ${props => props.theme.rightPanel.width};
 `};
`;
//TODO REMOVE THIS BECAUSE BUG ON RESPONSIVE
//${media.lessThan('medium')`
 //   display: none;
 // `};
