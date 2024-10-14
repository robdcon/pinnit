import styled, {css} from 'styled-components';
import postItNoteLow from "../../../img/post-it-note-low.png"
import postItNoteMed from "../../../img/post-it-note-med.png"
import postItNoteHigh from "../../../img/post-it-note-high.png"

export const StyledNote = styled.div`

    height: 180px;
    width: 160px;
    padding: 2em;
    margin: 2px 0;
    cursor: -webkit-grab;
    overflow: hidden;
    background-size: cover;
    position: relative;

    ${(props) => props.priorityLevel === 'LOW' && css`
            background-image: url(${postItNoteLow});
    `}

    ${(props) => props.priorityLevel === 'MED' && css`
            background-image: url(${postItNoteMed});
    `}

    ${(props) => props.priorityLevel === 'HIGH' && css`
            background-image: url(${postItNoteHigh});
    `}

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
