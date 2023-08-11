[![node CI](https://github.com/markCwatson/budgetpals/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/markCwatson/budgetpals/actions/workflows/node.js.yml)

## budgetpals
I am building a budgeting app that will also allow you to connect with other users.

More details to come.

## Running docker containers and testing

Right now the project consists of three docker containers: a simple api with few endpoints, an nginx reverse-proxy server, and a database. You can run and test this tandom by following these steps:

1. Set you environment variables inside a `.env` file at same level as the `docker-compose.yml` file. Here is an example.

```
API_PORT=3000
API_URL=http://localhost
NODE_ENV=development

MONGO_ROOT_USR=root
MONGO_ROOT_PSW=secret!
MONGO_DB_NAME=budgetpals
```

2. Build the docker image for the api.

```
docker-compose build --no-cache api
```

3. Run the api container and attach to it.

```
docker-compose up api
```

4. Run the nginx reverse-proxy server

```
docker-compose up nginx
```

5. You should be able to send http requests to the api uing Postman or `curl`

```
curl -i -X POST -H "Content-Type: application/json" -d '{"username": "email@email.com", "password": "password"}' http://localhost:3333/api/auth/token
```

and the response should be

```
HTTP/1.1 200 OK
Server: nginx/1.20.2
Date: Fri, 11 Aug 2023 20:52:44 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 17
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"11-TmxFiV9yGDiFXgKFpU45XSA2HHw"

{"token":"token"}%  
```