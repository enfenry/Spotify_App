import React, { useEffect } from 'react';
// import './Main.css';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

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
    setAccessToken,
    keys }) {

    useEffect(() => {
        setPath("/");
    })

    return (
        <div className="Main">
            <br />
            <Header path={path} keys={keys} auth={auth} setAuth={setAuth} 
            user={user} setUser={setUser} setAccessToken ={setAccessToken}/>
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} setResults={setResults}
                    query={query} setQuery={setQuery} keys={keys} />
            </main>
        </div>
    );
}

