# Noop Full-Stack Sample Application (Data Processing Service Component)

The source code included in this directory combines and processes multiple raw CSV files to a single JSON file for seeding into a DynamoDB resource. The directions in this directory's `Noopfile` process the CSV files within a python container, and hosts the resulting JSON file within an NGINX container exposed at the `/data` endpoint.

## Data Noopfile
```
COMPONENT data service
ROUTE -m GET /data -p

FROM python:3-alpine AS build
COPY index.py ./
COPY datasets/*.csv.gz datasets/
RUN python index.py

FROM nginx:1-alpine
COPY --from=build data.json* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```