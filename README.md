#Data Aggregation Pipeline


## Creating Own Project
### Initalize Node Repo

```sh
    $ npm init -y
```
- Add .env file

### Initalize Git 
```sh
    $ git init
```
- Add .gitignore
- Add node_modules and .env on .gitignore

### Install Dependencies manually
```sh
    npm install express mongodb dotenv mongoose
    npm install nodemon -D
```

Data Reference - https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/

#### This is an example of the aggregation pipeline syntax:
    pipeline = [
            { $match : { … } },
            { $group : { … } },
            { $sort : { … } }
        ]

















## Start working with Existing Project

### Install Dependencies

```sh
    npm install
```


### Start dev
- Start with Development server

```'sh
    npm run dev
```


### Start app
- Start with acctual server
```'sh
    npm start
```


