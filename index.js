const { graphql } = require('graphql');
const readline = require('readline'); // Node module provides interface for reading data from a readable stream one line at a time

const mySchema = require('./schema/main');

const rli = readline.createInterface({
    input: process.stdin, // readable stream
    output: process.stdout
});

rli.question('Client Request: ', inputQuery => {
    graphql(mySchema, inputQuery).then(result => {
    console.log('Server Answer :', result.data);
});

rli.close();
});

