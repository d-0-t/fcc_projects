# Timestamp Microservice

[[DEMO]](https://replit.com/@d-0-t/Timestamp-Microservice)
[[GitHub]](https://github.com/d-0-t/fcc_projects/edit/main/backend/timestamp_microservice)

This is a timestamp service which converts valid date (or unix time) into unix and UTC strings, then returns it in JSON format.

### Usage / examples:

- "/api" will always return the current time.
- "/api/2015-04-20" will return the corresponding time.

Invalid inputs will return an error.

### Valid input:

- Unix timestamps,
- Strings that can be parsed by Date().-- NOTE: strings of numbers (20211005) will be treated as a single integer and considered a unix timestamp, and NOT a date (ambiguous data).

This project has been written for freeCodeCamp's Back End course.
