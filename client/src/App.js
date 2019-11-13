import React, { useState } from 'react';
import './App.css';
import { useRoutes } from 'hookrouter';
import Main from './pages/Main'
import Results from './pages/Results'
import Container from 'react-bootstrap/Container';
import Footer from './components/Footer';

export default function App() {

  const [path, setPath] = useState("/");
  const [results, setResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [query, setQuery] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || undefined);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [auth,setAuth] = useState(JSON.stringify(user) !== JSON.stringify({}));
  const [keys] = useState({
    google: process.env.REACT_APP_GOOGLE_KEY,
    spotify: {
      id: process.env.REACT_APP_SPOTIFY_ID,
      secret: process.env.REACT_APP_SPOTIFY_SECRET
    },
    ticketmaster: process.env.REACT_APP_TICKETMASTER_KEY
  });

  const routes = {
    '/': () => <Main path={path} setPath={setPath} setResults={setResults}
      query={query} setQuery={setQuery} keys={keys} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} setAccessToken ={setAccessToken}/>,
    '/callback': () => <Main path={path} setPath={setPath} setResults={setResults}
    query={query} setQuery={setQuery} keys={keys} auth={auth} setAuth={setAuth}
    user={user} setUser={setUser} setAccessToken ={setAccessToken}/>,
    '/results': () => <Results path={path} setPath={setPath} results={results} setResults={setResults}
      modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
      query={query} setQuery={setQuery} keys={keys} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} setAccessToken ={setAccessToken}/>
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
