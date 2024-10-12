import styled from 'styled-components';

export const StyledImage = styled.div`
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    border-radius: ${({borderRadius}) => borderRadius}px;
    background-color: #f1f1f1;
    img {
        width: 100%;
        height: auto
    }
`;
