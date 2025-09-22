import styled from 'styled-components';
import MainTheme from '../../themes/MainTheme.config'

export const StyledStickyFooter = styled.div`
    position: fixed;
    top: calc(100vh - 85px);
    margin-top: -60px;
    background-color: ${(props) => props.transparent ? 'transparent' : `${MainTheme.primaryColor}`};
    height: 60px;
    width: 100%;
    background-color: #000;
    max-width: 300px;
    margin: 0 auto;
    padding: 1em;
    border-radius: 8px;
    left: calc(50% - 150px);
`;
