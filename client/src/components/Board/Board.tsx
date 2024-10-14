import React, { useState, useEffect } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';
// import Note from '../Note';
// import { Fab } from '@mui/material';
// import { getBoardNotes } from '../../api/queries';
// import { editNote, deleteNote } from '../../api/mutations';
// import { notesVar, currentBoardVar } from '../../cache';
// import { useParams } from 'react-router-dom';


const Board = ({ boardId, boardType, children, notes }) => {
    return (
        <div>
            <StyledBoard id={boardId} className="BoardWrapper" boardType={boardType}>
                <StyledNoteWrapper>
                    {children}
                </StyledNoteWrapper>
            </StyledBoard>
        </div>
    );
}

export default Board;
