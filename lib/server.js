// 
// IMPORTS
// 

const express = require('express');
// const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../config/keys');

// Import controllers
const dockerContainerController = require('./controllers/dockerContainerController');
const dockerImageController = require('./controllers/dockerImageController');
const authController = require('./controllers/authController');


//
// CONFIGURATIONS
//

// Port backend server listens on
const port = config.LIGHTHOUSE_BACKEND_PORT || 5000;

// Create express app
const app = express();

// Allow access from frontend to backend
app.use(cors());

// JSON parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Custom middlewares
// - Logging request URL
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
})

// Start backend server on defined port
app.listen(port, () => console.log(`Server is running on port ${port}.`));

//
// ENDPOINTS
//

// Container Operations
app.get('/containers', dockerContainerController.listRunningContainers);
app.get('/containers/all', dockerContainerController.listAllContainers);
app.post('/containers/:id/stop', dockerContainerController.stopContainer);
app.post('/createContainer/:image/:tag', dockerContainerController.createContainer);

// Image Operations
app.get('/images', dockerImageController.listImages);
app.post('/pullImage/:image/:tag', dockerImageController.pullNewImage)
