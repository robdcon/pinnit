import React, { useState, useEffect, useContext } from 'react';
import { StyledBoard, StyledNoteWrapper } from './Board.styles';
import Note from '../organisms/Note';
import CheckListItem from '../organisms/CheckListItem/CheckListItem';
import FlexContainer from '../layout/FlexContainer';
import { GET_ITEMS } from '../../graphql/queries';
import CreateItemForm from '../CreateItem/CreateItemForm';
import CreateItem from '../CreateItem/CreateItem';
import { BoardContext } from '../../App';
import StickyFooter from '../StickyFooter';
import useDisplayForm from '../../hooks/useDisplayForm';
import { toTitleCase } from '../../utils/helpers';

// GraphQL
import { getBoardNotes, getBoardItems } from '../../api/queries';
import { editNote, deleteNote, createUser, addNote, editItem } from '../../api/mutations';
import { use } from 'react';

const Board = () => {
    const { board, boardType, boardName, user } = useContext(BoardContext);
    const [boardItems, setBoardItems] = useState([]);
    const { getNotes, notesLoading, notesData, notesError } = getBoardNotes();
    const { getItems, itemsLoading, itemsData, itemsError } = getBoardItems();
    const [ displayForm, setDisplayForm ] = useState(false);

    useEffect(() => {
        console.log( 'Display Form changed:', displayForm);
    }, [displayForm])

    useEffect(() => {
        getItems({ variables: { board } });
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

    if (itemsLoading) return <p>Loading...</p>
    if (itemsError) return <p>Error: {itemsError.message}</p>

    return (
        <div>
            <FlexContainer justifyContent="center" alignItems="center" padding="10px">
                <h1>{name}</h1>
            </FlexContainer>
            <StyledBoard id={board} className="BoardWrapper" boardType={boardType}>
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
                    <>
                        <StyledNoteWrapper>
                            {
                                [...new Set(boardItems.map(item => item.category))].map(category => (
                                    <div key={category}>
                                        <h3>{toTitleCase(category)}</h3>
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
                        {displayForm && <CreateItemForm />}
                        <StickyFooter justify={'end'}>
                            {!displayForm && <CreateItem displayForm={setDisplayForm} />}
                        </StickyFooter>
                    </>
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
