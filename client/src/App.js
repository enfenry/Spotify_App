import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
// import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login'
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';

export default function App() {

  const [path, setPath] = useState("/");
  const [results, setResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({src: "", artistName: ""});
  const [query, setQuery] = useState('');
  const [data, setData] = useState({ hits: [] });

  // const envs = require("dotenv").config();
  // console.log('envs',envs);
  
  console.log('google key',process.env.REACT_APP_GOOGLE_KEY);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('/api/places');
      console.log('res',res);

      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`,
      );
      setData(result.data);
    };
    fetchData();
  }, [query]);


  const renderSwitch = (path) => {
    switch (path) {
      case "/":
        return <Login path={path} setPath={setPath} results={results} setResults={setResults} query={query} setQuery={setQuery} data={data} setData={setData} />;
      case "/results":
        return <Results path={path} setPath={setPath} results={results} setResults={setResults} modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} query={query} setQuery={setQuery} data={data} setData={setData} />;
      default:
        return <Login path={path} setPath={setPath} results={results} setResults={setResults} query={query} setQuery={setQuery} data={data} setData={setData} />;
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
