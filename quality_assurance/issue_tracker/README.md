# Issue tracker

[[DEMO]](https://replit.com/@d-0-t/Issue-Tracker?v=1) **Issue tracker demo**

This is an issue tracker app project written for fcc's Quality Assurance curriculum. I am uploading my codes and my modifications on github, but the "entirety" of the project (except .env, see below) is available on Replit.

## Usage

Go to **"thisurl"/{anyProjectName}** to access a functional project, like:  
- ["thisurl".com/test](https://issue-tracker.d-0-t.repl.co/test)
- ["thisurl".com/apitest](https://issue-tracker.d-0-t.repl.co/apitest)

Access example JSON (you can do query as seen in example):
- ["thisurl".com/api/issues/apitest](https://issue-tracker.d-0-t.repl.co/api/issues/apitest)

GET usage:
    /api/issues/{project}
    /api/issues/{project}?open=true&assigned_to=Joe

Return: a JSON object in the bottom.

## Disclaimer - TESTING

I disabled the running tests on Replit because cloudfare(?) thinks it's an attack and it keeps crashing the app. Works beautifully & fast when run without a 3rd party. I had the same issue with other projects, but this one was the most difficult regarding this problem. There does not seem to be a solution other than hosting it somewhere else, which I cannot do. I guess I got incredibly lucky that it decided to not crash on me ONCE when I was submitting to fcc... Sadly I am not alone with this problem, so many others have been complaining about it. I have not tried hosting it on Glitch yet.

If you would like to run the tests yourself, you'll need an **.env** file with the following keys:
- **MONGO_DB=** (an URI, your database connection is set up here)
- **NODE_ENV=test**
  - Yes, this is actually the real full key. Comment it out or remove it if you don't want the tests to run.
- **SECRETPATH=** (custom string of your own choosing)
  - **GET** requests to a secret path so the database and the testing would not be messed up
  - You need to make **POST** requests setting up this "project" in advance and modify the code so the tests would pass on YOUR own information (length, query details, etc) 
- **SECRETPATH2=** (another custom string for testing reasons)
  - **PUT** requests for testing, same security reasons
  - Also needs previous **POST** requests to set up the new project and extract their IDs and put them in the **functional tests** code.

Alternatively you can just use the same PATH, just remember not to modify it later, else it might fail.
