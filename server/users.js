class Users {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user);
  }

  get(id) {
    return this.users.find(u => u.id === id);
  }

  remove(id) {
    const user = this.get(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUsersByRoom(roomId) {
    return this.users.filter(user => user.room === roomId);
  }

}

module.exports = function() {
  return new Users();
}
