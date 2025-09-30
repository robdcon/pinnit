import styled from 'styled-components';
import MainTheme from '../../themes/MainTheme.config'

export const StyledStickyFooter = styled.div`
    position: fixed;
    top: calc(100vh - 60px);
    margin-top: -60px;
    background-color: ${(props) => props.transparent ? 'transparent' : `${MainTheme.primaryColor}`};
    height: 60px;
    width: 100%;
    margin: 0 auto;
    padding: 1em;
    border-radius: 8px;
`;
