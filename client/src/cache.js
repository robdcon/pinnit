import { InMemoryCache, makeVar } from '@apollo/client';

export const notesVar = makeVar([]);
export const boardsVar = makeVar([]);
export const currentBoardVar = makeVar(0);
export const loggedInUserVar = makeVar({});

export const cache = new InMemoryCache();
