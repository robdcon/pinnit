import { createContext } from 'react';

interface BoardContextProps {
    board: object
}

const defaultValue: BoardContextProps = {
    board: {}
};

export const BoardContext = createContext<BoardContextProps | undefined>(defaultValue);