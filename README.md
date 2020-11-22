#Todo App

# Découper l'interface en composants

Avant de plonger dans le code il est important de faire un travail de plannification en amont pour structurer notre projet et découper notre interface en composant pour un code plus compréhensible, maintenable et scalable. 

Le rôle de l’interface utilisateur est de représenter graphiquement, de manière esthétique et fonctionnelle, le modèle de donnée envoyé par le serveur qui doit être affiché à l’utilisateur. SI ce modèle à bien été conçu en amont, l’interface utilisateur est donc très souvent le reflet de ce modèle. Chaque composant de notre UI doit faire qu’une seule et unique chose et correspondre à élément de notre modèle.

En fonction du cahier des charges qui m'a été fourni j'ai défini le modèle donnée avec lequel je vais travailler coté front. C'est un mock qui représente un modèle de donnée JSON qu'un serveur pourrait envoyé au client. 

### Page 1: Afficher la liste des tâches

La première page est accessible lorsqu’on lance l’application : elle affiche une liste de todo. Sur chaque ligne de cette liste apparaît le titre du todo au bout : un bouton pour modifier le todo et un bouton pour voir le détail du todo. En dessous de cette liste il faut un bouton Créer un todo. Voici Le modèle de donnée pour cette page: 


```
{
	tasks: [
	{
  		"_id": "5cf0029caff5056591b0ce7d",
  		"title": "Ma première tâche",
  		"description": "Créer une application type todo list",
  		"body" : "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement.",
  		"createdAt": "2020-11-20T12:40:45Z",
  		"modfiedAt": "2020-11-20T18:33:48Z",
  		"archivedAt": "2020-11-22T12:10:48"
	},
	{
  		"_id": "9cf0029caff5024531b0ce7d",
  		"title": "Une seconde tâche",
  		"description": "Mettre en ligne l'application",
  		"body" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo urna, placerat ac fermentum malesuada, eleifend sit amet sapien. Proin condimentum dolor non urna iaculis finibus.",
  		"createdAt": "2020-11-22T08:13:45Z",
  		"modfiedAt": "2020-11-22T10:30:48Z",
  		"archivedAt": "2020-11-23T12:00:00"
	}
]
}
```

| Field | Type | Description |
| ----- | ---- | ----------- |
| tasks | Array | A list of Tasks |

En fonction du modèle de donnée et du cahier des charges j'ai décidé de découper mon interface principale en deux composant: 

+ TasksList (bleu): Affiche la collection de tâches 
+ Task (rouge): Affiche le titre d'une tâche, le bouton qui redirige vers la page qui affiche les détails d'une tâche et celui qui redirige l'utilisateur vers la page d'édition de la tâche.

Le cahier des charges stipule également que l'on retrouver en bas de la page un boutton qui redirige vers la page de création d'une tâche. Il n'est pas nécessaire de créer un composant pour ce dernier car il ne tient pas de logique et n'est pas réutiliser dans l'application. 

![page1](./assets/tasks-list.png)

Ma hiérarchie de composant ressemble donc à: 

```
- TasksList
	- Task
```

###Page 2: Afficher les détails d'une tâche

La deuxième page est accessible en cliquant sur le détail d’une todo : elle affiche tous les attributs d’un todo récupéré. Le modèle de donnée pour cette page est le suivant: 


```
{
  "_id": "5cf0029caff5056591b0ce7d",
  "title": "My first ever task",
  "description": "Créer une application type todo list",
  "body" : "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement."
  "createdAt": "2020-11-20T12:40:45Z",
  "modfiedAt": "2020-11-20T18:33:48Z",
  "archivedAt": "2020-11-22T12:10:48"
}
```

| Field | Type | Description |
| ----- | ---- | ----------- |
| _id | String | The Task ID |
| title | String | The Task Title |
| description | String | Short description of the Task |
| body | String | Riche details about the Task |
| createdAt | String | Creation date of the Task in ISO 8601 format |
| modfiedAt | String | Modification date of the Task in ISO 8601 format |
| archivedAt | String | Achievement date of the Task in ISO 8601 format |

![page2](./assets/task-details.png)

On va donc créer un composant dont le rôle va être de représenter graphiquement à l'utilisateur des détails relatifs à la tâche. 

+ TaskDetails (rouge): Affiche les attributs d'une tâche. 

###Page 3: Modification / Création d'une tâche 

La troisième page accessible soit en cliquant sur Créer un todo sur la première page soit en cliquant sur modifier un todo, permet de modifier ou créer un todo supplémentaire.

