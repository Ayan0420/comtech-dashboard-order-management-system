console.log('Hello world');

//[SECTION] Javascript Synchronous vs Asychronous

    //Javascript is by default is synchronous meaning that only one statement is executed at a time

//fetch api

console.log(fetch('https://jsonplaceholder.typicode.com/posts'));
//this statement will return a promise

fetch('https://jsonplaceholder.typicode.com/posts')
.then( response => {
    console.log(response.status);
})

//[SECTION]getting all posts

// fetch funtions returns a promise. '.then' function allows for process of that promise in order to extract data from it. It also waits for the promise to be fulfulled before moving forward.
fetch('https://jsonplaceholder.typicode.com/posts')
//use the "json" method from the response object to  conver the data retrieved into JSON format to be used in our application
//"promise chain" it is the use of multiple "then" methods
.then(response => response.json())
.then(data => console.log(data))

//[sub section] the Asyc and Await

//creates an asychronous function
/*
async function fetchData(){
    
    // 'await' waits for the 'fetch' method to complete thn stores the value in the "result" variable
    let result = await fetch('https://jsonplaceholder.typicode.com/posts');
    // result returned by fetch is a promise
    console.log(result);
    console.log(typeof result);

    //we cannot access the content of the "Response" by directly accessing it's body property
    console.log(result.body);

    //converts the data from the "Response" object as JSON
    let json = await result.json();
    // Print out the content of the "Response" object
    console.log(json);
}
fetchData();
*/

// [section] getting a specific post
    // retrieve a specific post following the REST API (retrieve, /post/:id, GET)

    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => console.log(json));


//[section] Creating a post
    // creates a new post following the rest api (create, /post/:id, POST)

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'New Post',
            body: 'Hello World',
            userID: 1
        })
    })
    .then(response => response.json())
    .then(data => console.log(data));


//section updating post

    //difference between PUT and PATCH
        //PUT is used to update single/several properties
        //PATCH is used to update the whole object

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Corrected Post!'
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))

//[section] deleting a post
    //to delete a specific post following the REST API (delete, /posts/:id, DELETE)

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
    })

// [section] retrieve comments form a single post
    // retrieve comments for a specific post following REST API (retrieve, /posts/:id/comments, GET)

    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
    .then(response => response.json())
    .then(data => console.log(data))

    