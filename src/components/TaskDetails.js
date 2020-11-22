import { useTasksState } from "../tasks-context";

//REACT ROUTER 
import {
    Link,
    useParams
} from "react-router-dom";

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

export default TaskDetails;