const express = require('express');
const app = express();

app.use(express.json()); // to handle json data in request bodies

// handle incoming GET request to '/'
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// handle incoming GET request to '/users'
app.get('/users', (req, res) => {
    const users = [{ name: 'Alice' }, { name: 'Bob' }];
    res.json(users);
});

// handle incoming POST request to '/users'
app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(`Received new user: ${newUser.name}`);
    res.send('User created successfully!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
