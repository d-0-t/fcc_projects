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

## My work
### My code
- routes/api.js
- tests/2_functional-tests.js
- mongodb-setup.js
- public/style.css (heavily modified)
- views/index.html (heavily modified)
- views/issues.html (heavily modified)

The rest was supplied by the fcc boilerplate.

### Problem solving - 2_functional-tests.js
- Two of the paths for testing had to be secret for security reasons (paths are stored in .env), to ensure the tests don't fail
- Test / mongodb async issues
  - The testing does not work well with mongo, but even if synced, there can be other issues.
    - The save() function checks for document version and throws an error upon the inhumanly fast PUT request in the test.
    - The alternative update() function which disregards the version still failed because mongo's auto-generated ID can't be removed from the acquired object, and update() refuses to push ID.
  - Partial syncing solution to enable the usage of an aquired `_id` is to turn the test into a returned promise like so (below), and acquire the needed information (`_id` in this case) for later use.
  - This will require you to drop the "done()" function you got used to and use its "resolve()" counterpart in the new promise instead.
```
let idToDelete1;
test('#1 Create an issue with every field: POST request to /api/issues/{project}', function () {
  return new Promise(function (resolve) {
  let input = {
	issue_title: "Test 1",
	...
  };
  chai
	.request(server)
	.post("/api/issues/test")
	.set("content-type", "application/json")
	.send(input)
	.end( function (err,res) {
	  if (err) {console.log(err)};
	  assert.equal(res.status, 200);
      ...
	  idToDelete1 = res.body._id;
	  resolve();
	});
  });
});
```
- Getting the ID of some document to delete
  - Done with assigning id to a variable inside Promise.resolve() upon the test's first POST request.
  - The last section of tests will delete this entry from the database.

#### DISCLAIMER - Testing

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
