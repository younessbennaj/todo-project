import React from 'react';
import './App.css';
import { useTasksState, useTasksDispatch } from "./tasks-context";

//REACT ROUTER 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

//Import components here
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import TaskList from "./components/TaskList";
/*  

  Pour mieux organiser mon code j'ai égalment décider d'ajouter un composant Layout qui a pour but de définir la 
  structure de mise en page de notre application. Je vais utiliser le modèle de composition de React 
  (via la prop "children") pour ne pas avoir à imbriquer les composants enfant à l'intérieur du code de Layout 
  et être obligé d'utiliser du props drilling pour faire descendre les données. 

*/

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div className="content">
        {children}
      </div>
    </div>
  )
}

/*

  On va laisser à un composant parent de la hiérarchie le rôle de posséder et maintenir un état des données de
  l'application, ainsi que de faire descendre ce flux de données vers les composants enfants via leur props.
  Dans notre cas ce composant sera simplement le composant racine "App". 

*/

function App() {
  //Permet de récupérer l'état local qui représente la collection de tâche
  const tasks = useTasksState();

  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" exact>
            <TaskList tasks={tasks} />
          </Route>
          <Route path="/task/:taskId" exact>
            <TaskDetails />
          </Route>
          <Route path="/submit/:taskId" exact>
            <TaskForm />
          </Route>
          <Route path="/submit" exact>
            <TaskForm />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
