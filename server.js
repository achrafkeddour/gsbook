const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const indexHtml = fs.readFileSync('index.html', 'utf8');

const users = [
    { username: 'user1', password: 'pass1', profile: { name: 'achraf', age: 30, bio: 'First one Lorem ipsum...' } },
    { username: 'user2', password: 'pass2', profile: { name: 'aissa', age: 25, bio: 'you are the second...' }},
    { username: 'user3', password: 'pass3', profile: { name: 'farouk', age: 25, bio: 'you are the third...' }},
    { username: 'user4', password: 'pass4', profile: { name: 'redha', age: 25, bio: 'you are the fourth...' }}

    // adding more users 
];

// Object to store chat messages for each user
let messageHistory = {};

app.get('/', (req, res) => {
  res.send(indexHtml);
});

app.post('/', (req, res) => {
    const username = req.body.ism;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.username = username;
        res.redirect('/profile');
    } else {
        res.render('error', { message: 'Invalid credentials' });
    }
});

app.get('/profile', (req, res) => {
    const username = req.session.username;
    if (username) {
        const user = users.find(u => u.username === username);
        if (user) {
            // Pass messages to the profile template
            const messages = messageHistory[username] || [];
            res.render('profile', { user: user.profile, username: username, messages: messages });
        } else {
            res.render('error', { message: 'User not found' });
        }
    } else {
        res.redirect('/');
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    let username = null;

    socket.on('login', (user) => {
        username = user;
        // Send message history to the user who just logged in
        const messages = messageHistory[username] || [];
        socket.emit('messageHistory', messages);
    });

    socket.on('message', (msg) => {
        if (username) {
            // Add new message to the array
            messageHistory[username] = messageHistory[username] || [];
            messageHistory[username].push(msg);
            // Emit the new message to all connected clients
            io.emit('message', { username: username, message: msg });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
