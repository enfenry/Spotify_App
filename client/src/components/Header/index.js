import React from 'react';
import './Header.css';
import { A } from 'hookrouter';


export default function Header() {

    return (
        <>
            <A href="/"><h1><span className="emphasis">This</span>Weekend</h1></A>
        </>
    )
}