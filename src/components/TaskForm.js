import React, { useState } from 'react';
import moment from "moment";

//REACT ROUTER 
import {
    Link,
    useParams,
    useHistory
} from "react-router-dom";

//Utils

//Fonction pour générer un ID
import { ID } from "../utils/id";

//State management 
import { useTasksState, useTasksDispatch } from "../tasks-context";

/*

  Mon idée avec ce composant est de lui faire avoir un rôle différent en fontion de l'usage. En effet il peut soit 
  servir à créer une toute nouvelle tâche ou bien modifier une tâche existante. Cela va se faire en déterminant 
  si une prop "task" lui est passé ou non.

  < TaskForm /> // => Act as a creation task form 
  < TaskForm taskId={taskId} /> // => Act as a modification task form 

*/

const TaskForm = () => {
    //Pour rediriger l'utilisateur
    let history = useHistory();

    //Je récupère de l'Id dans la route
    let { taskId } = useParams();
    //Je récupère la tâche qui correspond à cet ID
    const task = useTasksState().find(task => {
        return task._id === taskId;
    });
    //Permet de récupérer la fonction de dispatch pour dispatcher une action à notre reducteur
    const dispatch = useTasksDispatch();

    //J'utilise un état local pour déterminer si mon formulaire est en mode edit ou ajout d'un tâche
    // const [actionType, setActionType] = useState(task ? "EDIT_TASK" : "ADD_TASK");

    //Notre formulaire possède des données qui sont ammené à évoluer en fonction du temps (champs du formulaire)
    //On va donc utiliser un état local pour gérer ça
    //Pour éviter de répéter la logique de mise à jour du state pour chaque input je vais utiliser un custom hook.
    const { value: title, bind: bindTitle, reset: resetTitle } = useInput(task ? task.title : "");
    const { value: description, bind: bindDescription, reset: resetDescription } = useInput(task ? task.description : "");
    const { value: body, bind: bindBody, reset: resetBody } = useInput(task ? task.body : "");

    //Gestionnaire d'évenement pour la soumission du formulaire 
    const handleSubmit = (e, task) => {
        e.preventDefault();

        const actionType = task ? "EDIT_TASK" : "ADD_TASK";

        const editMode = task ? true : false;

        const newTask = {
            //Si on modifie, on garde le même ID
            _id: editMode ? task._id : ID(),
            title,
            description,
            body,
            //Si on modifie, on garde la même date de création
            createdAt: editMode ? task._id : moment().toISOString(),
            //Si on modifie, on ajoute une date de modification
            modfiedAt: editMode ? moment().toISOString() : null,
            archivedAt: null
        };

        dispatch({ type: actionType, payload: newTask });

        if (actionType === "ADD_TASK") {
            //Si on est en mode ajout de tâche, on clear le form.
            resetTitle();
            resetDescription();
            resetBody();
        } else {
            //Si on est en mode édition, on renvoi l'user vers la home page
            history.push("/")
        }
    }


    return (
        <div className="form-container">
            <h2 className="form-title">{task ? "Edit your task" : "Add a new task"}</h2>
            <form onSubmit={(e) => handleSubmit(e, task)} action="">
                <div className="input-group">
                    <label htmlFor="title">Task title</label>
                    <input placeholder="Enter the title" {...bindTitle} type="text" name="title" id="title" />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Task description</label>
                    <input placeholder="Enter a short description" {...bindDescription} type="text" name="description" id="description" />
                </div>
                <div className="input-group">
                    <label htmlFor="body">Task body</label>
                    <textarea placeholder="Describe your task" {...bindBody} type="text" name="body" id="body" />
                </div>
                <input className="submit-btn" type="submit" value={task ? "Edit task" : "Add task"} />
            </form>
            <button className="inline-btn">
                <Link to="/">Previous</Link>
            </button>
        </div>
    )

}

//Pour éviter de répéter la logique de mise à jour du state pour chaque input je vais utiliser un custom hook.
function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};

export default TaskForm;