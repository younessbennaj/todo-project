import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// STATE MAMAGEMENT 
import { TasksProvider } from "./tasks-context";

ReactDOM.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

