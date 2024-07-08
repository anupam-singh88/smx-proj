const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const errorHandlerMiddleware = require('./middleware/error-handler.js')
const notFoundMiddleware = require('./middleware/not-found.js')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Reservation API')
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
