import styled from 'styled-components';

export const StyledFlexContainer = styled.div`

    display:flex;
    flex-direction:${(props) => {return props.direction} };
    justify-content:${(props) => (props.justify) ? props.justify : 'center' };
    align-items:${(props) => (props.align) ? props.align : 'center'};
    height:100%;
    width:100%

`;
