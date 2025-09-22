import styled, {css} from 'styled-components';

export const StyledCheckListItem = styled.div`
    /*Check box list items styles*/
    display: flex;
    align-items: center;
    margin: 8px 0;
    font-size: 16px;
    input[type="checkbox"] {
        margin-right: 10px;
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    span {
        flex-grow: 1;
    }
    .checked {
        text-decoration: line-through;
        color: grey;
    }
    button {
        background: none;
        border: none;
        color: red;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
    }
        
`;
