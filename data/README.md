# Noop Full-Stack Sample Application (Data Processing Service Component)

The source code in this directory processes multiple CSV files into a single JSON file. The JSON file is utlized by the seedTask component. This directory's `Noopfile` instructs the creation of the aforementioned JSON file, and hosts the result within an NGINX container exposed at the `/data` endpoint.

## Data Noopfile
```
# Defines the name (data) and type (service) of the component.
COMPONENT data service

# Specifies the route ('/data') available to this component within the application's route table.
ROUTE -m GET /data -p

# The 'build' stage processes data files to create JSON seed file.
FROM python:3-alpine AS build

COPY index.py ./
COPY datasets/*.csv.gz datasets/
RUN python index.py

# The runtime stage recieves processed data file from build, and hosts file through an NGINX server.
FROM nginx:1-alpine

COPY --from=build data.json* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```