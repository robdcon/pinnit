import styled from '@emotion/styled';

interface ImageProps {
    width?: string;
    height?: string;
    borderRadius?: string;
}

export const StyledImage = styled.div<ImageProps>`
    width: ${props => props.width}px || auto;
    height: ${props => props.height}px || auto;
    border-radius: ${props => props.borderRadius}px || 0;
    background-color: #f1f1f1;
    img {
        width: 100%;
        height: auto
    }
`;
