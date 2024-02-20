require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fundsRouter = require('./routes/fundsRoutes');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.use('/api', fundsRouter);

app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
