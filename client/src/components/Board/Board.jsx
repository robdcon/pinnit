import React, { useState, useEffect, createContext } from 'react';
import { StyledBoard } from './Board.styles';
import Note from '../Note'
import StickyFooter from '../StickyFooter'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { NotesConsumer } from '../../context/notesContext';
import { GraphQlConsumer } from '../../context/apiContext';
import { useMutation } from "@apollo/react-hooks";
import { SET_NOTE } from '../../utils/mutations';

const Board = () => { 
    const [hasError, setHasError] = useState(false);
    const [notes, setNotes] = useState([]);
    const [count, setCount] = useState(0);
    const [uniqueId, setUniqueId] = useState(0);
    const [createNote, { data, loading, error }] = useMutation(SET_NOTE);

    const logData = () => {
        console.log("Loading:", loading, "Data:", data, "Error:", error)
    };

    const addNote = (text) => {
        console.log("Loading:", loading, "Data:", data, "Error:", error)
        createNote({variables: {
            text: text
        }})
    }
  
  //Method for handling unique ID for each note

  const nextId = () => {
    const newId = uniqueId + 1;
    setUniqueId(newId)
    return uniqueId;
  }
  

  const saveNotesToLocal = () =>
  {
      const board = 
      {
          uniqueId: uniqueId || 0,
          notes: notes
      }
      const jsonNotes = JSON.stringify(board)
      localStorage.setItem('message_board_notes', jsonNotes);
      console.log('saved')
  }


  // Update the array of notes in the Board class's state
  // Map through each note using a callback function
  // If the note ID is not equal to the current note return note
  // Otherwise return note with its original keys except for 'note' key, which is set to new text
  // Set the state of the Board classs to the new notes variable

  const update = (newText, id) =>
  {
      var notes = notes.map(

          note => (note.id !== id) ?
          note : 
              {
                  ...note,
                  note:newText
              }

          )
    //   setNotes({notes});
     
  }
 

  const updatePriority = (level, id) =>
  {
      const newLevel = level--
      var notes = notes.map(

          note => (note.id !== id) ?
          note : 
              {
                  ...note,
                  level:newLevel
              }

          )
    //   setNotes({notes});
     
  }

//   useEffect(() =>
//   {

//       const board = JSON.parse(localStorage.getItem('message_board_notes'))

//       if(!board) return
    
//       const notes = board.notes   
//       const id = board.uniqueId
     
//       if(!notes.length > 0)
//       {
//           console.log('no notes')
//           return
//       }
//       else
//       {
//           console.log(notes)
//       }
//       setNotes({
//           notes:notes
//         })
//         setUniqueId(id)
     
//   }, [])

//   useEffect(() => {
      
//     console.log('updated');
//     saveNotesToLocal();
     
//   }, [notes])

  
  // Takes the note's id as an argument
  // Filter through the notes state of Board class
  // Return a new array consisting of all notes whise id does not match the id parameter

  const remove = (id) => {
      var notes = notes.filter(note => note.id !== id)
    //   setNotes({notes})
  }

  const clearAllNotes = () => {
      this.setState({
          notes:[]
      })
      localStorage.setItem('message-board-notes', "")
  }

  // Return an instance of Note
  // Set the key and id to note.id
  // Set methods to handle updating and removing notes
  // Set the child to the notes text

  const eachNote = ({id, text, zindex, level}) => {
    return (

        <Note key={id} 
              id={id} 
              level={level}
              onChange={update} 
              onRemove={remove}
              onPriorityChange={updatePriority}
              >
                { text }
        </Note>

        )
    }

    return (
        
            <NotesConsumer>
            {
                ({notes}) => {
                    console.log("Notes form consumer:",notes)
                    return (
                        <div>
                            <StyledBoard className="BoardWrapper">
                                {
                                    notes && (notes.length > 0) ? notes.map(eachNote) : null
                                }
                                <StickyFooter>
                                     <AddCircleIcon style={{ color: '#ffffff', fontSize:'3em'}} onClick={() => addNote("New Message")} />
                                </StickyFooter>
                            </StyledBoard>
                        </div>
                    )
                }
            }
            </NotesConsumer>
            
    );
}

export default Board;
