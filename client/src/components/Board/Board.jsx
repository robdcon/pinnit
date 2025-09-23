import React, { useState, useEffect } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';
import Note from '../organisms/Note';
import CheckListItem from '../organisms/CheckListItem';

// GraphQL
import { getBoardNotes } from '../../api/queries';
import { editNote, deleteNote, createUser, addNote } from '../../api/mutations';


const Board = ({ boardId, boardType, name, items }) => {
    const { getNotes, notesLoading, notesData, notesError } = getBoardNotes();
    const [boardItems, setBoardItems] = useState([...items]);

    useEffect(() => {
        getNotes({ variables: { board: boardId } });
    }, []);

    useEffect(() => {
        if (notesData) {
            const { notes } = notesData;
            setBoardItems(notes);
        }
    }, [notesData]);

    if(notesLoading) return <p>Loading...</p>
    if(notesError) return <p>Error: {notesError.message}</p>

    return (
        <div>
            <h1>{name}</h1>
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
                                    <CheckListItem key={item.id} >{item.content}</CheckListItem>
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
