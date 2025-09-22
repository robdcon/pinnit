import React from 'react';
import { addNote } from '../../api/mutations';
import { GET_NOTES } from '../../graphql/queries';
import { StyledCreateNoteButton } from './CreateNote.styles';


const CreateNote = ({boardId, content}) => {
  const createNote = addNote({boardId, content});
  return (
  <StyledCreateNoteButton className="CreateNoteWrapper">
    <button onClick={() => {
      createNote()
    }} disabled={(typeof(boardId) === 'undefined')}>CREATE NOTE</button>
  </StyledCreateNoteButton>
)};

export default CreateNote;
