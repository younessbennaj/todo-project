import './App.css';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div className="content">
        {children}
      </div>
    </div>
  )
}

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

function App() {
  const tasksModelMock = [
    {
      "_id": "5cf0029caff5056591b0ce7d",
      "title": "Ma première tâche",
      "description": "Créer une application type todo list",
      "body": "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement.",
      "createdAt": "2020-11-20T12:40:45Z",
      "modfiedAt": "2020-11-20T18:33:48Z",
      "archivedAt": "2020-11-22T12:10:48"
    },
    {
      "_id": "9cf0029caff5024531b0ce7d",
      "title": "Une seconde tâche",
      "description": "Mettre en ligne l'application",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo urna, placerat ac fermentum malesuada, eleifend sit amet sapien. Proin condimentum dolor non urna iaculis finibus.",
      "createdAt": "2020-11-22T08:13:45Z",
      "modfiedAt": "2020-11-22T10:30:48Z",
      "archivedAt": "2020-11-23T12:00:00"
    }
  ];

  return (
    <Layout>
      <TaskList tasks={tasksModelMock} />
      <TaskDetails task={tasksModelMock[0]} />
      <TaskForm task={tasksModelMock[0]} />
      <TaskForm />
    </Layout>
  );
}

export default App;
