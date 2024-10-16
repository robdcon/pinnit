import {css} from 'styled-components';

export const centerContent = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const customButtonStyles = css`
    background-color: transparent;
    border: 2px solid #dddddd;
    color: ${({theme}) => theme.colors.primaryColor};

    &:before, &:after {
        content: '';
        border-style: solid;
        border-color: ${({theme}) => theme.colors.primaryColor};
        position: absolute;
        z-index: 999;
        border-radius: 3px;
        box-sizing: content-box;
        transition: height 0.5s, width 0.5s;
    }

    &:before {
        width: 0;
        height: 100%;
        border-width: 2px 0 2px 0;
        top: -2px;
        left: -2px;
        transition-delay: 0.05s;
    }

    &:after {
        width: 100%;
        height: 0;
        border-width: 0 2px 0 2px;
        top: -2px;
        left: -2px;
    }

    ${'' /* &:hover {
        border-color: ${({theme}) => theme.colors.primaryColor};
    } */}

    &:active {
        border-color: transparent;
    }

    &:hover:before {
        width: calc(100% + 4px);
    }

    &:hover:after {
        height:calc(100% + 4px);
    }
`;

export const hoverStyles = ({color, hoverColor}) => css`
    &:hover {
        color: ${hoverColor};  
        &[aria-current="page"]:after {
            width: 100%;
        }
    }

    &[aria-current="page"] {
        &:after, &:before {
            content: '';
            position: absolute;
            display: block;
            height: 100%;
            left: 0;
            top: 0;
            transition: 0.2s ease-in-out;
        }

        &:after {
            width: 0;
            border-bottom: 2px solid ${hoverColor};
        }

        &:before {
            width: 100%;
            border-bottom: 2px solid ${color};
        }
    }
`;