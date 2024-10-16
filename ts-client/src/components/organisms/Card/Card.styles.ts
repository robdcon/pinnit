import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
`

export const StyledCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    transition: all .3s ease-out;

    &:hover {
        box-shadow: 0px 4px 10px rgba(0,0,0,.1);
        transform: translateY(-2px);
    }
`;
