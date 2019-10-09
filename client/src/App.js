import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login'
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid>
          <Route exact path="/" component={Login} />
          <Route exact path="/results" component={Results} />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
