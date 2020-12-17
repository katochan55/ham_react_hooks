import React, { useEffect, useReducer } from 'react';
import EventForm from './EventForm';
import Events from './Events';
import OperationLogs from './OperationLogs';
import reducer from '../reducers';
import AppContext from '../contexts/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const APP_KEY = 'appWithRedux';

const App = () => {
  const appState = localStorage.getItem(APP_KEY);
  const initialState = appState ? JSON.parse(appState) : {
    events: [],
    operationLogs: []
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // stateを監視し、更新がある度にcallbackを実行
  useEffect(() => {
    // JSON.stringifyでlocalStorageに格納できる形式（文字列）に変換
    // e.g. {"events":[{"id":1,"title":"adf","body":"adf"}],"operationLogs":[{}]}
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container-fluid">
        <EventForm/>
        <Events/>
        <OperationLogs/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
