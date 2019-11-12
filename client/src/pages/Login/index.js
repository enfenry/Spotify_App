import React, { useEffect } from 'react';
// import './Main.css';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
// import {useRedirect} from 'hookrouter';

export default function Login({
    path,
    setPath,
    results,
    setResults,
    query,
    setQuery,
    data,
    setData,
    keys }) {

    // useRedirect('/login', "https://api.spotify.com/v1/me");

    useEffect(() => {
        setPath("/login");
    })

    return (
        <div className="Login">
            <br />
            <Header path={path} setPath={setPath} />
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} results={results} setResults={setResults}
                    query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />
            </main>
        </div>
    );
}

