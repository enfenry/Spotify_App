import React, { useState, useReducer } from 'react';
import './App.css';
import { useRoutes } from 'hookrouter';
import Main from './pages/Main.js'
import Results from './pages/Results.js'
import Container from 'react-bootstrap/Container';
import Footer from './components/Footer.js';
import { ThemeContext, themes } from './themes';

export const MyContext = React.createContext(null);
export const ResultsContext = React.createContext(null);

export default function App() {

  // ------------------------------------------
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_RESULTS':
        return { ...state, results: action.results }
      default:
        return initialState;
    }
  }

  const initialState = { type: 'SET_RESULTS', results: [] };
  const [resultsState, dispatch] = useReducer(reducer, initialState);
  // ------------------------------------------

  // Assign state variables
  // TODO: Cut down on declaring so many and especially passing so many (useContext)
  const [path, setPath] = useState(localStorage.getItem('path') || undefined);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || undefined);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [auth, setAuth] = useState(JSON.stringify(user) !== JSON.stringify({}));

  const mainPage =
    <Main path={path} setPath={setPath} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />

  const resultsPage =
    <Results path={path} setPath={setPath} auth={auth} setAuth={setAuth}
      user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />

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
        <ThemeContext.Provider value={themes.default}>
          <ResultsContext.Provider value={{ resultsState, dispatch }}>
            {MyApp()}
            <Footer />
          </ResultsContext.Provider>
        </ThemeContext.Provider>
      </Container>
    </div>
  );
}