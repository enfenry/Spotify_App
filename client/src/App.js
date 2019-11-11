import React, { useState } from 'react';
import './App.css';
// import axios from 'axios';
// import { BrowserRouter, Route } from 'react-router-dom';
import { useRoutes } from 'hookrouter';
import Login from './pages/Login'
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';

export default function App() {

  const [path, setPath] = useState("/");
  const [results, setResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [query, setQuery] = useState('');
  const [data, setData] = useState({ hits: [] });

  const [keys] = useState({
    google: process.env.REACT_APP_GOOGLE_KEY,
    spotify: {
      id: process.env.REACT_APP_SPOTIFY_ID,
      secret: process.env.REACT_APP_SPOTIFY_SECRET
    },
    ticketmaster: process.env.REACT_APP_TICKETMASTER_KEY
  })

  const routes = {
    '/': () => <Login path={path} setPath={setPath} results={results} setResults={setResults}
      query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />,
    '/results': () => <Results path={path} setPath={setPath} results={results} setResults={setResults}
      modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
      query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />
  };

  const MyApp = () => {
    const routeResult = useRoutes(routes);
    return routeResult;
    // return routeResult || <NotFoundPage />;
  }

  return (
    <div className="App">
      <Container fluid>
          {MyApp()}
      </Container>
    </div>
  );

}
