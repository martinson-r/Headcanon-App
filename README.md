# Headcanon-App
A fanfiction focused clone of GoodReads!

[Headcanondb.herokuapp.com](https://headcanondb.herokuapp.com/)

## About the Project
HeadCanonDB is based on [Goodreads](https://www.goodreads.com/), with the purpose of allowing fanfiction enthusiasts to find and rate fanfiction, and track what they have and have not reaad.

## Built With
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [React-Redux](https://react-redux.js.org/)

## Prerequisites
* Node.js
* Node Package Manager (NPM)
* PostgreSQL

## Installation
1. Clone the repo
`git clone https://github.com/martinson-r/Headcanon-App.git`
1. cd to the root project directory and npm install:
`npm install`
1. cd into the frontend and backend folders, respectively, and npm install
1. Log into PostGreSQL and create a user with a secure password and database creation privileges:
`create user headcanondb_app with *a secure password of your choice* createdb`
1. Following the .env.example file, create a .env file with your chosen username, password, and a database name (such as headcanondb)
1. Generate a JWT secret key using the Node repl
`node`
`require("crypto").randomBytes(32).toString("hex");`
`.exit`
1. Create the database:
`npx dotenv sequelize db:migrate`
1. Seed the database:
`npx dotenv sequelize db:seed:all`
1. Open separate terminals and start the front end and back end (you must start them both):
`npm start`
1. Navigate to localhost:3000

## Contact
Rihana Martinson - martinson.r@gmail.com
Project Link - https://github.com/martinson-r/Headcanon-App
