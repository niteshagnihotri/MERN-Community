import React, { useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Routing from './components/Routing';
import { reducer } from './reducer/reducer';


const initialState = false;

export const UserContext = React.createContext(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
