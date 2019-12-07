import React, {useContext} from 'react';
import { A } from 'hookrouter';
import { ThemeContext } from '../themes/themes';
import styled from 'styled-components';

const StyledSpan = styled.span`
    color: white;
`
const StyledLink = styled(A)`
    color: var(--color-primary-0);

    h1:hover {
        transition: .3s ease;
        opacity: .7;
    }

    &:hover {
        color: var(--color-primary-0);
        text-decoration: none;
        cursor: pointer;
    }
`


export default function Header() {

    const theme = useContext(ThemeContext);

    return (
        <>
            <StyledLink href="/"><h1><StyledSpan>This</StyledSpan>Weekend</h1></StyledLink>
        </>
    )
}