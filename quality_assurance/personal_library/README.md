# Personal library

[[Demo]](https://replit.com/@d-0-t/Personal-Library) [[GitHub]](https://github.com/d-0-t/fcc_projects/edit/main/quality_assurance/personal_library/)

This is a simple library. You can add new book titles, add comments on the book, delete the book, and delete all books.

## Usage

### Test API responses

1. To add a new book, enter the book title and click submit.
2. To add comment on a book, enter the book's ID and then the comment.

### Sample Front-End

1. To add a new book, enter the book title and click submit.
2. Click on book title ("Title" - x comments) and add a new comment or delete the book
3. Delete all books :'-(

### GET JSON objects with a route

List all books:

    /api/books
    
Get a book object which corresponds to an ID:

    /api/books/{bookid}

## My work

### Challenges

#### Async Testing with mocha chai
The async nature of the testing was a problem, but I solved it by turning the first test (where I aquire an ID to use for manipulation later) into a returned promise.

#### Difference - no duplicates
My project differs from the FCC requirements slightly, for it does not allow two books with the same title. I have decided on this modification in my previous projects as well.

#### Replit cloudfare spam attack issue - mocha chai tests crash the replit server
Unfortunately, after submitting to FCC, I had to disable the running of the test to retain functionality because Replit keeps crashing if tests are run (cloudfare spam attack). I had this issue with all the testing projects but never encountered the same problem while hosting it locally, so it's a hosting issue. Thankfully, this does not affect what you see.

### My code
- routes/api.js
- tests/2_functional-tests.js
- mongodb-setup.js
- views/index.html (minor changes)
- public/style.css (drastic changes)
- server.js (minor: added require mongodb-setup)

The rest was supplied by freeCodeCamp.

### The .env file (or replit secrets)
You have to set up the following  
(comment out NODE_ENV if you don't want the tests to run):

    MONGO_DB=your URI goes here
    NODE_ENV=test
    PORT=3000
