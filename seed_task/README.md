# Noop Full-Stack Sample Application (Seeding Data Task Component)

The source code included in this directory accesses the JSON file exposed at the `/data` endpoint and uses this file to seed items into the application's database resource. Since the Seeding Data component is a `task`, the resulting container is only active during events idenified within either the `LIFECYCLE` or `CRON` directives in the directory's `Noopfile` - in this case, `postdeploy`.

## SeedTask Noopfile
```
COMPONENT seedTask task

RESOURCE mobilityDB dynamodb -p hashKeyName=name -p hashKeyType=S -p rangeKeyName=type -p rangeKeyType=S

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