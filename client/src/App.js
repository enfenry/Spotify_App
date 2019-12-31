import React, { useState, useReducer } from 'react';
import './App.css';
import { useRoutes } from 'hookrouter';
import Main from './pages/Main.js'
import Results from './pages/Results.js'
import Container from 'react-bootstrap/Container';
import Footer from './components/Footer.js';
import { ThemeContext, themes } from './themes';

export const MyContext = React.createContext(null);

export default function App() {

  // Assign state variables
  // TODO: Cut down on declaring so many and especially passing so many (useContext)
  const [path, setPath] = useState(localStorage.getItem('path') || undefined);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || undefined);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [auth, setAuth] = useState(JSON.stringify(user) !== JSON.stringify({}));
  const [keys] = useState({
    google: process.env.REACT_APP_GOOGLE_KEY,
    spotify: {
      id: process.env.REACT_APP_SPOTIFY_ID,
      secret: process.env.REACT_APP_SPOTIFY_SECRET
    },
    ticketmaster: process.env.REACT_APP_TICKETMASTER_KEY
  });

  const mainPage =
    <ThemeContext.Provider value={themes.default}>
      <Main path={path} setPath={setPath} setResults={setResults}
        query={query} setQuery={setQuery} keys={keys} auth={auth} setAuth={setAuth}
        user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />
    </ThemeContext.Provider>

  const resultsPage =
    <ThemeContext.Provider value={themes.default}>
      <Results path={path} setPath={setPath} results={results} setResults={setResults}
        query={query} setQuery={setQuery} keys={keys} auth={auth} setAuth={setAuth}
        user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />
    </ThemeContext.Provider>

  const routes = {
    '/': () => { return mainPage },
    '/callback': () => {
      switch (path) {
        case '/results':
          return resultsPage;
        case '/':
          return mainPage;
      }
    },
    '/results': () => { return resultsPage }
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
        <ThemeContext.Provider value={themes.default}>
          <Footer />
        </ThemeContext.Provider>
      </Container>
    </div>
  );
}