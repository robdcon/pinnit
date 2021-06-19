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
background: url(${noticeBoardXs});
background-size:cover;

${media.handheld`background: url(${noticeBoardXl});`}

`;
