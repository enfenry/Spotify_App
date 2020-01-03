import React, { useEffect, useContext } from 'react';
import { PathContext } from '../App';
import Header from '../components/Header.js';
import SearchBar from '../components/SearchBar.js';
import Spotify from '../components/Spotify';

export default function Main({
    auth,
    setAuth,
    user,
    setUser
}) {

    const { dispatchPath } = useContext(PathContext);

    useEffect(() => {
        localStorage.setItem('path','/')
        dispatchPath({ type: 'SET_PATH', path: '/' });
    },[])

    return (
        <div className='Main'>
            <br />
            <header>
                <Header />
                <Spotify auth={auth} setAuth={setAuth} user={user} setUser={setUser} popoverPlacement='right' />
            </header>
            <br />
            <br />

            <main>
                <SearchBar />
            </main>
        </div>
    );
}

