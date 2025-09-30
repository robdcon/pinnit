import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyledCheckListItem } from './CheckListItem.styles.js';
import { editItem } from '../../../api/mutations';
import { BoardContext } from '../../../App.js';
import { use } from 'react';
import { toTitleCase } from '../../../utils/helpers.js';

const CheckListItem = ({ id, text, checked }) => {
    const [isChecked, setIsChecked] = useState(checked);
    const board = useContext(BoardContext);
    const {updateItem} = editItem({id, board});

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    
    useEffect(() => {
        updateItem({ variables: { checked: isChecked }});
    }, [isChecked]);

    return (
        <StyledCheckListItem>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <span className={checked ? 'checked' : ''}>{toTitleCase(text)}</span>
            {/* <button onClick={() => onRemove(id)}>Delete</button> */}
        </StyledCheckListItem>
    );
}

export default CheckListItem;