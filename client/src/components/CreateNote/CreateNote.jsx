import React from 'react';
import { addNote } from '../../api/mutations';
import { GET_NOTES } from '../../graphql/queries';
import { StyledCreateNoteButton } from './CreateNote.styles';


const CreateNote = ({userId, boardId}) => {
  const createNote = addNote({userId, boardId});
  return (
  <StyledCreateNoteButton className="CreateNoteWrapper">
    <button onClick={() => {
      console.log('working')
      createNote()
    }} disabled={(typeof(boardId) === 'undefined')}>CREATE NOTE</button>
  </StyledCreateNoteButton>
)};

export default CreateNote;
