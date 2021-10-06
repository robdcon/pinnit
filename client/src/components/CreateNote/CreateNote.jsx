import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CREATE_NOTE } from '../../graphql/mutations';
import { GET_NOTES } from '../../graphql/queries';
import { StyledCreateNoteButton } from './CreateNote.styles';
import { noteVar } from '../../cache';


const CreateNote = ({userId, boardId}) => {
  const [createNote] = useMutation(CREATE_NOTE, {
    variables: {user: `${userId}`, board: `${boardId}`, text: `New Note for ${boardId}`, level: "HIGH", zindex: 0},
    onCompleted: (note) => {console.log('Created Note:', note)},
    refetchQueries: [
      {
       query:GET_NOTES,
       variables: {
         user: `${userId}`,
         board: `${boardId}`
       }
      }
    ]
  });

  return (
  <StyledCreateNoteButton className="CreateNoteWrapper">
    <button onClick={() => createNote()} disabled={(typeof(boardId) === 'undefined')}>CREATE NOTE</button>
  </StyledCreateNoteButton>
)};


export default CreateNote;
