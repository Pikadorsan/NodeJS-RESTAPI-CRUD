const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routers/users');
const User = require('./models/user');
const $ = require('jquery');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./controllers/user');
const swaggerJsdoc = require('swagger-jsdoc');
const graphqlControll = require('./controllers/graphql');
var { graphqlHTTP } = require('express-graphql');

// Połączenie z bazą danych
var mongoDB = 'mongodb://127.0.0.1/library_db';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Library API',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'],
};
//const router = express.Router();
const specs = swaggerJsdoc(options);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/',usersRouter);
app.set('view engine', 'ejs');
//app.use(userRouter);
//app.use('/user', userRouter);
app.use(bodyParser.urlencoded({ extended: true }));


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});


app.get('/', async (req, res) => {
  const users = await User.find();
  res.render('index', { users });
});

app.get('/users/new', (req, res) => {
  res.render('new-user');
});
 // trasa POST dla przetwarzania dodawania  
app.post('/users', async (req, res) => {
  const { title, author } = req.body;
  const user = new User({ title, author });
  await user.save();
  res.redirect('/');
});

 // trasa POST dla przetwarzania usuwania 
app.post('/users/:id/delete', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.redirect('/');
});

// trasa GET dla wyświetlania formularza edycji
app.get('/users/:id/edit', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.render('edit', { user: user })
    } catch (error) {
      console.error(error)
    }
  })
  
  // trasa POST dla przetwarzania edycji
  app.post('/users/:id/edit', async (req, res) => {
    const id = req.params.id;
    const { title, author } = req.body;
    await User.findByIdAndUpdate(id, { title, author });
    res.redirect('/');
  });

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlControll.schema,
    rootValue: graphqlControll.root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log('Aplikacja działa na http://localhost:3000');
});