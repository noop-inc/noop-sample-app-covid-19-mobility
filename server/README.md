# Noop Full-Stack Sample Application (Server Component)

The source code included in this directory is for an Express.js Server, which recieves a request from the Client Component, retrieves data from the application's DynamoDB resource, and returns said data as a response on the exposed `/api/*` endpoint. This directory's `Noopfile` passes environmental variables (`ENV`) for the application's DynamoDB resource to be available within its runtime container.

## Server Noopfile
```
COMPONENT server service
ROUTE -m GET /api/*

RESOURCE mobilityDB dynamodb

FROM node:12-alpine AS build
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --loglevel=error

FROM node:12-alpine
ENV NODE_ENV production
ENV DYNAMO_TABLE $.resources.mobilityDB.tableName
ENV DYNAMO_ENDPOINT $.resources.mobilityDB.endpoint
COPY --from=build .  .
COPY server.js .
COPY /routes ./routes

ENTRYPOINT npm start
```