import { useTasksState } from "../tasks-context";
import moment from "moment";

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

    function formatDate(str) {
        let unix = Date.parse(str);
        let date = moment(unix);
        return date.format('lll');
    }

    return (
        <div className="task-details">

            <p className="task-details__title">{task.title}</p>
            <p className="task-details__description">{task.description}</p>
            <span className="task-details__label">Description</span>
            <p className="task-details__body">{task.body}</p>
            {task.createdAt && <p className="task-details__date"><u>created at:</u> {formatDate(task.createdAt)}</p>}
            {task.modfiedAt && <p className="task-details__date"><u>modified at:</u> {formatDate(task.modfiedAt)}</p>}
            {task.archivedAt && <p className="task-details__date"><u>achieved at:</u> {formatDate(task.archivedAt)}</p>}
            <button className="inline-btn">
                <Link to="/">Previous</Link>
            </button>
        </div>
    )
}

export default TaskDetails;