import React, { useState } from 'react';
import moment from "moment";

//Utils

//Fonction pour générer un ID
import { ID } from "../utils/id";

//State management 
import { useTasksDispatch } from "../tasks-context";

/*

  Mon idée avec ce composant est de lui faire avoir un rôle différent en fontion de l'usage. En effet il peut soit 
  servir à créer une toute nouvelle tâche ou bien modifier une tâche existante. Cela va se faire en déterminant 
  si une prop "task" lui est passé ou non.

  < TaskForm /> // => Act as a creation task form 
  < TaskForm taskId={taskId} /> // => Act as a modification task form 

*/

const TaskForm = ({ task }) => {
    //Permet de récupérer la fonction de dispatch pour dispatcher une action à notre reducteur
    const dispatch = useTasksDispatch();

    //J'utilise un état local pour déterminer si mon formulaire est en mode edit ou ajout d'un tâche
    const [actionType, setActionType] = useState(task ? "EDIT_TASK" : "ADD_TASK");

    //Notre formulaire possède des données qui sont ammené à évoluer en fonction du temps (champs du formulaire)
    //On va donc utiliser un état local pour gérer ça
    //Pour éviter de répéter la logique de mise à jour du state pour chaque input je vais utiliser un custom hook.
    const { value: title, bind: bindTitle, reset: resetTitle } = useInput(task ? task.title : "");
    const { value: description, bind: bindDescription, reset: resetDescription } = useInput(task ? task.description : "");
    const { value: body, bind: bindBody, reset: resetBody } = useInput(task ? task.body : "");

    //Gestionnaire d'évenement pour la soumission du formulaire 
    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {
            _id: ID(),
            title,
            description,
            body,
            createdAt: moment().toISOString(),
            modfiedAt: null,
            archivedAt: null
        };
        dispatch({ type: actionType, payload: task });
    }


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} action="">
                <div>
                    <label htmlFor="title">Task title</label>
                    <input {...bindTitle} type="text" name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="description">Task description</label>
                    <input {...bindDescription} type="text" name="description" id="description" />
                </div>
                <div>
                    <label htmlFor="body">Task body</label>
                    <input {...bindBody} type="text" name="body" id="body" />
                </div>
                <input type="submit" value={task ? "Edit" : "Add"} />
            </form>
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