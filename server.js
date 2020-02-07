const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); //parse the gelen json

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const documentsRouter = require('./routes/documents');
const companiesRouter = require('./routes/companies');
const documentTypesRouter = require('./routes/documentTypes');
const usersRouter = require('./routes/users');

app.use('/companies', companiesRouter);
app.use('/documentTypes', documentTypesRouter);
app.use('/users', usersRouter);
app.use('/', documentsRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === production) {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
