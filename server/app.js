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

  sock.on('newMessage', (message, callback) => {
    if (!message.name || !message.id || !message.text) {
      return callback({'ok': false, error: 'Некорректные данные'})
    }
    sock.emit('newMessage', m(message.name, message.text, message.id));
    sock.broadcast.to(message.room).emit('newMessage', m(message.name, message.text, message.id))
    return callback({ok: true})
  })

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
