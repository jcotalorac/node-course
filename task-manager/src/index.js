const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5eb5c79187d63462d016335b');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('5eb5c78187d63462d0163359');

    console.log(user.tasks);
};

main();