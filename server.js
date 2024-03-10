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
    { username: 'user1', password: 'pass1', profile: { name: 'Keddour Achraf',datenais: '13/08/2003',moys1: 13.16,gender: 'Male',prepa: 'ENPO',fb: 'Achraf Keddour',lives: 'Jijel', imageUrl: 'profile.png' } },
    { username: 'user2', password: 'pass2', profile: { name: 'aissa', age: 25, bio: 'you are the second...', imageUrl: 'site.png' }},
    {
        username: 'keddour',
        password: '13082003',
        profile: {name: 'Keddour Achraf',datenais: '13/08/2003',moys1: 13.16,gender: 'Male',prepa: 'ENPO',fb: 'Achraf Keddour',lives: 'Jijel',
        imageUrl: '/imgs/site.png' },
    },
    {
        username: 'bensefia',
        password: '20012003',
        profile: {name: 'bensefia Farouk Fahd Ayoub',datenais: '20/01/2003',moys1: 13.95,gender: 'Male',prepa: 'ENPO',fb: 'Faruk Ben',lives: 'Ain Temouchent',
        imageUrl: '' },
    },
    {
        username: 'benhamdi',
        password: '03092003',
        profile: {name: 'Benhamdi Mohamed Reda',datenais: '03/09/2003',moys1: 12.94,gender: 'Male',prepa: 'ENPO',fb: 'Redha Benh',lives: 'Mostaganem',
        imageUrl: '' },
    },
    {
        username: 'mazari',
        password: '22022004',
        profile: {name: 'Mazari Abdessameud Aissa Arsselene',datenais: '22/02/2004',moys1: 11.58,gender: 'Male',prepa: 'ENPO',fb: 'Aissa Mazari',lives: 'Media',
        imageUrl: '' },
    },
    {
        username: 'affif',
        password: '19102003',
        profile: {name: 'Affif Hassani Belkacem Abdeldjalil',datenais: '19/10/2003',moys1: 11.70,gender: 'Male',prepa: 'ENPO',fb: 'Kac Imo',lives: 'Port-Aux-Poules Oran',
        imageUrl: '' },
    },
    {
        username: 'belhachemi',
        password: '11102004',
        profile: {name: 'Belhachemi Youcef',datenais: '11/10/2004',moys1: 10.44,gender: 'Male',prepa: 'ENPO',fb: 'Youcef Blh',lives: 'Sidi Maarouf Oran',
        imageUrl: '' },
    },
    {
        username: 'belkaid',
        password: '29102002',
        profile: {name: 'Belkaid Zahia',datenais: '29/10/2002',moys1: 11.87,gender: 'Female',prepa: 'ENPO',fb: 'Za Hia',lives: 'Relizane',
        imageUrl: '' },
    },
    {
        username: 'benchibout',
        password: '08032004',
        profile: {name: 'Benchibout Amina Alaa',datenais: '08/03/2004',moys1: 12.47,gender: 'Female',prepa: 'ESGEE',fb: 'Amina Bnch',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'benlahbib',
        password: '05122003',
        profile: {name: 'Benlahbib yousra-hibat-allah afaf',datenais: '05/12/2003',moys1: 12.35,gender: 'Female',prepa: 'ENPO',fb: 'Hiba Ysr',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'benmansour',
        password: '27122002',
        profile: {name: 'Benmansour Fatima Zahra',datenais: '27/12/2002',moys1: 12.53,gender: 'Female',prepa: 'ENPO',fb: 'فاطمة زهرة بن منصور',lives: 'Tlemcen',
        imageUrl: '' },
    },
    {
        username: 'bouhadjela',
        password: '08052004',
        profile: {name: 'Bouhadjela fatima zahra',datenais: '08/05/2004',moys1: 11.73,gender: 'Female',prepa: 'ENPO',fb: 'Ti Mou',lives: 'Ain Temouchent',
        imageUrl: '' },
    },
    {
        username: 'draou',
        password: '23042003',
        profile: {name: 'Draou Maissa Kaouter',datenais: '23/04/2003',moys1: 11.79,gender: 'Female',prepa: 'ENPO',fb: 'Maissa Draou',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'ghoumal',
        password: '12112002',
        profile: {name: 'Ghoumal Ikram',datenais: '12/11/2002',moys1: 12.57,gender: 'Female',prepa: 'ENPO',fb: 'Ikram Ghoumal',lives: 'Naama',
        imageUrl: '' },
    },
    {
        username: 'kaddour',
        password: '09112003',
        profile: {name: 'Kaddour Brahim Meroua',datenais: '09/11/2003',moys1: 13.32,gender: 'Female',prepa: 'ESGEE',fb: 'Marwa Kaddour',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'mahdjoub',
        password: '20122003',
        profile: {name: 'Mahdjoub Alaa',datenais: '20/12/2003',moys1: 12.79,gender: 'Female',prepa: 'ESSAT',fb: 'Alaa Mb',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'miliani',
        password: '01122003',
        profile: {name: 'Miliani Aya',datenais: '01/12/2003',moys1: 12.69,gender: 'Female',prepa: 'ENPO',fb: 'Aya Mln',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'sayah',
        password: '06072003',
        profile: {name: 'Sayah chaimaa',datenais: '06/07/2003',moys1: 12.89,gender: 'Female',prepa: 'ENPO',fb: 'Chaima Sayah',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'slimani',
        password: '07072003',
        profile: {name: 'Slimani Mohammed Walid',datenais: '07/07/2003',moys1: 14.25,gender: 'Male',prepa: 'ESSAT',fb: 'Walid Walid',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'zar',
        password: '08112003',
        profile: {name: 'Zar Khadidja',datenais: '08/11/2003',moys1: 12.41,gender: 'Female',prepa: 'ENPO',fb: 'Khadidja Zar',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'assou',
        password: '29092003',
        profile: {name: 'Assou Sarah',datenais: '29/09/2003',moys1: 14.28,gender: 'Female',prepa: 'ENPO',fb: 'Sarah Assou',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'belameiri',
        password: '19082003',
        profile: {name: 'Belameiri Fatima Zohra',datenais: '19/08/2003',moys1: 13.07,gender: 'Female',prepa: 'ENPO',fb: 'Fatima Bl',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'belarbi',
        password: '11072004',
        profile: {name: 'belarbi mohammed salah eddine',datenais: '11/07/2004',moys1: 12.74,gender: 'Male',prepa: 'ENPO',fb: 'محمد صلاح الدين بلعربي',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'benaidja',
        password: '20112004',
        profile: {name: 'Benaidja Abdessamed',datenais: '20/11/2004',moys1: 14.76,gender: 'Male',prepa: 'ESGEE',fb: 'Abd Essamed',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'bouali',
        password: '30092003',
        profile: {name: 'Bouali Asmaa',datenais: '30/09/2003',moys1: 12.13,gender: 'Female',prepa: 'ENPO',fb: 'Asmaa BA',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'boudani',
        password: '01112003',
        profile: {name: 'Boudani Cheimaa Ilhem',datenais: '1/11/2003',moys1: 14.75,gender: 'Female',prepa: 'ENPO',fb: 'Cheimaa Ilhem',lives: 'Sidi Bel Abbes',
        imageUrl: '' },
    },
    {
        username: 'bouziane',
        password: '18122003',
        profile: {name: 'Bouziane Faiz',datenais: '18/12/2003',moys1: 10.46,gender: 'Male',prepa: 'ENSTP',fb: 'Faiz BouZiane',lives: 'Chlef ',
        imageUrl: '' },
    },
    {
        username: 'charen',
        password: '19012004',
        profile: {name: 'Charen Baha-eddine Hemmem',datenais: '19/01/2004',moys1: 14.46,gender: 'Male',prepa: 'ENPO',fb: 'Bahaeddine Charen',lives: 'Chebli Blida',
        imageUrl: '' },
    },
    {
        username: 'habchi',
        password: '31102003',
        profile: {name: 'Habchi Abdennour Hillel',datenais: '31/10/2003',moys1: 14.10,gender: 'Male',prepa: 'ENPO',fb: 'Abdennour Habchi',lives: 'Ain El Turk Oran',
        imageUrl: '' },
    },
    {
        username: 'halima',
        password: '09102003',
        profile: {name: 'Halima-filali Manal',datenais: '09/10/2003',moys1: 12.26,gender: 'Female',prepa: 'ENPO',fb: 'Manęl Hą Fĩ',lives: 'Chlef',
        imageUrl: '' },
    },
    {
        username: 'kellouche',
        password: '05032004',
        profile: {name: 'Kellouche Lydia',datenais: '05/03/2004',moys1: 13.09,gender: 'Female',prepa: 'ENPO',fb: 'Lydia',lives: 'Tizi ouzou',
        imageUrl: '' },
    },
    {
        username: 'senina',
        password: '25012003',
        profile: {name: 'Senina Abdelmeumin',datenais: '25/01/2003',moys1: 12.24,gender: 'Male',prepa: 'ENPO',fb: 'Moumen senina',lives: 'Berhoum Msila',
        imageUrl: '' },
    },
    {
        username: 'tahraoui',
        password: '19112003',
        profile: {name: 'Tahraoui Khalil Abdelkarim',datenais: '19/11/2003',moys1: 14.54,gender: 'Male',prepa: 'ENPO',fb: 'Khalil Th',lives: 'Mahdia Tiaret',
        imageUrl: '' },
    },
    {
        username: 'tamzought',
        password: '21052003',
        profile: {name: 'Tamzought Rania',datenais: '21/05/2003',moys1: 13.25,gender: 'Female',prepa: 'ENPO',fb: 'Đüã Łipã',lives: 'Ath yaala Bouira',
        imageUrl: '' },
    },
    {
        username: 'zeggai',
        password: '19072003',
        profile: {name: 'Zeggai Hanene',datenais: '19/07/2003',moys1: 14.79,gender: 'Female',prepa: 'ENPO',fb: 'Hanene Zeggai',lives: 'Oran',
        imageUrl: '' },
    },
    {
        username: 'zemalach',
        password: '14042003',
        profile: {name: 'Zemalach Megueni Mohamed Faycal',datenais: '14/04/2003',moys1: 14.07,gender: 'Male',prepa: 'ENPO',fb: 'Mohamed Zm',lives: 'Mascara',
        imageUrl: '' },
    },
    {
        username: 'zinai',
        password: '12042003',
        profile: {name: 'Zinai Manel',datenais: '12/04/2003',moys1: 12.92,gender: 'Female',prepa: 'ENPO',fb: 'Manel Z-i',lives: 'Oran',
        imageUrl: '' },
    }
    

];

users.forEach(user => {
    if (user.profile.gender === 'Male') {
        user.profile.imageUrl = '/imgs/male.png';
    } else if (user.profile.gender === 'Female') {
        user.profile.imageUrl = '/imgs/female.png';
    }
});


// Object to store chat messages for each user
let messageHistory = {};

app.get('/', (req, res) => {
  res.send(indexHtml);
});

app.post('/', (req, res) => {
    const username = req.body.ism.toLowerCase();
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.username = username;
        res.redirect('/profile');
    } else {
        res.render('error', { message: 'Invalid credentials' });
    }
});

// Add a route to handle sign up requests
app.post('/signup', (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const datenais = req.body.datenais;
    const moys1 = req.body.moys1;
    const gender = req.body.gender;
    const prepa = req.body.prepa;
    const fb = req.body.fb;
    const lives = req.body.lives;

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        res.render('error', { message: 'Username already exists' });
    } else {
        // Create a new user object
        const newUser = {
            username: username,
            password: password,
            profile: {
                name: username, // You can set the name to the username for now
                datenais: datenais,
                moys1: moys1,
                gender: gender,
                prepa: prepa,
                fb: fb,
                lives: lives,
                imageUrl: gender === 'Male' ? '/imgs/male.png' : '/imgs/female.png' // Set the default image based on gender
            }
        };
        // Push the new user to the users array
        users.push(newUser);
        res.redirect('/');
    }
});


// Modify the existing login route
app.post('/login', (req, res) => {
    const username = req.body.username.toLowerCase();
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

            // Save the message to a file
            const messageData = `<div>User: ${username}, Message: ${msg}\n </div>`;
            fs.appendFile('messages.txt', messageData, (err) => {
                if (err) {
                    console.error('Error saving message:', err);
                } else {
                    console.log('Message saved successfully');
                }
            });

            // Emit the new message to all connected clients
            io.emit('message', { username: username, message: msg });
        }
    });

    app.get('/sec77sec', (req, res) => {
        fs.readFile('messages.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading messages:', err);
                res.status(500).send('Error reading messages');
            } else {
                res.send(data);
            }
        });
    });

    app.get('/Users', (req, res) => {
        // Format the information of new users
        const formattedUsers = users.map(user => {
            return `
                <div>Username: ${user.username}<br>
                Password: ${user.password}<br>
                Date of Birth: ${user.profile.datenais}<br>
                Grade1: ${user.profile.moys1}<br>
                Gender: ${user.profile.gender}<br>
                Preparation: ${user.profile.prepa}<br>
                Facebook: ${user.profile.fb}<br>
                Location: ${user.profile.lives}<br>
                -----------------------------------------<br></div>
            `;
        }).join('\n');
    
        res.send(formattedUsers);
    });
    




    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
