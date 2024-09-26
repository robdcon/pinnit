import React from 'react';
import { addNote } from '../../api/mutations';
import { GET_NOTES } from '../../graphql/queries';
import { StyledCreateNoteButton } from './CreateNote.styles';


const CreateNote = ({boardId, text}) => {
  const createNote = addNote({boardId, text});
  return (
  <StyledCreateNoteButton className="CreateNoteWrapper">
    <button onClick={() => {
      console.log('Creating:', {boardId, text})
      createNote()
    }} disabled={(typeof(boardId) === 'undefined')}>CREATE NOTE</button>
  </StyledCreateNoteButton>
)};

export default CreateNote;
