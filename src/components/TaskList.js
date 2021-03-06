import {
    Link
} from "react-router-dom";

//import component
import Task from "./Task";
/*

  Ce composant afficher une collection de tâche. 

*/
const TaskList = ({ tasks }) => {
    return (
        <div className="task-list">
            <ul>
                {tasks.map(task => {
                    return (
                        <Task key={task._id} taskId={task._id} title={task.title} archivedAt={task.archivedAt} />
                    )
                })}
            </ul>
            <button className="task-list__btn btn btn-blue"><Link to={`/submit`}>Create a task</Link></button>
        </div>
    )
}

export default TaskList;