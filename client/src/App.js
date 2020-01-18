import React, { useReducer, useEffect } from 'react';
import './App.css';
import { useRoutes } from 'hookrouter';
import Main from './pages/Main.js'
import Results from './pages/Results.js'
import Container from 'react-bootstrap/Container';
import Footer from './components/Footer.js';
import { ThemeContext, themes } from './themes';

export const ModalContext = React.createContext(null);
export const ResultsContext = React.createContext(null);
export const PathContext = React.createContext(null);
export const TokenContext = React.createContext(null);
export const UserContext = React.createContext(null);

export default function App() {

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_RESULTS':
        return { ...state, results: action.results }
      case 'SET_PATH':
        return { ...state, path: action.path }
      case 'SET_TOKEN':
        return { ...state, accessToken: action.accessToken }
      case 'SET_USER':
        return { ...state, user: action.user }
      default:
        return state;
    }
  }

  const initResults = { type: 'SET_RESULTS', results: [] };
  const [resultsState, dispatchResults] = useReducer(reducer, initResults);

  const initPath = { type: 'SET_PATH', path: localStorage.getItem('path') || undefined };
  const [pathState, dispatchPath] = useReducer(reducer, initPath);
  const path = pathState.path;

  const initToken = { type: 'SET_TOKEN', accessToken: localStorage.getItem('access_token') || undefined };
  const [tokenState, dispatchToken] = useReducer(reducer, initToken);

  const initUser = { type: 'SET_USER', user: JSON.parse(localStorage.getItem('user')) || {} };
  const [userState, dispatchUser] = useReducer(reducer, initUser);

  const mainPage = <Main />;
  const resultsPage = <Results />;

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
    return routeResult || <>No Page Found</>;
  }

  return (
    <div className="App">
      <Container fluid>
        <ThemeContext.Provider value={themes.default}>
          <ResultsContext.Provider value={{ resultsState, dispatchResults }}>
            <PathContext.Provider value={{ pathState, dispatchPath }}>
              <TokenContext.Provider value={{ tokenState, dispatchToken }}>
                <UserContext.Provider value={{ userState, dispatchUser }}>
                  {MyApp()}
                  <Footer />
                </UserContext.Provider>
              </TokenContext.Provider>
            </PathContext.Provider>
          </ResultsContext.Provider>
        </ThemeContext.Provider>
      </Container>
    </div>
  );
}