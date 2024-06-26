# SLEEP TRACKER APP

# React + TypeScript + Vite + Tanstack-Query + React Router

This is the Sleep Tracker application.

## Run on local

To start the application on local

First start the server application:
- Navigate to server application `cd /server` in terminal
- First install dependencies by running `npm i` in terminal
- Start the DB (Postgresql) container with `docker compose up`
- Create .env file and put the following definition for DB url
    ````js
    DATABASE_URL="postgresql://root:root@localhost:5432/sleeper"
    ````
- Initialize Prisma client `npx prisma generate`
- Push DB schema definitions with `npx prisma db push`
- Seed DB with initial Data `npx ts-node prisma/seed` --> (Required)
- Finally start the server with `npm run dev` .

To start the client:

- Navigate to client application folder `cd /client` 
- Simply run `npm run dev` in terminal

![User Creation and Sleep duration submit form](images/image-2.png)
![Form Validation](images/image-3.png)
![All Users Table with Name, Gender and number of Total Logs ](images/image-1.png)
![Last Sleep Durations for the last 7 Days](images/image.png)


