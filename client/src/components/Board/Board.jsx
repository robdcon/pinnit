import React, { useState, useEffect } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';
import Note from '../organisms/Note';
import CheckListItem from '../organisms/CheckListItem/CheckListItem';
import FlexContainer from '../layout/FlexContainer';

// GraphQL
import { getBoardNotes, getBoardItems } from '../../api/queries';
import { editNote, deleteNote, createUser, addNote, editItem } from '../../api/mutations';


const Board = ({ boardId, boardType, name, items }) => {
    const [boardItems, setBoardItems] = useState(items || []);
    const { getNotes, notesLoading, notesData, notesError } = getBoardNotes();
    const { getItems, itemsLoading, itemsData, itemsError } = getBoardItems();

    useEffect(() => {
        // getNotes({ variables: { board: boardId } });
        getItems({ variables: { board: boardId } });
    }, []);

    useEffect(() => {
        if (notesData) {
            const { notes } = notesData;
            setBoardItems(notes);
        }
    }, [notesData]);

    useEffect(() => {
        if (itemsData) {
            const { items } = itemsData;
            setBoardItems(items);
        }
    }, [itemsData]);

    // if(notesLoading) return <p>Loading...</p>
    // if(notesError) return <p>Error: {notesError.message}</p>
    if(itemsLoading) return <p>Loading...</p>
    if(itemsError) return <p>Error: {itemsError.message}</p>

    return (
        <div>
            <FlexContainer justifyContent="center" alignItems="center" padding="10px">
                <h1>{name}</h1>
            </FlexContainer>
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
                            [...new Set(boardItems.map(item => item.category))].map(category => (
                                <div key={category}>
                                    <h3>{category}</h3>
                                    {
                                        boardItems.filter(item => item.category === category).map(item => (
                                            <CheckListItem id={item.id} key={item.id} checked={item.checked} text={item.name} onChange={editItem} />
                                            // <div key={item.id}>{item.name}</div>
                                        ))
                                    }
                                </div>
                            ))
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
