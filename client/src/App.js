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
export const PathContext = React.createContext(null);

export default function App() {

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_RESULTS':
        return { ...state, results: action.results }
      case 'SET_PATH':
        return { ...state, path: action.path }
      default:
        return state;
    }
  }

  const initResults = { type: 'SET_RESULTS', results: [] };
  const [resultsState, dispatchResults] = useReducer(reducer, initResults);

  const initPath = { type: 'SET_PATH', path: localStorage.getItem('path') || undefined }
  const [pathState, dispatchPath] = useReducer(reducer, initPath);
  const path = pathState.path;

  // ------------------------------------------

  // Assign state variables
  // TODO: Cut down on declaring so many and especially passing so many (useContext)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || undefined);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [auth, setAuth] = useState(JSON.stringify(user) !== JSON.stringify({}));

  const mainPage =
    <Main auth={auth} setAuth={setAuth} user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />

  const resultsPage =
    <Results auth={auth} setAuth={setAuth} user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />

  const routes = {
    '/': () => { return mainPage },
    '/callback': () => {
      switch (path) {
        case '/results':
          return resultsPage;
        case '/':
          return mainPage;
        default:
          return <>No Page Found</>
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
          <ResultsContext.Provider value={{ resultsState, dispatchResults }}>
            <PathContext.Provider value={{ pathState, dispatchPath }}>
              {MyApp()}
              <Footer />
            </PathContext.Provider>
          </ResultsContext.Provider>
        </ThemeContext.Provider>
      </Container>
    </div>
  );
}