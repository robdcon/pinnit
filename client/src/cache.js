import { InMemoryCache, makeVar } from '@apollo/client';
import { useParams } from 'react-router-dom';

export const notesVar = makeVar([]);
export const boardsVar = makeVar([]);
export const currentBoardVar = makeVar();
export const loggedInUserVar = makeVar({});

export const cache = new InMemoryCache();
