const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    /*db.collection('users').insertOne({
        name: 'JC',
        age: 37
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops);
    });*/
    /*db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        },
        {
            name: 'Gunther',
            age: 27
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents!');
        }
        console.log(result.ops);
    });*/
    db.collection('tasks').insertMany([
        {
            description: 'Task1',
            completed: true
        },
        {
            description: 'Task2',
            completed: false
        },
        {
            description: 'Taks3',
            completed: true
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert tasks');
        }
        console.log(result.ops);
        
    });
});