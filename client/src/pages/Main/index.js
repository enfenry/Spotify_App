import React, { useEffect } from 'react';
// import './Main.css';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

export default function Login({
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
    accessToken,
    setAccessToken,
    keys }) {

    useEffect(() => {
        setPath("/");
    })

    return (
        <div className="Main">
            <br />
            <Header path={path} setPath={setPath} keys={keys} auth={auth} setAuth={setAuth} 
            user={user} setUser={setUser} accessToken={accessToken} setAccessToken ={setAccessToken}/>
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} results={results} setResults={setResults}
                    query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />
            </main>
        </div>
    );
}

