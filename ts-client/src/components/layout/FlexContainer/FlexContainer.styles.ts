import styled from '@emotion/styled';

interface StyledFlexContainerProps {
    direction: string
    justify: string
    align: string
}

export const StyledFlexContainer = styled.div<StyledFlexContainerProps>`
    display:flex;
    flex-direction:${({direction}) => {return direction} };
    justify-content:${({justify}) => (justify) ? justify : 'center' };
    align-items:${({align}) => (align) ? align : 'center'};
    height:100%;
    width:100%
`;
