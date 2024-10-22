import React, { FC, useState, useEffect } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';

export enum BoardType {
    PIN,
    PLAIN
}

interface BoardProps {
    boardId: number
    boardType: BoardType
    children: React.ReactElement
    notes: Array<object>[]
}

const Board:FC<BoardProps> = ({ boardId, boardType, children, notes }) => {
    return (
        <div>
            <StyledBoard id={`board-${boardId}`} boardId={boardId} className="BoardWrapper" boardType={BoardType[boardType]}>
                <StyledNoteWrapper>
                    {children}
                </StyledNoteWrapper>
            </StyledBoard>
        </div>
    );
}

export default Board;
