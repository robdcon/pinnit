import React, { useState, useEffect } from 'react';
import { StyledBoard } from './Board.styles';
import Note from '../Note'
import StickyFooter from '../StickyFooter'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getNotes } from '../../api/queries';
import { updateNote, deleteNote } from '../../api/mutations';
import { notesVar, currentBoardVar } from '../../cache';
import { useParams } from 'react-router-dom';

const Board = ({userId, boardId, notes}) => { 
    // const [notes, setNotes] = useState([]);
    const updateNoteData = updateNote();
    const removeNote = deleteNote();

    const updatePriority = (id, level) => {
        updateNoteData({variables: {id, level}});
    }

    const remove = (id) => {
        removeNote({variables:{user: userId, board: boardId, id: id}});
    }

    const clearAllNotes = () => {
        console.log('deleted');
    }

  const eachNote = ({id, text, zindex, level}) => {
    return (
        <Note key={`${boardId}${id}`} 
              id={id}
              zindex={zindex}
              level={level}
              onChange={({field, value}) => updateNoteData({variables: {user: userId, board:boardId, id: id, [field]:value}})}
              onRemove={remove}
              onPriorityChange={updatePriority}
              >
                { text }
        </Note>
        )
    }

    return (          
        <div>
            <StyledBoard id={boardId} className="BoardWrapper">
            <h1>{boardId}</h1>
                {
                    notes && (notes.length > 0) ? notes.map((note, i) => {
                        if(note !== null) return eachNote(note);
                    }) : null
                }
                {/* <StickyFooter>
                    <AddCircleIcon 
                    style={{ color: '#ffffff', fontSize:'3em'}} 
                    onClick={() => createNote({variables:{text: "New Message", level: 'MED'}})}
                    />
                </StickyFooter> */}
            </StyledBoard>
        </div>      
    );
}

export default Board;
