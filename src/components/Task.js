import { useTasksDispatch } from "../tasks-context";

//REACT ROUTER 
import {
    Link,
} from "react-router-dom";
/*

  Ce composant affiche le titre d'une tâche et les bouttons permettant de rediriger l'utilisateur vers la page de détails ou de modification de la tâche.

  Le composant Task doit aussi posséder l'Id de la tâche car les pages de détails ou de modification en auront besoin.

*/

const Task = ({ taskId, title }) => {

    const dispatch = useTasksDispatch();

    function handleDelete(id) {
        dispatch({ type: "DELETE_TASK", payload: { _id: id } })
    }

    function checkTask(e, taskId) {

    }

    return (
        // <li key={task.id}><input defaultChecked={task.isCompleted} type="checkbox" name="task" id="" onChange={(e) => checkTask(e, task.id)} /><label htmlFor="">{task.description}</label></li>
        <li>
            <div className="task-item">
                <input type="checkbox" name="task" id="" onChange={(e) => checkTask(e, taskId)} />
                <p>{title}</p>
                <button><Link to={`/task/${taskId}`} >details</Link></button>
                <button><Link to={`/submit/${taskId}`}>edit</Link></button>
                <button onClick={() => handleDelete(taskId)}>delete</button>
            </div>
        </li>
    )
}

export default Task;