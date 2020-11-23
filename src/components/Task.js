import React, { useState } from 'react';
import { useTasksDispatch } from "../tasks-context";

//REACT ROUTER 
import {
    Link,
} from "react-router-dom";
/*

  Ce composant affiche le titre d'une tâche et les bouttons permettant de rediriger l'utilisateur vers la page de détails ou de modification de la tâche.

  Le composant Task doit aussi posséder l'Id de la tâche car les pages de détails ou de modification en auront besoin.

*/

const Task = ({ taskId, title, archivedAt }) => {

    const dispatch = useTasksDispatch();

    //J'ajoute un UI state pour désactiver le btn de modification si la tâche est achevée
    const [isAchieved, setIsAchived] = useState(!!archivedAt);

    //Lorsque l'input de type checkbox est coché, on dispatch l'action de type DELETE_TASK
    //Coté reducteur on va attribuer une valeur à "achievedAt"
    function checkTask(e, id) {
        console.log('checked');
        dispatch({ type: "DELETE_TASK", payload: { _id: id } })
        //On désactive donc l'input une fois la tâche effectuée
        e.target.disabled = true;
        //On désactive le button de modification
        setIsAchived(true);
    }

    return (
        // <li key={task.id}><input defaultChecked={task.isCompleted} type="checkbox" name="task" id="" onChange={(e) => checkTask(e, task.id)} /><label htmlFor="">{task.description}</label></li>
        <li>
            <div className="task-item">
                <div className="task-item__checkbox">
                    <input checked={isAchieved} disabled={isAchieved} type="checkbox" name="task" id={taskId} onChange={(e) => checkTask(e, taskId)} />
                    <label htmlFor={taskId}>{title}</label>
                </div>
                <button className="btn btn-default"><Link to={`/task/${taskId}`} >details</Link></button>
                {!isAchieved && <button className="btn btn-default"><Link to={`/submit/${taskId}`}>edit</Link></button>}
                {/* <button onClick={() => handleDelete(taskId)}>delete</button> */}
            </div>
        </li>
    )
}

export default Task;