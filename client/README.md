# Noop Full-Stack Sample Application (Client Facing Service Component)

The source code included in this directory is for a Vue.js single-page application. The directions in this directory's `Noopfile` creates a build for this application, and hosts the resulting files within an NGINX container.

## Client Noopfile
```
COMPONENT client service
ROUTE -m GET *

FROM node:12-alpine AS build1
ENV NODE_ENV production
COPY package*.json  ./
RUN npm install --loglevel=error

FROM node:12-alpine AS build2
ENV NODE_ENV production
COPY --from=build1 . .
COPY webpack*.js ./
COPY /public ./public
COPY /src ./src
RUN npm run build

FROM nginx:1-alpine
COPY --from=build2 /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```