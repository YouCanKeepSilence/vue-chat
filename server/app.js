const app = require('express')();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);

const m = (name, text, id) => ({name, text, id})

socket.on('connection', sock => {

  sock.on('message', data => {
    console.log('Message form client: ', data)
    setTimeout(() => {
      sock.emit('newMessage', {'text': 'Hello, client'})
    }, 1000)
  });

  sock.on('addUser', (user, callback) => {
    if (!user.name || !user.room) {
      return callback({'ok': false, 'error': 'Некоректные данные'});
    }
    callback({'ok': true, userId: sock.id});
    sock.emit('newMessage', m('admin', `Добро пожаловать, ${user.name}`));
  });

})

module.exports = {
  app: app,
  server: http
}
