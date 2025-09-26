import styled from 'styled-components';

export const StyledCreateItemButton = styled.div`
 display: flex;
`;

export const StyledCreateItemForm = styled.form`
    display: flex;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #f9f9f9;
    
    label {
    font-weight: bold;
    }
    
    input, textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    }
    
    button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
        background-color: #218838;
    }
    }
`;