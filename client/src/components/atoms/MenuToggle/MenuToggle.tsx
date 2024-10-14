import React from 'react';
import { MenuButton, CloseButton } from './MenuToggle.styles';

const MenuToggle = ({isNavOpen=false, action}) => {
  if(isNavOpen) {
      return (
      <CloseButton className={`menu-toggle`} onClick={action} />
    )
  } else {
    return (
      <MenuButton className={`menu-toggle`} onClick={action} />
    )
  }
};

export default MenuToggle;
