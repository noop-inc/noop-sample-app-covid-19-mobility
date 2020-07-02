# Noop Full-Stack Sample Application (Server Component)

The source code included in this directory inlcudes an Express.js Server, which responses to a requests from the Client Component, and communicates with the application's DynamoDB resource. This directory's `Noopfile` passes in environmental variables (`ENV`) for the application's DynamoDB resource to be available during the container's runtime.

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