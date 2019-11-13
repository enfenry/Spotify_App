import React, { useEffect } from 'react';
// import './Callback.css';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
// import { useRedirect } from 'hookrouter';

export default function Callback({
    path,
    setPath,
    results,
    setResults,
    query,
    setQuery,
    data,
    setData,
    auth,
    setAuth,
    user,
    setUser,
    keys }) {

    useEffect(() => {
        setPath("/callback");
        window.location = "/"
    })

    return (
        <div className="Callback">
            <br />
            <Header path={path} setPath={setPath} keys={keys} auth={auth} setAuth={setAuth}
                user={user} setUser={setUser} />
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} results={results} setResults={setResults}
                    query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />
            </main>
        </div>
    );
}

