# Formstack Front-End Developer Applicant Project

## Running the terminal API
Make sure to install the project dependencies (```npm install```), then run the server via ```node server.js```. It will be available at ```localhost:8080``` with the api accessible at ```/api```.

## API endpoints
The API has three endpoints to mimic terminal commands. You should implement all of these in your project.


### ls/:id
If no id is supplied, ```404``` will be returned.

Returns a filename if the resource is a file.

**example response**

```json
{
  "items" : [
    "app.js"
  ]
}
```

Returns a list of containing files if the resource is a folder.

**example response**

```json
{
  "items" : {
    "5" : {
      "name" : "app.js",
      "type" : "file"
    },
    "6" : {
      "name" : ".env",
      "type" : "file"
    },
    "7": {
      "name" : "config.js",
      "type" : "file"
    }
  }
}
```


### cat/:id
If no id is supplied, ```404``` will be returned.
If the id belongs to a folder, ```404``` will be returned.

Returns the content of the file as a string.

**example response**

```json
{
  "content" : ""
}
```


### autocomplete/:folder/:text
If you try to autocomplete on a resource that isn't a folder, ```404``` will be returned.

Returns a list of files / folders that match the supplied search string. If no string is specified, all resources will be returned.

**example response**

```json
{
  "items" : {
    "8" : {
      "name" : "index.html",
      "type" : "file"
    }
  }
}
```
