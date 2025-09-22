import React, { useState, useEffect } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';
import Note from '../organisms/Note';
import CheckListItem from '../organisms/CheckListItem';

// GraphQL
import { getBoardNotes } from '../../api/queries';
import { editNote, deleteNote, createUser, addNote } from '../../api/mutations';


const Board = ({ boardId, boardType, items }) => {
    const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();

    const [boardItems, setBoardItems] = useState([...items]);
    // const createNote = addNote({ boardId });

    useEffect(() => {
        getNotes({ variables: { board: boardId } });
    }, []);

    useEffect(() => {
        if (notesData) {
            const { notes } = notesData;
            setBoardItems(notes);
            // startNotesPolling && startNotesPolling(1000);
        }
    }, [notesData]);

    if(notesLoading) return <p>Loading...</p>
    if(notesError) return <p>Error: {notesError.message}</p>

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
