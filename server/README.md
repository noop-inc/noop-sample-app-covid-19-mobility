# Noop Full-Stack Sample Application (Server Component)

The source code included in this directory inlcudes an Express.js Server, which responses to a requests from the Client Component, and communicates with the application's DynamoDB resource. This directory's `Noopfile` passes in environmental variables (`ENV`) for the application's DynamoDB resource to be available during the container's runtime.

## Server Noopfile
```
COMPONENT server service
ROUTE -m GET /api/*

# Describes a database resource used by the components in this application. Hash and Range key settings do not need to be included, since they are already defined within the seedTask's Noopfile.
RESOURCE mobilityDB dynamodb

# Build installs dependencies.
FROM node:12-alpine AS build
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --loglevel=error

# Receives the dependencies installed in build
FROM node:12-alpine

# Sets environment variables available at build's runtime. The variables available from a defined resource vary depending on the type of the resource.
ENV NODE_ENV production
ENV DYNAMO_TABLE $.resources.mobilityDB.tableName
ENV DYNAMO_ENDPOINT $.resources.mobilityDB.endpoint

COPY --from=build .  .
COPY server.js .
COPY /routes ./routes

ENTRYPOINT npm start
```