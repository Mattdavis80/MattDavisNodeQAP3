# MattDavisNodeQAP3

Project Files for the QAP3

To start this application, first run the "npm i" command to install all associated modules.

Before starting the application, it is important for the user to create their own database using the provided SQL statements located in the services/SQL folder. You can also take advantage of the .tar provided in the DB_BACKUP folder under services.

The authorization information must then be changed in your personal .env file. A template is provided in the services folder. Please import your own PgAdmin information.

This project utilizes the NPM package "Nodemon" which allows users to make edits to the Node Server logic without having to restart the server/application.

To start this application, simply input "npm start" into the terminal, this command was added by the author in the package.json file.
