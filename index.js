const { graphql } = require('graphql');
const readline = require('readline'); // Node module provides interface for reading data from a readable stream one line at a time

const mySchema = require('./schema/main');

const rli = readline.createInterface({
    input: process.stdin, // readable stream
    output: process.stdout
});



const { MongoClient } = require('mongodb');
const assert = require('assert');

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');

    rli.question('Client Request: ', inputQuery => {
        graphql(mySchema, inputQuery, {}, { db }).then(result => {
        console.log('Server Answer :', result.data);
        db.close(() => rli.close());
    });

    rli.close();
    });
});