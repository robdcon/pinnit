import React from 'react';
import { StyledCreateItemButton } from './CreateItem.styles';
import CreateItemForm from './CreateItemForm';


const CreateItem = ({boardId, content}) => {
  return (
  <>
    <StyledCreateItemButton className="CreateItemWrapper">
      <button onClick={() => {
        createItem()
      }} disabled={(typeof(boardId) === 'undefined')}>CREATE Item</button>
    </StyledCreateItemButton>
    <CreateItemForm />
  </>
)};

export default CreateItem;
