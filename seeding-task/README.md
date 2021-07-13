# Seeding Data Task Component

The source code included in this directory accesses the JSON file exposed at the `/data` endpoint, and uses this file to seed data into the application's DynamoDB database resource. Since the seedTask component is a `task`, the resulting container is only active during events defined within either a `LIFECYCLE` or `CRON` directives - for this component the event is `postdeploy`.
