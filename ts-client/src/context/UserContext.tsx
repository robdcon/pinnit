import React from 'react';

interface UserContextProps {
  user: string
}

const defaultValue: UserContextProps = {
  user: ''
};

export const UserContext = React.createContext<UserContextProps>(defaultValue);