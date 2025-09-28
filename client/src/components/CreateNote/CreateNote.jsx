import React from 'react';
import { addNote } from '../../api/mutations';
import { GET_NOTES } from '../../graphql/queries';
import { StyledCreateNoteButton } from './CreateNote.styles';


const CreateNote = ({board, content}) => {
  const createNote = addNote({board, content});
  return (
  <StyledCreateNoteButton className="CreateNoteWrapper">
    <button onClick={() => {
      createNote()
    }} disabled={(typeof(board) === 'undefined')}>CREATE NOTE</button>
  </StyledCreateNoteButton>
)};

export default CreateNote;
