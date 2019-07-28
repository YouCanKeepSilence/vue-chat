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
    sock.join(user.room);
    callback({'ok': true, userId: sock.id});
    sock.emit('newMessage', m('admin', `Добро пожаловать, ${user.name}.`));
    sock.broadcast.to(user.room).emit('newMessage', m('admin', `${user.name} присоеденился.`))
  });

})

module.exports = {
  app: app,
  server: http
}
