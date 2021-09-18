import React, { useState, useEffect } from 'react';
import { StyledBoard } from './Board.styles';
import Note from '../Note'
import StickyFooter from '../StickyFooter'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getNotes } from '../../api/queries';
import { setNote, updateNote, deleteNote } from '../../api/mutations';
import { notesVar } from '../../cache';

const Board = (props) => { 
    const id = props.id;
    const [hasError, setHasError] = useState(false);
    const [notes, setNotes] = useState({notes: []});
    const [count, setCount] = useState(0);
    const [uniqueId, setUniqueId] = useState(0);
    const { loading, data, error } = getNotes();
    const createNote = setNote();
    const updateNoteData = updateNote();
    const removeNote = deleteNote();

    useEffect(() => {
        if(data && data.notes) {
            notesVar(data.notes);
            setNotes(notesVar());
        }
    }, [data]);

  const updatePriority = (id, level) => {
    updateNoteData({variables: {id, level}});
  }



  const remove = (id) => {
      removeNote({variables:{id: id}});
    //   setNotes({notes})
  }

  const clearAllNotes = () => {
     console.log('deleted');
  }

  const eachNote = ({id, text, zindex, level}) => {
    return (
        <Note key={id} 
              id={id}
              zindex={zindex}
              level={level}
              onChange={({id, field, value}) => updateNoteData({variables: {id: id, [field]:value}})}
              onRemove={remove}
              onPriorityChange={updatePriority}
              >
                { text }
        </Note>
        )
    }

    return (          
        <div>
            <StyledBoard id={id} className="BoardWrapper">
            <h1>{id}</h1>
                {
                    notes && (notes.length > 0) ? notes.map((note, i) => {
                        if(note !== null) return eachNote(note);
                    }) : null
                }
                <StickyFooter>
                    <AddCircleIcon 
                    style={{ color: '#ffffff', fontSize:'3em'}} 
                    onClick={() => createNote({variables:{text: "New Message", level: 'MED'}})}
                    />
                </StickyFooter>
            </StyledBoard>
        </div>      
    );
}

export default Board;
