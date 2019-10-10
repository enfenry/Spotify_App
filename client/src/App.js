import React, { useState } from 'react';
import './App.css';
// import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login'
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';

export default function App() {

  const [path, setPath] = useState("/");

  const renderSwitch = (path) => {
    switch (path) {
      case "/":
        return <Login path={path} setPath={setPath} />;
      case "/results":
        return <Results path={path} setPath={setPath} />;
      default:
        return <Login />;
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
