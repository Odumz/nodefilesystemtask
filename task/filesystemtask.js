// import modules
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

// constant - jsonplaceholder endpoint
const jsonplaceholder = 'http://jsonplaceholder.typicode.com/posts';

// fetch data
let jsonData = fetch(jsonplaceholder);

// await promise
jsonData.then(
    (res) => res.json()
).then(
    (json) => {
        // stringify
        let jsonContent = JSON.stringify(json);
        // define directory
        const dir = './result'
        // check if directory exists
        fs.access(dir, (err) => {
            console.log(`Directory ${err ? 'does not exist' : 'exists'}`);

            // define filepath
            let filepath = path.join(__dirname, dir, 'posts.json');
            // write to file
            fs.writeFile(filepath, jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }            
                console.log("JSON file has been saved.");
            });
        });
}).catch(err => console.log(err))