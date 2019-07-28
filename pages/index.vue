<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-btn @click="sendMessage">Send</v-btn>

    </v-flex>
  </v-layout>
</template>

<script>

export default {
  sockets: {
    connect: function() {
      console.log('Client socket connected');
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('message', {'text': 'Hello server'});
    }
  }
}
</script>
