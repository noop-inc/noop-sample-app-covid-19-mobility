# Noop Full-Stack Sample Application (Seeding Data Task Component)

The source code included in this directory accesses the JSON file exposed at the `/data` endpoint, and uses this file to seed data into the application's DynamoDB database resource. Since the seedTask component is a `task`, the resulting container is only active during events defined within either a `LIFECYCLE` or `CRON` directives - for this component the event is `postdeploy`.

## SeedTask Noopfile
```
# Defines the name (seedTask) and type (task) of this component.
COMPONENT seedTask task

# Describes a database resource used by the component defined within this file.
RESOURCE mobilityDB dynamodb -s hashKeyName=name -s hashKeyType=S -s rangeKeyName=type -s rangeKeyType=S

# The 'build' stage installs dependencies.
FROM node:12-alpine AS build

# Sets an environment variable available at build's runtime.
ENV NODE_ENV production

COPY package*.json  ./
RUN npm install --loglevel=error

# The runtime stage recieves dependencies from build, and uses these files to assist in execution of the component.
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

