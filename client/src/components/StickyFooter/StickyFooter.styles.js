import styled from 'styled-components';
import MainTheme from '../../themes/MainTheme.config'

export const StyledStickyFooter = styled.div`

position: fixed;
top: 100vh;
margin-top: -60px;
background-color: ${(props) => props.transparent ? 'transparent' : `${MainTheme.primaryColor}`};
height: 60px;
width: 100%;

`;
