import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// STATE MAMAGEMENT 
import { TasksProvider } from "./tasks-context";

/*

<TasksProvider>
  <App />
</TasksProvider>

Ici on va enrober notre application avec notre provider pour faire passer le contexte des tâches et du dispatcher.

*/

ReactDOM.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

