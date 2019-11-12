import React, { useEffect } from 'react';
// import './Login.css';
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
    keys }) {

    useEffect(() => {
        setPath("/login");
    })

    return (
        <div className="Login">
            <br />
            <Header path={path} setPath={setPath} keys={keys} auth={auth} setAuth={setAuth} 
            user={user} setUser={setUser}/>
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} results={results} setResults={setResults}
                    query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />
            </main>
        </div>
    );
}

