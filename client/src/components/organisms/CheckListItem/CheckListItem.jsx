import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { StyledNote } from './Note.styles.js';
import Draggable from 'react-draggable';
import FlexContainer from '../../layout/FlexContainer/index.js';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { editNote, deleteNote } from '../../../api/mutations.js';
import { BoardContext } from '../../../App.js';
import { GET_NOTES } from '../../../graphql/queries.js';
import { StyledCheckListItem } from './CheckListItem.styles.js';

const CheckListItem = ({ id, text, checked, onChange, onRemove }) => {
    const [isChecked, setIsChecked] = useState(checked);
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onChange(id, !isChecked);
    };

    return (
        <StyledCheckListItem>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <span className={isChecked ? 'checked' : ''}>{text}</span>
            <button onClick={() => onRemove(id)}>Delete</button>
        </StyledCheckListItem>
    );
}

export default CheckListItem;