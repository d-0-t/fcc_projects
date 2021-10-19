# Exercise Tracker

[[Replit DEMO]](https://replit.com/@d-0-t/Exercise-Tracker) [[GitHub]](https://github.com/d-0-t/fcc_projects/tree/main/backend/exercise_tracker)

This is an exercise tracker.

You can create a new user and submit exercises as logs.

## Usage

### You can get an user log at  

    /api/users/:_id/logs?[from][&to][&limit]

### Query format:  

    from, to = dates (yyyy-mm-dd);
    limit = number

### Get all logs:

    /api/allog

### Get user list:

    /api/users

### Your .env file (or replit secrets)
You have to set up  

    MONGO_DB=your URI goes here
    PORT=3000
    