L'idée ici est d'avoir un composant qui permet à l'utilisateur de créer un modèle de donnée représentant une tâche ou modifier un modèle existant, puis d'envoyer ce nouveau modèle au serveur (ou le faire persisté directement dans le state de l'application coté front).

On va donc utiliser un formulaire qui va collecter via ces inputs les différentes informations dont on a besoin pour créer ou modifier une tâche.

```
{
  "title": "My first ever task",
  "description": "Créer une application type todo list",
  "body" : "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement."
}
``` 

| Field | Type | Description |
| ----- | ---- | ----------- |
| title | String | The Task Title |
| description | String | Short description of the Task |
| body | String | Riche details about the Task |

![page3](./assets/task-form.png)

On va donc créer un composant dont le rôle va être de collecter les informations nécessaire pour construire le modèle de donnée JSON représentant la nouvelle tâche/tâche modifiée. 

+ TaskDetails (rouge): Collecte les attributs d'une tâche. 


# Conception de la version statique 

### Definition des props

Un composant react qui rempli bien son rôle doit être initialisé avec des données qui recoit via ces props. On va laisser à un composant parent de la hiérarchie le rôle de posséder et maintenir un état des données de l'application, ainsi que de faire descendre ce flux de données vers les composants enfants via leur props. Dans notre cas ce composant sera simplement le composant racine "App". 

```
// App.js - Our component container

const App = () => {
	return (
		//Children components here
	)
}
```

#### TasksList

Ce composant afficher une collection de tâche. 

| Prop | Description  | 
| ----- | ----------- | 
| tasks | Une collection de tâche  | 

#### Task

Ce composant affiche le titre d'une tâche et les bouttons permettant de rediriger l'utilisateur vers la page de détails ou de modification de la tâche.

| Prop | Description  | 
| ----- | ----------- | 
| taskId | L'id de la tâche |
| title | Le titre de la tâche |

Le composant Task doit aussi posséder l'Id de la tâche car les pages de détails ou de modification en auront besoin.

#### TaskDetails

Affiche les attributs d'une tâche. 

| Prop | Description  | 
| ----- | ----------- | 
| task | Le modèle de donnée représentant la tâche |

#### TaskForm

Mon idée avec ce composant est de lui faire avoir un rôle différent en fontion de l'usage. En effet il peut soit servir à créer une toute nouvelle tâche ou bien modifier une tâche existante. Cela va se faire en déterminant si une prop "task" lui est passé ou non.

```
< TaskForm /> // => Act as a creation task form 
< TaskForm taskId={taskId} /> // => Act as a modification task form 
```
| Prop | Description  | 
| ----- | ----------- | 
| task | Le modèle de donnée représentant la tâche |


### Layout - Composant de mise en page  

Pour mieux organiser mon code j'ai égalment décider d'ajouter un composant Layout qui a pour but de définir la structure de mise en page de notre application. Je vais utiliser le modèle de composition de React (via la prop "children") pour ne pas avoir à imbriquer les composants enfant à l'intérieur du code de Layout et être obligé d'utiliser du props drilling pour faire descendre les données. 

```
// App.js - Our component container

//Using children prop we avoid to abuse of props drilling 
//Indeed, Layout component doesn't need access to data model 

const Layout = ({children}) => {
	return (
		<div className="layou">
			{children}
		</div>
	)
}

const App = () => {
	return (
		<Layout>
			//Children components here
		</Layout>
	)
}
```

#### Notre Hérarchie de composant
 
En fonction de tout ça voici la hérarchie complète des compsants de notre application

```
- App
	- Layout 
		- TasksList
			- Task
		- TaskDetails  
		- TaskForm
```

On peut donc maintenat construire notre version statique en partant du composant parent puis en descendant au fur et à mesure en passant les données via les props. 

#### Définition du mock 

Avant tout dans notre composant parent App on va définir le mock de notre modèle de donnée qui va être utilisé dans l'application. 


```
[
	{
  		"_id": "5cf0029caff5056591b0ce7d",
  		"title": "Ma première tâche",
  		"description": "Créer une application type todo list",
  		"body" : "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement.",
  		"createdAt": "2020-11-20T12:40:45Z",
  		"modfiedAt": "2020-11-20T18:33:48Z",
  		"archivedAt": "2020-11-22T12:10:48"
	},
	{
  		"_id": "9cf0029caff5024531b0ce7d",
  		"title": "Une seconde tâche",
  		"description": "Mettre en ligne l'application",
  		"body" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo urna, placerat ac fermentum malesuada, eleifend sit amet sapien. Proin condimentum dolor non urna iaculis finibus.",
  		"createdAt": "2020-11-22T08:13:45Z",
  		"modfiedAt": "2020-11-22T10:30:48Z",
  		"archivedAt": "2020-11-23T12:00:00"
	}
]

```

# Rendre l'interface interactive et mettre en place le state management

(Disclamer: Dans un projet réaliste d'application utilsant une API pour gérer les tâches, je n'aurais pas fait ce choix technique. J'aurais privilégié un state management local plus simple. En effet j'aurais privilégié le fait d'utiliser les routes de l'API, par exemple une requête POST pour créer une nouvelle tâche puis de retour sur la page principale j'aurais fetché de nouveau ma liste de tâche. Pareil pour la page des détails d'une tâche, j'aurais utilisé une requête GET sur la route /tasks/:taskId, etc... Pour plus de détail voir le document ***"Fake API doc"***.)

Pour déterminer l'état local modifiable de chaque composant il faut se demander si la donnée utilisé dans l'application est passé via les props ou non, et également si cette donnée va être améné à évoluer en fonction du temps. 

Selon cette description il y'a donc deux données qui vont être géré par de l'état local: 

- La collection de tâche 
- Les données collectée par le formulaire d'ajout et de modification de tâche


### Mon choix technique pour le state management 

### 1) Pour la collection de tâches: 

Sans serveur et base de donnée, la logique de gestion des tâches va devoir se faire intégralement coté Front. Il est donc nécessaire de mettre en place un state management global qui nous permet de gérer l'état local modifiable de l'application. Pour se faire je vais utiliser deux compsantes de React: l'API React Context et l'API des Hooks avec useReducer.


#### useReducer

useReducer est un hook React qui nous permet de faire de la gestion de state plus complexe. C'est le cas pour la gestion des tâches. En effet, on va devoir mettre à jour ce state soit en ajouter, en modifiant ou en supprimant une tâche. Il est donc plus intéressant d'avoir cette logique dans une fonction reducteur qui se fait en fonction que tel ou tel type d'action soit dispatché. 

```
function reducer(state, action) {
    //On switch selon le type d'action dispatché
    switch (action.type) {
        case "ADD_TASK":
            //Logique pour ajouter une tâche ici
            return { tasks: [...state.tasks] };
            break;
        case "EDIT_TASK":
            //Logique pour modifier une tâche ici
            return { tasks: [...state.tasks] }
            break;
        case "DELETE_TASK":
            //Logique pour supprimer une tâche ici
            return { tasks: [...state.tasks] }
            break;
    }
}
```

#### API Contexte

Un context React va nous permettre de faire passer une donnée au travers de la l'arbre de composant sans avoir à faire du props drilling à chaque niveau de la hiérarchie. Dans notre cas on va faire passer l'état local qui possède la collection de tâche mais également notre fonction dispatch pour distacher des actions à notre réducteur. 

```
const TasksStateContext = React.createContext(); 

const TasksDispatchContext = React.createContext(); 
```

+ TasksStateContext: Ce premier contexte va nous permettre de faire passer notre modèle de donnée représentant la collection de tâches au travers de l'arbre de composant pour qu'il soit accéssible au composant

+ TasksDispatchContext: Ce second contexte va nous permettre de passer la fonction de dispatch à tous nos composants

```createContext()``` renvoi un objet contexte qui tient une propriété "Provider". Ce Provider est en fait un composant react avec lequel on va pouvoir venir emrober notre hiérarchie de composant. On peut passer un attribut "value" à ce composant et donner à cet attribut une valeur avec laquelle intialiser le contexte pour la portion de l'arbre de composant enrobé par ce provider 

```
<Provider value={defaultValue}>
	//Children 
</Provider>
```

### Résulat

On peut donc maintenant venir enrober notre application avec nos Providers et faire passer nos contexts au travers de la hierarchie de composant. 

```
<TasksProvider>
  <App />
</TasksProvider>
```

On peut ensuite utiliser les données grâce à notre custom hook qui utilise useContext en interne

```
//Permet de récupérer l'état local qui représente la collection de tâche
const tasks = useTasksState(); // => tasks[]
```

### 2) Pour les données collectée par le formulaire

Pour cet état local je vais simplement utiliser le hook useState qui permet d'intialiser un état local et de le mettre à jour. Pour éviter de répéter la logique de mise à jour du state pour chaque input je vais utiliser un custom hook: 

```
function useInput(initialValue)  {
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
```

J'utilise égalemnt un état local qui détermine si le formulaire est en mode ajout ou edit.

# React Router et routes de l'application

Voici les différentes routes de l'application 


| Path | Description | Component |
| ----- | ---- | ----------- |
| / | Page est accessible lorsqu’on lance l’application | TasksList |
| /task/:taskId | Accessible en cliquant sur le détail d’une todo : elle affiche tous les attributs d’un todo récupéré | TaskDetails |
| /submit | accessible soit en cliquant sur Créer un todo sur la première page soit en cliquant sur modifier un todo | TaskForm |












