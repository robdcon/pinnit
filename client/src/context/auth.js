import React, { createContext } from 'react';

const UserContext = createContext({});
UserContext.displayName = 'UserContext';
export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;



