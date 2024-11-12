const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const logistikRoutes = require('./routes/logistik');
const path = require('path');
const app = express();

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/logistik', logistikRoutes);

// Root Route
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/logistik');
    }
    return res.redirect('/auth/login');
});

// Menjalankan Server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});