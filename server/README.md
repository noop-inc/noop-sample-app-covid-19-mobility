# Server Component

The source code included in this directory creates an Express.js Server. The server responses to requests from the Client Component, and communicates with the application's DynamoDB resource. This directory's `Noopfile` passes in environmental variables (`ENV`) from the application's DynamoDB resource to be available during the container's runtime.
