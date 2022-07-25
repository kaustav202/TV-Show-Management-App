# TV-Show-Management-App
End to End Full Stack Application for easy management and tracking of shows and web series watched by anyone.

## Tech Stack

- React js (Front-end)
- Node/Express (Backend)
- Mysql (Database)
- Axios (API Calls)
- Ant Design (UI)
- jsonwebtoken

## Project Setup

-  mysql should to be installed on the local machine and the configuration file should be modified accordingly [see below](/Configuration)
- Create a new schema tvshows and table shows in the connected mysql server (Just Copy the following code block and execute in a mysql script)
``` 
create database if not exists tvshows;

use tvshows;

CREATE TABLE IF NOT EXISTS `shows` (`id` int NOT NULL AUTO_INCREMENT,`rating` int NOT NULL,`title` varchar(45) NOT NULL,`review` mediumtext NOT NULL,`platform` varchar(45) NOT NULL,`user` varchar(45) NOT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`))
```
- Download the project as zip file and extract to any folder on your local machine
- Open the terminal and navigate to the client directory inside the project `cd path-to-project-dir/TVshows/client`, Install dependencies for the client (React App) `npm i ` and start the React Client `npm start`
- Navigate to server directory inside the project `cd path-to-project-dir/TVshows/server`,Install dependencies for the server (Node Server) `npm i ` and start the server `npm start` / `npm run devStart` (for development)
- If the backend was setup correctly you should see this message
> server running on port 4000
> connected to database
- The application is now live on http://localhost:3000 which can be opened in the browser

## Configuration 

- All the configs for server are located in .env file which can be modified, however the default values for the database are these, be sure to change the username and password with that of your own.

- DB_PASS=new_mys@59
- DB_HOST=localhost
- DB_USER=root
- DB_DATABASE=tvshows
