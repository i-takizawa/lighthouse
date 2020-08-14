const axios = require('axios');
const config = require('../../config/keys');

// Instantiate axios
const ax = axios.create({
  baseURL: config.DOCKER_API_URL,
  socketPath: config.DOCKER_SOCKET
})

exports.listImages = (req, res) => {
  ax.get('/images/json')
    .then(json => res.send(json.data))
    .catch(err => console.log(err))
};

exports.pullNewImage = (req, res) => {
  const image = req.params.image;
  const tag = req.params.tag;
  console.log(`pulling image ${image}:${tag}...`);
  ax.post(`/images/create?fromImage=${image}&tag=${tag}`, {})
    .then(json => res.send(json))
    .catch(err => {
      res.send(`ERROR: ${err.response.data.message}`)
      console.log(err);
    })
}