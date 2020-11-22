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

  Ce composant affiche le titre d'une tâche et les bouttons permettant de rediriger l'utilisateur vers la page de détails ou de modification de la tâche.

  Le composant Task doit aussi posséder l'Id de la tâche car les pages de détails ou de modification en auront besoin.

*/

const Task = ({ taskId, title }) => {

  const dispatch = useTasksDispatch();

  function handleDelete(id) {
    dispatch({ type: "DELETE_TASK", payload: { _id: id } })
  }

  return (
    <li>
      <div>
        <p>{title}</p>
        <button><Link to={`/task/${taskId}`} >details</Link></button>
        <button><Link to={`/submit/${taskId}`}>edit</Link></button>
        <button onClick={() => handleDelete(taskId)}>delete</button>
      </div>
    </li>
  )
}

/*

  Ce composant afficher une collection de tâche. 

*/
const TaskList = ({ tasks }) => {
  return (
    <div>
      <ul>
        {tasks.map(task => {
          return (
            <Task key={task._id} taskId={task._id} title={task.title} />
          )
        })}
      </ul>
      <button><Link to={`/submit`}>Create a task</Link></button>
    </div>
  )
}

/*

  Affiche les attributs d'une tâche. 

*/
const TaskDetails = () => {
  //Je récupère de l'Id dans la route
  let { taskId } = useParams();
  //Je récupère la tâche qui correspond à cet ID
  const task = useTasksState().find(task => {
    return task._id === taskId;
  });

  return (
    <div>
      <p>{task.title}</p>
      <p>{task.details}</p>
      <p>{task.body}</p>
      <p>{task.createdAt}</p>
      <p>{task.modfiedAt}</p>
      <p>{task.archivedAt}</p>
      <Link to="/">Previous</Link>
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

          {/* <Route path="/" exact>
        <TaskForm />
        </Route> */}

        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
