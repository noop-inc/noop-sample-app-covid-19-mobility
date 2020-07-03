# Noop Full-Stack Sample Application (Seeding Data Task Component)

The source code included in this directory accesses the JSON file exposed at the `/data` endpoint, and uses this file to seed data into the application's database resource. Since the Seeding Data component is a `task`, the resulting container is only active during events idenified within either a `LIFECYCLE` or `CRON` directives within a `Noopfile` - for this component it's `postdeploy`.

## SeedTask Noopfile
```
# Defines the name (seedTask) and type (task) of the component.
COMPONENT seedTask task

# Describes a database resource used by the components in this application.
RESOURCE mobilityDB dynamodb -s hashKeyName=name -s hashKeyType=S -s rangeKeyName=type -s rangeKeyType=S

# Build1 installs dependencies.
FROM node:12-alpine AS build

# Sets an environment variable available at build's runtime.
ENV NODE_ENV production

COPY package*.json  ./
RUN npm install --loglevel=error

# Recieves dependencies from build, and uses those files for execution of  
FROM node:12-alpine

# Sets environment variables available at build's runtime. The variables available from a defined resource vary depending on the type of the resource.
ENV NODE_ENV production
ENV DYNAMO_TABLE $.resources.mobilityDB.tableName
ENV DYNAMO_ENDPOINT $.resources.mobilityDB.endpoint

COPY --from=build . .
COPY index.js .
ENTRYPOINT npm start

# Specifies when this task component will run. Postdeploy means this task will run immediately after all other components have been deployed.
LIFECYCLE postdeploy
```