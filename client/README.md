# Noop Full-Stack Sample Application (Client Facing Service Component)

The source code in this directory is for a Vue.js single-page application. This directory's `Noopfile` instructs the creation of a compiled build, and hosts the resulting files within an NGINX container.

## Client Noopfile
```
# Defines the name (client) and type (service) of this component.
COMPONENT client service

# Specifies the routes available to access this component within the application's route table. '*' assigns this component as the default route if a location does not match a routes defined in other components.
ROUTE -m GET *

# The 'build1' stage installs dependencies.
FROM node:12-alpine AS build1

# Sets an environment variable available at build1's runtime.
ENV NODE_ENV production

COPY package*.json  ./
RUN npm install --loglevel=error

# The 'build2' stage receives the dependencies from build1, and creates a compiled build for deployment.
FROM node:12-alpine AS build2

# Sets an environment variable available at build2's runtime.
ENV NODE_ENV production

COPY --from=build1 . .
COPY webpack*.js ./
COPY /public ./public
COPY /src ./src
RUN npm run build

# The runtime stage recieves the compiled build from build2, and hosts the files on an NGINX server.
FROM nginx:1-alpine

COPY --from=build2 /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
