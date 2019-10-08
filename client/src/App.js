import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Header />
        <main>
          <SearchBar />
        </main>

        <Footer />

      </Container>
    </div>
  );
}

export default App;
