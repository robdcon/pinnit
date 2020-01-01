import styled from 'styled-components';

export const StyledNote = styled.div`

    height: 180px;
    width: 160px;
    padding: 2em;
    margin: 2px 0;
    position: absolute;
    cursor: -webkit-grab;
    overflow: hidden;
    background-size: cover;

    > span 
    {
        position: absolute;
        bottom: 2px;
        right: 2px;
        opacity: 0;
        transition: opacity .25s linear;
    }

    > textarea 
    {
        height: 75%;
        background: rgba(255, 255, 255, .5);
    }

    &:active { cursor: -webkit-grabbing; }
    &:hover > span  {opacity: 1; }

    p
    {
        margin: 0;
        font-size: 22px;
        padding: 5px;
        font-family: "Shadows Into Light", "Comic Sans MS";
    }

`;
