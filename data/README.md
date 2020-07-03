# Noop Full-Stack Sample Application (Data Processing Service Component)

The source code included in this directory combines and processes multiple raw CSV files to a single JSON file for seeding into a DynamoDB resource. The directions in this directory's `Noopfile` process the CSV files within a python container, and hosts the resulting JSON file within an NGINX container exposed at the `/data` endpoint.

## Data Noopfile
```
# Defines the name (data) and type (service) of the component.
COMPONENT data service.

# Specifies the route ('/data') available to this component within the application's route table.
ROUTE -m GET /data -p

# Build processes data files to create JSON seed file.
FROM python:3-alpine AS build

COPY index.py ./
COPY datasets/*.csv.gz datasets/
RUN python index.py

# Recieves processed data file from build, and hosts file through an NGINX server.
FROM nginx:1-alpine

COPY --from=build data.json* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```