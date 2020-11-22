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

export default TaskList;