# Noop Full-Stack Sample Application (Seeding Data Task Component)

The source code included in this directory accesses the JSON file exposed at the `/data` endpoint, and uses this file to seed data into the application's database resource. Since the Seeding Data component is a `task`, the resulting container is only active during events idenified within either a `LIFECYCLE` or `CRON` directives within a `Noopfile` - for this component it's `postdeploy`.

## SeedTask Noopfile
```
COMPONENT seedTask task

RESOURCE mobilityDB dynamodb -s hashKeyName=name -s hashKeyType=S -s rangeKeyName=type -s rangeKeyType=S

FROM node:12-alpine AS build
ENV NODE_ENV production
ENV DYNAMO_TABLE $.resources.mobilityDB.tableName
ENV DYNAMO_ENDPOINT $.resources.mobilityDB.endpoint
COPY package*.json  ./
RUN npm install --loglevel=error

FROM node:12-alpine
ENV NODE_ENV production
COPY --from=build . .
COPY index.js .
ENTRYPOINT npm start
LIFECYCLE postdeploy
```