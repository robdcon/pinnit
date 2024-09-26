import styled from 'styled-components';

export const StyledBoardForm = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 800px;
    max-width: 90%;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    padding: 48px;
    background-color: #ddd;
    border: 1px solid #ddd;
    border-radius: 12px;

    .field {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        input, select {
            width: 100%;
        }
    }
`;
