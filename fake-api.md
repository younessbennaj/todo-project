
# Fake API doc

## Tasks - Read data of all Tasks 

##### GET /api/tasks

#### Success 200

```
{
	tasks: [
	{
  		"_id": "5cf0029caff5056591b0ce7d",
  		"title": "Ma première tâche",
  		"description": "Créer une application type todo list",
  		"body" : "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement."
  		"createdAt": "2020-11-20T12:40:45Z",
  		"modfiedAt": "2020-11-20T18:33:48Z",
  		"archivedAt": "2020-11-22T12:10:48"
	}
	{
  		"_id": "9cf0029caff5024531b0ce7d",
  		"title": "Une seconde tâche",
  		"description": "Mettre en ligne l'application",
  		"body" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo urna, placerat ac fermentum malesuada, eleifend sit amet sapien. Proin condimentum dolor non urna iaculis finibus."
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

### Error 4xx

```
{
	"title": "There is no tasks",
	"detail": "We could not find the list of tasks you requested."
}
```

| Field | Description |
| ----- | ---- | 
| title |  A short human-readable message about the error | 
| detail | Authentication failed due to incorrect username or password. | 

## Task - Read data of a Task

##### GET /api/tasks/:taskId

#### Success 200

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

### Error 4xx

```
{
	"title": "Incorrect task Id",
	"detail": "We could not find the task you requested."
}
```

| Field | Description |
| ----- | ---- | 
| title |  A short human-readable message about the error | 
| detail | Authentication failed due to incorrect username or password. | 

## Task - Create a new Task

##### POST /api/tasks

#### Parameter

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

#### Success 200

```
{
  "_id": "5cf0029caff5056591b0ce7d"
}
``` 

| Field | Type | Description |
| ----- | ---- | ----------- |
| _id | String | The new Task ID |


## Task - Modify a new Task

##### PUT /api/tasks/:taskId

#### Parameter

```
{
  "title": "My modified task",
  "description": "Créer une application type todo list",
  "body" : "L’application est une “todo list”. Un todo est composé d’un id, d’un titre (title), d’un corps de message (body), d’une date de création, d’une date de modification et d’une date de traitement."
}
```

#### Success 200

```
{
  "_id": "5cf0029caff5056591b0ce7d"
}
``` 

| Field | Type | Description |
| ----- | ---- | ----------- |
| _id | String | The Task ID |






