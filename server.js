// 
// IMPORTS
// 

const express = require('express');
// const fetch = require('node-fetch');
const cors = require('cors');
const axios = require('axios');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

//
// CONFIGURATIONS
//

// Port backend server listens on
const port = process.env.LIGHTHOUSE_BACKEND_PORT || 5000;

// Port docker daemon listens on
// const dockerPort = process.env.DOCKER_API_PORT || 2376;

// Docker socket
const dockerSocket = '/var/run/docker.sock';

// Instantiate axios
const ax = axios.create({
  baseURL: 'http://localhost',
  socketPath: dockerSocket
})

// Create express app
const app = express();

// Allow access from frontend to backend
app.use(cors());

// JSON parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Start backend server on defined port
app.listen(port, () => console.log(`Server is running on port ${port}.`));

// URIs for API endpoints
// const baseURI = `http://localhost`
// const containersURI = baseURI + '/containers/json';
// const containersAllURI = baseURI + '/containers/json?all=1';
// const imagesURI = baseURI + '/images/json';

//
// ENDPOINTS
//

// List Images
app.get('/images', (req, res) => {
  ax.get('/images/json')
    .then(json => res.send(json.data))
    .catch(err => console.log(err))
});

// List Containers
app.get('/containers', (req, res) => {
  ax.get('/containers/json')
    .then(json => res.send(json.data));
});

// List all containers
app.get('/containers/all', (req, res) => {
  ax.get('/containers/json?all=1')
    .then(json => res.send(json.data));
});

// Stop container
app.post('/containers/:id/stop', (req, res) => {
  const containerId = req.params.id;
  console.log('server stop called')
  ax.post(`/containers/${containerId}/stop`, {})
    .then(res => console.log('Container is successfully stopped.'))
    .catch(err => console.log(err));
});

// Pull image
app.post('/pullImage/:image/:tag', (req, res) => {
  const image = req.params.image;
  const tag = req.params.tag;
  console.log(`pulling image ${image}:${tag}...`);
  ax.post(`/images/create?fromImage=${image}&tag=${tag}`, {})
    .then(json => res.send(json))
    .catch(err => {
      res.send(`ERROR: ${err.response.data.message}`)
      console.log(err)
    })
})

// Create container
app.post('/createContainer/:image/:tag', (req, res) => {
  const image = req.params.image;
  const tag = req.params.tag;
  console.log(`create container ${image}:${tag}`);
  ax.post(`/containers/create`, {
    "Image": `${image}:${tag}`
  })
  .then(json => {
    console.log(json);
    res.send(json);
  })
  .catch(err => {
    res.send(err)
  })
})

// 
// Authentication
// 

app.post('/login', passport.authenticate('local',
                                         { successRedirect: '/',
                                           failureRedirect: '/',
                                           failureFlash: true }), (req, res) => {
  res.redirect('/')
})

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.'});
      }
    })
  }
))