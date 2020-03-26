const http = require('http')
const createHandler = require('node-gitlab-webhook')
const shell = require('shelljs');

const { MY_SECRET } = process.env; // Getting MY_SECRET from the command line
const REPO_NAME = 'your_repository'; // Specify your repository name
const PORT = 7345; // Specify your port

var handler = createHandler({ path: '/', secret: MY_SECRET })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(PORT);

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  shell.exec('./deploy');
});
