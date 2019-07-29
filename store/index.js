export const state = () => ({
  user: {},
  users: [],
  messages: []
});

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('Message: ', data)
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user;
    console.log('new user is ', user)
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  }
}
