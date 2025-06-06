import styled from 'styled-components';
import {media} from '../../utils/media';
import noticeBoardXl from "../../img/notice-board-xl.jpg"
import noticeBoardXs from "../../img/notice-board-xs.jpg"


export const StyledBoard = styled.div`
    height: 100%;
    height:100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background-size:cover;  
    background: ${(props) => (props.boardType === 'PIN') ? `url(${noticeBoardXl})` : "transparent"};
    ${media.handheld`background: ${(props) => (props.boardType === 'PIN') ? `url(${noticeBoardXs})` : "transparent"};`}
`;

export const StyledNoteWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: max-content;
    gap: 8px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1em;
    overflow-y: auto;
    height: 100%;
    ${media.handheld`padding: 0;`}
`;