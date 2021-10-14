import React from 'react';
import { addNote } from '../../api/mutations';
import { StyledCreateNoteButton } from './CreateNote.styles';


const CreateNote = ({userId, boardId}) => {
  const createNote = addNote({userId, boardId});
  return (
  <StyledCreateNoteButton className="CreateNoteWrapper">
    <button onClick={() => createNote()} disabled={(typeof(boardId) === 'undefined')}>CREATE NOTE</button>
  </StyledCreateNoteButton>
)};

export default CreateNote;
