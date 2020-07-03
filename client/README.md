# Noop Full-Stack Sample Application (Client Facing Service Component)

The source code included in this directory includes a Vue.js single-page application. The directions in this directory's `Noopfile` creates a build for this application, and hosts the resulting files within an NGINX container.

## Client Noopfile
```
# Defines the name (client) and type (service) of the component.
COMPONENT client service

# Specifies the routes available to this component within the application's route table. '*' assigns this component as the default route for if the location does not match a route defined in any of the application's other components.
ROUTE -m GET *

# Build1 installs dependencies.
FROM node:12-alpine AS build1

# Sets an environment variable available at build1's runtime.
ENV NODE_ENV production

COPY package*.json  ./
RUN npm install --loglevel=error

# Build2 receives the dependencies installed in build1, and creates a compiled build to deploy.
FROM node:12-alpine AS build2

# Sets an environment variable available at build2's runtime.
ENV NODE_ENV production

COPY --from=build1 . .
COPY webpack*.js ./
COPY /public ./public
COPY /src ./src
RUN npm run build

# Recieves the compiled build from build2, and hosts the files through an NGINX server.
FROM nginx:1-alpine

COPY --from=build2 /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```