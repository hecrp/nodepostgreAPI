# PostgreSQL RESTful API with Node.js

### Access Canary Islands open data about cultural events (previously inserted on a psql database) using a RESTful API

- In order to interact with the PostgreSQL database I'm using the modules 'pg-promise' and 'bluebird'.
- In this project I've included a script "createdb.sql" to create our database, tables, users and the necessary instructions to add some rows from a .csv file.



#### Examples

Running our application on localhost, requests should be done this way:

​	http://localhost:3000/api/event/list/:page

In this example, replacing ":page" with "1" will retrieve the first page of events from the current date (10 		elements per page).

​	http://localhost:3000/api/event/:town/:date

":town" refers to a town defined in a row of the towns table and ":date" specifies maximum days from the current date in which events are celebrated in the town.

