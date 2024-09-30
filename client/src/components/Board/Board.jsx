import React, { useState, useEffect } from 'react';
import { StyledBoard } from './Board.styles';
import Note from '../Note';
import StickyFooter from '../StickyFooter';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getBoardNotes } from '../../api/queries';
import { editNote, deleteNote } from '../../api/mutations';
import { notesVar, currentBoardVar } from '../../cache';
import { useParams } from 'react-router-dom';

const Board = ({userId, boardId, boardType, notes, children}) => { 
    // const [notes, setNotes] = useState([]);
    // const { notesLoading, notesData, notesError } = getBoardNotes();

    const updatePriority = (id, level) => {
        updateNoteData({variables: {id, level}});
    }

    const clearAllNotes = () => {
        console.log('deleted');
    }

    useEffect(() => {

    }, [notes])

//   const eachNote = ({id, text, zindex, level}) => {
//     return (
//         <Note key={`${boardId}${id}`} 
//               id={id}
//               zindex={zindex}
//               level={level}
//               onChange={({field, value}) => updateNote({variables: {id: id, [field]:value}})}
//               onRemove={({id}) => removeNote({variables:{id}})}
//               onPriorityChange={updatePriority}
//               >
//                 { text }
//         </Note>
//         )
//     }

    return (          
        <div>
            <StyledBoard id={boardId} className="BoardWrapper" boardType={boardType}>
            <h1>{boardId}</h1>
            {children}
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
