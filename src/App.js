import './App.css';
import { useTasksState, useTasksDispatch } from "./tasks-context";

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
  return (
    <li>
      <div>
        <p>{title}</p>
        <button>details</button>
        <button>edit</button>
      </div>
    </li>
  )
}

/*

  Ce composant afficher une collection de tâche. 

*/
const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(task => {
        return (
          <Task key={task._id} taskId={task._id} title={task.title} />
        )
      })}
    </ul>
  )
}

/*

  Affiche les attributs d'une tâche. 

*/
const TaskDetails = ({ task }) => {
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.details}</p>
      <p>{task.body}</p>
      <p>{task.createdAt}</p>
      <p>{task.modfiedAt}</p>
      <p>{task.archivedAt}</p>
    </div>
  )
}

/*

  Mon idée avec ce composant est de lui faire avoir un rôle différent en fontion de l'usage. En effet il peut soit 
  servir à créer une toute nouvelle tâche ou bien modifier une tâche existante. Cela va se faire en déterminant 
  si une prop "task" lui est passé ou non.

  < TaskForm /> // => Act as a creation task form 
  < TaskForm taskId={taskId} /> // => Act as a modification task form 

*/

const TaskForm = ({ task }) => {
  function handleChange() {

  }
  return (

    <div>
      <form action="">
        <div>
          <label htmlFor="title">Task title</label>
          <input onChange={handleChange} value={task ? task.title : ""} type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="description">Task description</label>
          <input onChange={handleChange} value={task ? task.description : ""} type="text" name="description" id="description" />
        </div>
        <div>
          <label htmlFor="body">Task body</label>
          <input onChange={handleChange} value={task ? task.body : ""} type="text" name="body" id="body" />
        </div>
        <input type="submit" value={task ? "Edit" : "Add"} />
      </form>
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
      <TaskList tasks={tasks} />
      <TaskDetails task={tasks[0]} />
      <TaskForm task={tasks[0]} />
      <TaskForm />
    </Layout>
  );
}

export default App;
