# TV-Show-Management-App
End to End Full Stack Application for easy management and tracking of tv shows and web series watched by anyone.

## Tech Stack

- React js (Front-end)
- Node/Express (Backend)
- Mysql (Database)
- Axios (API Calls)
- Ant Design (UI)

## Endpoints

- <b>POST &nbsp; http://localhost:4000/api/login</b> </br> 
Login route handles password validation and user authentication sets up state for the user in the application,</br> only endpoint accessible initially. </br>
PARAMETERS ->  body: {username, pass}

- **GET &nbsp; http://localhost:4000/api** </br>
Returns all shows created by logged in user after authentication </br>
PARAMETERS -> headers: { Authorization : `BEARER token` }
 
- **POST &nbsp; http://localhost:4000/api** </br>
Accepts info for a new record ( show ) for the logged in user and transacts it to the database. </br>
PARAMETERS -> body: {title, platform, rating, review}, headers: { Authorization : `BEARER token` }

- **PATCH &nbsp; http://localhost:4000/api/:id** </br>
Updates a record identified by the parameter id passed through url </br>
PARAMETERS -> body: { review, rating }

- **DELETE &nbsp; http://localhost:4000/api/:id** </br>
Deletes the given record identified by the id in the database


## Features

- [x]	A user can log in and create new tv shows to be tracked with these info -Title, Streaming App, Rating and Review
- [x]	Users can add or delete a show from the list. 
- [x]	Users can update any of the TV series related data.
- [x]	JWT token used for user Authentication in each api call from the front-end to access any service 


## Project Setup

-  mysql should to be installed on the local machine and the configuration file should be modified accordingly [see below](#configuration)
- Create a new schema tvshows and table shows in the connected mysql server (Just Copy the following code block and execute in a mysql script)
``` 
create database if not exists tvshows;

use tvshows;

CREATE TABLE IF NOT EXISTS `shows` (`id` int NOT NULL AUTO_INCREMENT,`rating` int NOT NULL,`title` varchar(45) NOT NULL,`review` mediumtext NOT NULL,`platform` varchar(45) NOT NULL,`user` varchar(45) NOT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`))
```
- Download the project as zip file and extract to any folder on your local machine or fork this repo and clone it in your local machine.
- Open the terminal and navigate to the client directory inside the project `cd path-to-project-dir/TV-Show-Management-App-master/TVshows/client`, Install dependencies for the client (React App) `npm i ` and start the React Client `npm start`
- Navigate to server directory inside the project `cd path-to-project-dir/TV-Show-Management-App-master/TVshows/server`,Install dependencies for the server (Node Server) `npm i ` and start the server `npm start` / `npm run devStart` (for development)
- If the backend was setup correctly you should see this message
> server running on port 4000
> connected to database
- The application is now live on http://localhost:3000 which can be opened in the browser

## Configuration 

All the configs for server are located in .env file which can be modified, however the default values for the database are these, be sure to change the username and password with that of your own.

- DB_PASS=new_mys@59
- DB_HOST=localhost
- DB_USER=root
- DB_DATABASE=tvshows

## Docker Configuration

The application can be easily containerized through docker using the config files provided in the applicaton, assuming docker is installed on your local machine.

The Dockerfiles can be used to build images for the client and server to be used as separate services. The Dockerfile used to define the respective images for the client and server are in the root of both these direcories respectively.
- Inside client directory `docker built -t <client_img_tag>`
- In the server directory `docker build -t <server_img_tag>`

The docker-compose.yml file allows to set up all these service and start the containers in one go
- Replace the the image for the react-client and the node-server with the names of respective tags specified in the previous build step. 
- Inside the root of project directory run `docker-compose up`

The third service which is the database doesn't have to be installed and built from local machine, the official mysql image already shipped from docker-hub can be used as the base image which places the service inside docker environment. The init.sql file in root directory holds the script to create initial database schema and the table, it is automatically run on container startup
- If the database values have changed in server config mentioned in the last section, reflect those in MYSQL_ROOT_USER and MYSQL_ROOT_PASSWORD options of the mysql image in docker-compose file before running docker-compose-up


## Additional

- [x] Existing users are allowed access only on password validation while new users can login directly and start using the app
- [x] Local storage and cookies used to store user's login state and persist application across refresh without the need for backend lookup
- [x] Front end features interactive menu based navigation and also pagination is implemented to display all of the user's shows in a concise manner
- [x] Different sections are rendered without redirecting to different urls, making it a truly single page application
- [x] Storage of User Credentials in the application backend itself (since this is a demo app), which also makes it more efficient by saving database lookup time
- [x] User state not required for update and delete operations since once the user is authenticated by the backend, only the associated items are returned which can be targeted by using the id only
- [x] ES Lint Configuration: Default, Prettier Configuration: Default  

## Further Improvements

- The user credentials can be stored in the database to persist existing users across server reloads
- Sensitive information can be stored as environment variables and derived from system
- Additional info and images related to the entered topic can be derived by using public apis to enrich the user experience
