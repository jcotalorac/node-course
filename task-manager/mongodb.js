const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    db.collection('users').insertOne({
        _id: id,
        name: 'Vikram',
        age: 26
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops);
    });
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
    /*db.collection('tasks').insertMany([
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
        
    });*/
});