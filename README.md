[![node CI](https://github.com/markCwatson/budgetpals_api/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/markCwatson/budgetpals_api/actions/workflows/node.js.yml)

## budgetpals API (WIP)
I am building a budgeting app that will also allow you to connect with other users.

The idea is that from within the app, you can see other people's budgets and chat with them anonymously to discuss personal finances and strategies.

This is the backend (API) for budgetpals. A mobile client is being developed [here (budgetpals_client)](https://github.com/markCwatson/budgetpals_client).

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

## Note about bcrypt

When the budgetpals_api container runs, sometime bcrypt cannot be imported properly. If you see these errors, try the following command

```
docker exec -it budgetpals_api sh
```

Then when the shell is established,

```
npm rebuild bcrypt --build-from-source
```

## Example use of API

Now that you are up and running, you should be able to start sending http requests to the api. You can do this using PostMan, but I'll use `curl` in this example.

First create an account by providing a first and last name, email, and password.

```
curl -i -X POST \
    --url http://localhost:3333/api/users \
    -H "Content-Type: application/json" \
    -d '{
        "firstName": "john",
        "lastName": "doe",
        "email": "john@email.com",
        "password": "password"
    }'
```

You should receive a response like the following.

```
HTTP/1.1 201 OK
Server: nginx/1.20.2
Date: Sat, 12 Aug 2023 00:13:28 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 178
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"b2-1irbhCJO0/QvOoZtZ2+c4kHs768"

{"user":{"_id":"64d6cea8b01cbe2be2221a85","firstName":"john","lastName":"doe","email":"john@email.com","password":"$2b$10$MXuHaXz817kK0QVlsxPey.Knq.QJLx8Evb2zreZjz/x4BUWOinNpe"}}
```

Next, sign in using the email and password from the previous step and save the access token to a local variable.

```
TOKEN=$(curl -s -X POST \
    --url http://localhost:3333/api/auth/token \
    -H "Content-Type: application/json" \
    -d '{
        "email": "john@email.com",
        "password": "password"
    }' | jq -r '.access_token')
```

The response should include a valid access token which is saved in the `TOKEN` variable. You should now be able to make addditional requests to authenticated routes. For example, get a list of income categories

```
curl -i -X GET \
    --url http://localhost:3333/api/incomes/categories \
    -H "Authorization: Bearer $TOKEN"
```

and the response should look like:

```
HTTP/1.1 200 OK
Server: nginx/1.20.2
Date: Sat, 19 Aug 2023 12:14:11 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 317
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"13d-4F7FOdOwtzh+1SPBN1iTrkauq2g"

["Alimony","Annuities","Business Profits","Child Tax Benefit","Dividend Payment","Freelancing/Consulting Fees","Gift","Interest Income","Investment Gains","Other","Paycheck","Pension","Rental Income","Royalties","Scholarships and Grants","Social Security Benefits","Tax Return","Trust Income","Unemployment Benefits"]
```

and a list of frequencies

```
curl -i -X GET \
    --url http://localhost:3333/api/incomes/frequencies \
    -H "Authorization: Bearer $TOKEN"
```

with the following response:

```
TTP/1.1 200 OK
Server: nginx/1.20.2
Date: Sun, 20 Aug 2023 20:46:00 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 63
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"3f-VN/JKlinhnxbt1Vwi1hNpyZu3Y0"

["annually","bi-weekly","daily","monthly","quarterly","weekly"]
```

Select a category and frequency and add an income to your account:

```
curl -i -X PUT \
    --url http://localhost:3333/api/incomes \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
        "amount": 1250,
        "category": "Paycheck",
        "frequency": "weekly",
        "isEnding": false,
        "endDate": "not-used-right-now",
        "isFixed": true
    }'
```

with response:

```
HTTP/1.1 200 OK
Server: nginx/1.20.2
Date: Sat, 19 Aug 2023 12:30:25 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 26
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"1a-FDBvt0Ptw6wfOik1kWCz7ysZ0iY"

{"message":"Income added"}
```

Then fetch the list of incomes for this user:

```
curl -i -X GET \
    --url http://localhost:3333/api/incomes \
    -H "Authorization: Bearer $TOKEN"

```

with response:

```
HTTP/1.1 200 OK
Server: nginx/1.20.2
Date: Sat, 19 Aug 2023 12:32:30 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 560
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"230-uxQcEudDK/H5oCcLAYYL+vwhC4s"

[{"_id":"64e0b5e1a422f21d9f0d3ca1","amount":1250,"category":"Paycheck","frequency":"weekly","isEnding":false,"endDate":"not-used-right-now","isFixed":true,"userId":"64dd7c94eecbff4ea13cfb3f"}]
```

Now we can add an expense. First, get the list of expense categories.

```
curl -i -X GET \
    --url http://localhost:3333/api/expenses/categories \
    -H "Authorization: Bearer $TOKEN"
```

with the following response.

```
HTTP/1.1 200 OK
Server: nginx/1.20.2
Date: Sun, 20 Aug 2023 20:47:47 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 241
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"f1-QMQXN9Qo3+S6ia7blSg2LS4r6UY"

["Cable","Cell Phone(s)","Credit Card","Education","Entertainment","Food","Gifts","Health","Housing","Insurance","Internet","Investments","Kids","Other","Pets","Shopping","Streaming","Student Loans","Subscriptions","Transportation","Travel"]
```

Now let's add an expense.

```
curl -i -X PUT \
    --url http://localhost:3333/api/expenses \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
        "amount": 1200,
        "category": "Housing",
        "frequency": "monthly",
        "isEnding": false,
        "endDate": "not-used-right-now",
        "isFixed": true
    }'
```

And the response should look like this.

```
HTTP/1.1 200 OK
Server: nginx/1.20.2
Date: Sun, 20 Aug 2023 20:49:41 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 27
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"1b-XbnqfId+s3Om4raAYUpX828uOz4"

{"message":"expense added"}
```

Now this user has a budget in the database with one income and one expense so far.