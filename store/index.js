export const state = () => ({
  user: {},
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
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  }
}
