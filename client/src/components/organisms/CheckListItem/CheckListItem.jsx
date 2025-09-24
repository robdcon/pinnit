import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyledCheckListItem } from './CheckListItem.styles.js';

const CheckListItem = ({ id, text, checked, onChange, onRemove }) => {
    // const [isChecked, setIsChecked] = useState(checked);
    
    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    //     onChange(id, !isChecked);
    // };

    return (
        <StyledCheckListItem>
            <input
                type="checkbox"
                checked={checked}
            />
            <span className={checked ? 'checked' : ''}>{text}</span>
            {/* <button onClick={() => onRemove(id)}>Delete</button> */}
        </StyledCheckListItem>
    );
}

export default CheckListItem;