import React, { useState, useEffect } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';
import Note from '../organisms/Note';
import CheckListItem from '../organisms/CheckListItem';


const Board = ({ boardId, boardType, items }) => {
    const [boardItems, setBoardItems] = useState([...items]);
    return (
        <div>
            <StyledBoard id={boardId} className="BoardWrapper" boardType={boardType}>
                {boardType === 'PIN' && (
                    <StyledNoteWrapper>
                        {
                            boardItems.map(item => {
                                return (
                                    <Note key={item.id}>{item.content}</Note>
                                )
                            })
                        }
                    </StyledNoteWrapper>
                )}
                {boardType === 'CHECKLIST' && (
                    <StyledNoteWrapper>
                        {
                            boardItems.map(item => {
                                return (
                                    <CheckListItem key={item.id} checked={item.checked} >{item.content}</CheckListItem>
                                )
                            })
                        }
                    </StyledNoteWrapper>
                )}
                {(boardType === 'PLAIN' || !boardType) && (
                    <StyledNoteWrapper>
                        {
                            boardItems.map(item => {
                                return (
                                    <div key={item.id}>{item.content}</div>
                                )
                            })
                        }
                    </StyledNoteWrapper>
                )}
            </StyledBoard>
        </div>
    );
}

export default Board;
