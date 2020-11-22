import React, { useReducer } from 'react';

// notre mock de donnée avec lequel on va intialiser notre état local
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

/*
    *** CONTEXT ***

    Un context React va nous permettre de faire passer une donnée au travers de la l'arbre de composant sans avoir
    à faire du props drilling à chaque niveau de la hiérarchie.

    TasksStateContext => Ce premier contexte va nous permettre de faire passer notre modèle de donnée représentant la collection 
    de tâches au travers de l'arbre de composant pour qu'il soit accéssible au composant

    TasksDispatchContext => Ce second contexte va nous permettre de passer la fonction de dispatch à tous nos composants
*/

const TasksStateContext = React.createContext(); //Renvoi un objet context

const TasksDispatchContext = React.createContext(); //Renvoi un objet context


/* 

    *** Context Provider ***

    Ce Provider est en fait un composant react avec lequel on va pouvoir venir emrober notre hiérarchie de composant.
    On peut passer un attribut "value" à ce composant et donner à cet attribut une valeur avec laquelle intialiser 
    le contexte pour la portion de l'arbre de composant enrobé par ce provider 

    Dans notre cas on a besoin de deux provider: 1 pour la collection de tâche et un autre pour le provider. On va utiliser
    un composant parent TasksProvider pour enrober ces deux providers et utiliser la composition avec la prop children
    pour insérer notre arbre de composant qui doit pouvoir utiliser ces deux contextes.

*/

/* 

    *** REDUCER ***

    useReducer est un hook React qui nous permet de faire de la gestion de state plus complexe. C'est le cas pour
    la gestion des tâches. En effet, on va devoir mettre à jour ce state soit en ajouter, en modifiant ou en 
    supprimant une tâche. Il est donc plus intéressant d'avoir cette logique dans une fonction reducteur qui se fait
    en fonction que tel ou tel type d'action soit dispatché. 

    const [state, dispatch] = useReducer(reducer, initState);

    state => notre état local qui possède la collection de tâche
    dispatch => fonction à laquelle on va passer l'action qu'on veut dispatcher au reducteur 
    reducer => fonction qui va contentir la logique de mise à jour du state en fonction d'un type d'action (on utilise un switch pour ça)
    initState => valeur avec laquelle on souhaite initialiser l'état local 

    */

function reducer(state, action) {
    //On switch selon le type d'action dispatché
    // [...state.tasks] => évite la mutation de l'état local
    switch (action.type) {
        case "ADD_TASK":
            //Logique pour ajouter une tâche ici
            console.log(action.payload);
            return { tasks: [...state.tasks] };
        case "EDIT_TASK":
            //Logique pour modifier une tâche ici
            return { tasks: [...state.tasks] }
        case "DELETE_TASK":
            //Logique pour supprimer une tâche ici
            return { tasks: [...state.tasks] }
        default:
            return { ...state }
    }
}

const TasksProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, { tasks: tasksModelMock })

    return (
        <TasksDispatchContext.Provider value={dispatch}>
            <TasksStateContext.Provider value={state.tasks}>
                {children}
            </TasksStateContext.Provider>
        </TasksDispatchContext.Provider>
    );
}

/*

    J'utilise ensuite des custom hooks pour utiliser ces contextes au sein de mes composants.

    J'utilise le hook useContext qui permet de travailler avec les contextes. On lui passe un objet context
    et il renvoi la valeur 

*/


function useTasksState() {
    //Renvoi la valeur avec laquelle on a intialiser l'attribut "value" du TasksStateContext.Provider
    const context = React.useContext(TasksStateContext);

    //Renvoi notre collection de tâche
    return context;
}

function useTasksDispatch() {
    //Renvoi la valeur avec laquelle on a intialiser l'attribut "value" du TasksDispatchContext.Provider
    const context = React.useContext(TasksDispatchContext);

    //Renvoi la fonction de dispatch
    return context;
}

/*

    Enfin j'exporte mon Provider pour enrober l'arbre de composant et mes deux custom hooks utiliser les contextes au sein des composants enfants de la hiérarchie

*/

export { TasksProvider, useTasksState, useTasksDispatch };
