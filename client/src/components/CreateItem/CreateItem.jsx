import React from 'react';
import { StyledCreateItemButton } from './CreateItem.styles';
import CreateItemForm from './CreateItemForm';
import useDisplayForm from '../../hooks/useDisplayForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const CreateItem = ({displayForm}) => {
  return (
    <>
      <StyledCreateItemButton className="CreateItemWrapper">
        <AddCircleIcon
          color='primary'
          style={{ color: '#000', fontSize: '3em', cursor: 'pointer' }}
          onClick={() => displayForm(true)}
          aria-label="add item"
          size="medium"
        />
      </StyledCreateItemButton>
    </>
  )
};

export default CreateItem;
