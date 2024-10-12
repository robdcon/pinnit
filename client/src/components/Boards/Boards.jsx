import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StickyFooter from '../StickyFooter';
import TabIcon from '@mui/icons-material/Tab';

const Boards = (props) => (
  <div className="BoardsWrapper">
    <StickyFooter>
      <AddCircleIcon
        color='primary'
        style={{ color: '#ffffff', fontSize: '3em' }}
        onClick={() => createNote({ variables: { text: "New Message", level: 'MED' } })}
        aria-label="add note"
        size="medium"
      />
      <TabIcon
        color='primary'
        style={{ color: '#ffffff', fontSize: '3em' }}
        onClick={() => createNote({ variables: { text: "New Message", level: 'MED' } })}
        aria-label="add board"
        size="medium"
      />
    </StickyFooter>
  </div>
);

export default Boards;
