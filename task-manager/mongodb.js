const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    /*db.collection('users').insertOne({
        _id: id,
        name: 'Vikram',
        age: 26
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

    /*db.collection('users').findOne({ _id: new ObjectID("5eb077105aaa5a5c58072375") }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch');
        }
        console.log(user);
    });

    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users);
    });

    db.collection('users').find({ age: 27 }).count((error, count) => {
        console.log(count);
    });*/

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5eb046bed0322a47d48ea30a")
    },
    {
        $set: {
            name: 'Changed JC'
        }
    });

    updatePromise.then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

});