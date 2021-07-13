# Data Processing Service Component

The source code in this directory processes multiple CSV files into a single JSON file. The JSON file is utlized by the seedTask component. This directory's `Noopfile` instructs the creation of the aforementioned JSON file, and hosts the result within an NGINX container exposed at the `/data` endpoint.
