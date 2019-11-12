import React, { useState } from 'react';
import './App.css';
// import axios from 'axios';
import { useRoutes } from 'hookrouter';
import Main from './pages/Main'
import Login from './pages/Login';
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';
import Footer from './components/Footer';

export default function App() {

  const [path, setPath] = useState("/");
  const [results, setResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [query, setQuery] = useState('');
  const [data, setData] = useState({ hits: [] });
  const [auth,setAuth] = useState(false);
  const [user,setUser] = useState({});

  const [keys] = useState({
    google: process.env.REACT_APP_GOOGLE_KEY,
    spotify: {
      id: process.env.REACT_APP_SPOTIFY_ID,
      secret: process.env.REACT_APP_SPOTIFY_SECRET
    },
    ticketmaster: process.env.REACT_APP_TICKETMASTER_KEY
  })

  

  const routes = {
    '/': () => <Main path={path} setPath={setPath} results={results} setResults={setResults}
      query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} />,
    '/callback': () => <Main path={path} setPath={setPath} results={results} setResults={setResults}
      query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} auth={auth} setAuth={setAuth} 
      user={user} setUser={setUser} />,
    '/results': () => <Results path={path} setPath={setPath} results={results} setResults={setResults}
      modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
      query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} />,
    '/login': () => <Login path={path} setPath={setPath} results={results} setResults={setResults}
      query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} />
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
        <Footer />
      </Container>
    </div>
  );

}
