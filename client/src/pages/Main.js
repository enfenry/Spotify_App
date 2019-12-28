import React, { useEffect } from 'react';
import Header from '../components/Header.js';
import SearchBar from '../components/SearchBar.js';
import Spotify from '../components/Spotify';
// import styled from 'styled-components';

export default function Main({
    path,
    setPath,
    setResults,
    query,
    setQuery,
    auth,
    setAuth,
    user,
    setUser,
    accessToken,
    setAccessToken,
    keys }) {

    useEffect(() => {
        localStorage.setItem("path","/")
        setPath("/");
    })

    return (
        <div className="Main">
            <br />
            <header>
                <Header />
                <Spotify path={path} keys={keys} auth={auth} setAuth={setAuth}
                    user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} popoverPlacement='right' />
            </header>
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} setResults={setResults}
                    query={query} setQuery={setQuery} keys={keys} accessToken={accessToken} />
            </main>
        </div>
    );
}

