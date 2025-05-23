import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { StyledNote } from './Note.styles.js';
import Draggable from 'react-draggable';
import FlexContainer from '../../layout/FlexContainer/index.js';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { editNote, deleteNote } from '../../../api/mutations.js';
import { BoardContext } from '../../../App.js';
import { GET_NOTES } from '../../../graphql/queries.js';

const priorityLevels = ['LOW', 'MED', 'HIGH'];

const iconStyles = {
  color: '#000'
}

const StyledControlContainer = styled.span`
  width: 100%;
  height: 60px;
  background-color: transparent;
  position: absolute;
  left: 0;
  bottom: 1em;
  opacity:0;
`;

const NoteFooter = (props) => {
  return (
    <StyledControlContainer>
      <FlexContainer justify="space-evenly">
        {props.children}
      </FlexContainer>
    </StyledControlContainer>
  )
}

const Note = ({ id, zindex, level, children, onChange, onPriorityChange, onRemove }) => {
  const board = useContext(BoardContext);
  console.log('Current board:', board);
  
  const [editing, setEditing] = useState(false);
  const [priorityLevel, setPriorityLevel] = useState(level);
  const [styles, setStyles] = useState({});
  const [text, setText] = useState(null);
  const newText = useRef();
  const { updateNote } = editNote({ id: id, board: board.board });
  const { removeNote } = deleteNote({ id: id, board: board.board })



  // Set random position of each rendered Note

  const randomPosition = (x, y, s) => {
    return (x + Math.ceil(Math.random() * (y - x))) + s
  }

  // Change state of Note by setting editing to true

  const edit = () => {
    setEditing(true);
  }

  // Fire onChange event taking the value of newText and the id as arguments

  const save = () => {

    setText(newText.current.value);
    // onChange({ id: id, field: 'text', value: newText.current.value })
    setEditing(false);
  }

  // Fire onRemove with id of the Note as an argument

  const remove = () => {
    removeNote({
      variables: { id }
    })
  }

  const increasePriority = () => {
    const indexOfPriorityLevel = priorityLevels.indexOf(priorityLevel);
    const newIndex = (indexOfPriorityLevel + 1) > 2 ? 0 : indexOfPriorityLevel + 1;
    setPriorityLevel(priorityLevels[newIndex]);
    onPriorityChange(id, priorityLevel);
  }

  const decreasePriority = () => {
    const indexOfPriorityLevel = priorityLevels.indexOf(priorityLevel);
    const newIndex = (indexOfPriorityLevel - 1) < 0 ? 2 : indexOfPriorityLevel - 1;
    setPriorityLevel(priorityLevels[newIndex]);
    onPriorityChange(id, priorityLevel);
  }

  // useEffect(() => {
  //   setStyles({
  //     right: randomPosition(0, window.innerWidth - 150, 'px'),
  //     top: randomPosition(0, window.innerHeight - 150, 'px')
  //   });
  // }, []);

  useEffect(() => {
    if (editing) {
      newText.current.focus()
      newText.current.select()
    }
  }, [editing])

  
  useEffect(() => {
    if (text) {
      updateNote({
        variables: {
          id: id,
          text: text,
          level: priorityLevel
        }
      })
    }
  }, [text])

  // Return a text area input field to add new text to

  const renderForm = () => {
    return (
      <StyledNote
        className="note"
        style={styles}
        priorityLevel={priorityLevel}
      >
        <textarea
          ref={newText}
          defaultValue={children}
        >
        </textarea>
        <SaveIcon onClick={save}>SAVE</SaveIcon>
      </StyledNote>
    )
  }
  const renderDisplay = () => {
    return (
      <StyledNote
        className="Note"
        style={styles}
        priorityLevel={priorityLevel}
      >
        <p>{children}</p>
        <NoteFooter className="NoteFooter">
          <EditIcon style={iconStyles} onClick={edit} />
          <DeleteIcon style={iconStyles} onClick={remove} />
          <KeyboardArrowUpIcon style={iconStyles} onClick={increasePriority} />
          <KeyboardArrowDownIcon style={iconStyles} onClick={decreasePriority} />
        </NoteFooter>
      </StyledNote>
    )
  }

  return (
    <>
      {
        (editing) ? renderForm()
          : renderDisplay()
      }
    </>
    // <Draggable enableUserSelectHack={false}>
    // </Draggable>
  );
}

export default Note;
