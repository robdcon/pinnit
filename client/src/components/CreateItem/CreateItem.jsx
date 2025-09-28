import React from 'react';
import { StyledCreateItemButton } from './CreateItem.styles';
import CreateItemForm from './CreateItemForm';


const CreateItem = ({board, content}) => {
  return (
  <>
    <StyledCreateItemButton className="CreateItemWrapper">
      <button onClick={() => {
        createItem()
      }} disabled={(typeof(board) === 'undefined')}>CREATE Item</button>
    </StyledCreateItemButton>
    <CreateItemForm />
  </>
)};

export default CreateItem;
