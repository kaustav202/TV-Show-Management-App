# TV-Show-Management-App
End to End Full Stack Application for easy management and tracking of tv shows and web series watched by anyone.

## Tech Stack

- React js (Front-end)
- Node/Express (Backend)
- Mysql (Database)
- Axios (API Calls)
- Ant Design (UI)
- jsonwebtoken

## Features

- [x]	Users are able to create new tv shows to be tracked with these info -Title, Streaming App, Rating and Review
- [x]	Users can add or delete a show from the list. 
- [x]	Users can update any of the TV series related data.
- [x]	JWT token used for user Authentication in each api call from the front-end to access any service 



## Project Setup

-  mysql should to be installed on the local machine and the configuration file should be modified accordingly [see below](https://github.com/kaustav202/TV-Show-Management-App/edit/main/README.md#configuration)
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

All the configs for server are located in .env file which can be modified, however the default values for the database are these, be sure to change the username and password with that of your own.

- DB_PASS=new_mys@59
- DB_HOST=localhost
- DB_USER=root
- DB_DATABASE=tvshows


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