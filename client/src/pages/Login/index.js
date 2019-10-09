import React from 'react';
// import './Login.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';

function Login() {
    return (
        <div className="Login">
            <br />
            <Header />
            <br />
            <br />

            <main>
                <SearchBar />
            </main>

            <Footer />
        </div>
    );
}

export default Login;
