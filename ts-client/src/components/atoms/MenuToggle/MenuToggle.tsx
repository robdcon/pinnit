import React, {FC} from 'react';
import { MenuButton, CloseButton } from './MenuToggle.styles';

interface MenuToggleProps {
  isNavOpen: boolean;
  action: () => void;
}

const MenuToggle: FC<MenuToggleProps> = ({isNavOpen=false, action}) => {
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
