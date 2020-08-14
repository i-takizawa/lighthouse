const axios = require('axios');
const config = require('../../config/keys');

// Instantiate axios
const ax = axios.create({
  baseURL: config.DOCKER_API_URL,
  socketPath: config.DOCKER_SOCKET
})

exports.listRunningContainers = (req, res) => {
  ax.get('/containers/json')
    .then(json => res.send(json.data));
}

exports.listAllContainers = (req, res) => {
  ax.get('/containers/json?all=1')
    .then(json => res.send(json.data));
}

exports.stopContainer = (req, res) => {
  const containerId = req.params.id;
  ax.post(`/containers/${containerId}/stop`, {})
    .then(res => console.log(res.status))
    .catch(err => {
      if (err.response.status === 304) {
        res.json({ "alreadyStopped": true })
      } else {
        console.log(err);
      }
    });
}

exports.createContainer = (req, res) => {
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
}

// Create container
// app.post('/createContainer/:image/:tag', (req, res) => {
//   const image = req.params.image;
//   const tag = req.params.tag;
//   console.log(`create container ${image}:${tag}`);
//   ax.post(`/containers/create`, {
//     "Image": `${image}:${tag}`
//   })
//   .then(json => {
//     console.log(json);
//     res.send(json);
//   })
//   .catch(err => {
//     res.send(err)
//   })
// })