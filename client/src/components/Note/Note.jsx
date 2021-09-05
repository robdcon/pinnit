import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import { StyledNote } from './Note.styles';
import Draggable from 'react-draggable';
import FlexContainer from '../FlexContainer';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import postItNoteLow from "../../img/post-it-note-low.png"
import postItNoteMed from "../../img/post-it-note-med.png"
import postItNoteHigh from "../../img/post-it-note-high.png"

const priorityLevels = [
    {
        level:'LOW',
        img:postItNoteLow
    },
    {
        level:'MED',
        img:postItNoteMed
    },
    {
        level:'HIGH',
        img:postItNoteHigh
    },
]

const iconStyles = {

    color:'#000'

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

const Note = ({id, children, onChange, onPriorityChange, onRemove}) => { 
  
      const [hasError, setHasError] = useState(false);
      const [editing, setEditing] = useState(false);
      const [priorityLevel, setPriorityLevel] = useState('LOW');
      const [backgroundImage, setBackgroundImage] = useState(postItNoteLow);
      const [styles, setStyles] = useState({});

      const newText = useRef();
  

  const background = () =>{
    const bgurl = priorityLevels.filter(obj => {
      return obj.level = priorityLevel;
    })
      setBackgroundImage(bgurl)
  }
   // Set random position of each rendered Note

  const randomPosition = (x, y, s) => {
      return (x + Math.ceil(Math.random() * (y-x))) + s

  }

  // Change state of Note by setting editing to true

  const edit = () => {
      setEditing(true);
  }

  // Fire onChange event taking the value of newText and the id as arguments

  const save = () => {
      onChange({id:id, field:'text', value:newText.current.value})
      setEditing(false);
  }

  // Fire onRemove with id of the Note as an argument

  const remove = () => {
      onRemove(id)
  }

  const increasePriority = (id) => {
      setPriorityLevel((prevState) => {
          return {priorityLevel:(prevState.priorityLevel + 1 > 2) ? 0 : prevState.priorityLevel + 1}
      }, () => {
          onPriorityChange(priorityLevel, id)
      });
  }

  const decreasePriority = (id) => {
      setPriorityLevel((prevState) => {
          return {priorityLevel:(prevState.priorityLevel - 1 < 0) ? 2 : prevState.priorityLevel - 1}
      }, () => {
          onPriorityChange(priorityLevel, id)
      });
  }

  // Return a text area input field to add new text to

  const renderForm = () => {
      return (
          <StyledNote className="note" style={styles}>
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
          <StyledNote onFocus={() => console.log('hello')} className="note" style={styles}>
              <p>{children}</p>
              <NoteFooter className="NoteFooter">
                  <EditIcon style={iconStyles} onClick={edit} />
                  <DeleteIcon style={iconStyles} onClick={remove} />
                  <KeyboardArrowUpIcon style={iconStyles} onClick={decreasePriority} />
                  <KeyboardArrowDownIcon style={iconStyles} onClick={decreasePriority} />
              </NoteFooter>
          </StyledNote>
        )
    }

    useEffect(() => {
      setStyles({ 
          // Set random position of each note
          //backgroundImage:"url('./img/post-it-note.png')",
          backgroundImage : `url(${backgroundImage})`,
          right:randomPosition(0, window.innerWidth - 150, 'px'),
          top:randomPosition(0, window.innerHeight - 150, 'px')
      });
    }, []);

    useEffect(() => {
      if(editing) {
          newText.current.focus()
          newText.current.select()
      }
      // this.style.backgroundImage = `url(${this.background()})`
    }, [editing])

    return (
      <Draggable enableUserSelectHack={false}>
      {
        (editing) ? renderForm()
                  : renderDisplay()
      }
      </Draggable>
    );
}

export default Note;
