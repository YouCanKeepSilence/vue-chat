const app = require('express')();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);
const usersList = require('./users')();

const m = (name, text, id) => ({name, text, id})

socket.on('connection', sock => {

  sock.on('message', data => {
    console.log('Message form client: ', data)
    setTimeout(() => {
      sock.emit('newMessage', {'text': 'Hello, client'})
    }, 1000)
  });

  sock.on('newMessage', (message, callback) => {
    if (!message.id || !message.text) {
      return callback({'ok': false, error: 'Некорректные данные'})
    }

    const user = usersList.get(message.id);
    if (user) {
      socket.to(user.room).emit('newMessage', m(message.name, message.text, message.id))
      return callback({ok: true})
    } else {
      return callback({ok: false, error: `Не удалось найти пользователя с id ${message.id}`})
    }


  })

  sock.on('addUser', (user, callback) => {
    if (!user.name || !user.room) {
      return callback({'ok': false, 'error': 'Некоректные данные'});
    }
    sock.join(user.room);
    usersList.remove(sock.id)
    usersList.add({
      id: sock.id,
      name: user.name,
      room: user.room
    });
    callback({'ok': true, userId: sock.id});
    sock.emit('newMessage', m('admin', `Добро пожаловать, ${user.name}.`));
    sock.broadcast.to(user.room).emit('newMessage', m('admin', `${user.name} присоеденился.`))
  });

})

module.exports = {
  app: app,
  server: http
}
