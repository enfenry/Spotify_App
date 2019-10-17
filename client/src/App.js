import React, { useState } from 'react';
import './App.css';
// import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login'
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';

export default function App() {

  const [path, setPath] = useState("/");
  const [results, setResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({src: "", artistName: ""});

  const renderSwitch = (path) => {
    switch (path) {
      case "/":
        return <Login path={path} setPath={setPath} results={results} setResults={setResults} />;
      case "/results":
        return <Results path={path} setPath={setPath} results={results} setResults={setResults} modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />;
      default:
        return <Login path={path} setPath={setPath} results={results} setResults={setResults} />;
    }
  };

  return (
    <div className="App">
      <Container fluid>
        {renderSwitch(path)}
      </Container>
    </div>
  );

  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //       <Container fluid>
  //         <Route exact path="/" component={Login} />
  //         <Route exact path="/results" component={Results} />
  //       </Container>
  //     </BrowserRouter>
  //   </div>
  // );
}
