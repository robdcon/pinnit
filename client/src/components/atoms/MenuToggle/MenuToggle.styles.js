import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { media } from '../../../utils/media';

export const MenuButton = styled(MenuIcon)`
    right: 24px;
    top: 24px;
    z-index: var(--stack-level-1);
    color: ${({theme}) => theme.primaryColor};

    ${media.desktop`
        display: none;
    `}
`;

export const CloseButton = styled(CloseIcon)`
    right: 24px;
    top: 24px;
    z-index: var(--stack-level-1);
    color: ${({theme}) => theme.primaryColor};

    ${media.desktop`
        display: none;
    `}
`;