import React, { useState, useEffect } from 'react';
// import './Login.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';

export default function Login({path,setPath}) {

    // const [path, setPath] = useState("/");

    // {console.log(path)}

    useEffect(() => {
        console.log({setPath})
        setPath("/")
    })

    return (
        <div className="Login">
            <br />
            <Header path={path} setPath={setPath} />
            <br />
            <br />

            <main>
                <SearchBar path={path} setPath={setPath} />
            </main>

            <Footer />
        </div>
    );
}

