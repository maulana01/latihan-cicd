const express = require('express');
const app = express();
// const swaggerJSON = require('./swagger.json');
// const swaggerUI = require('swagger-ui-express');
app.use(express.json());

// app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

// const router = require('./router');
// app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
