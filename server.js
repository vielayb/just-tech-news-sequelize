// This is the original server.js layout

// const path = require('path');
// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('./config/connection');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});


// const app = express();
// const PORT = process.env.PORT || 3001;

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // turn on routes
// app.use(routes);
// app.use(express.static(path.join(__dirname, 'public')));

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });



// This is the server js from the bootcamp
// Some lines of code was rearranged 
// controllers was changed to app.use

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// const routes = require('./controllers');
const session = require('express-session');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// turn on routes
// app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});