<template>
  <v-flex xs12>
    <v-text-field
      name="message"
      label="Введите сообщение"
      v-model="text"
      outline
      @keydown.enter="send"
    >
    </v-text-field>
  </v-flex>
</template>

<script>
  export default {
    name: 'ChatForm',
    data: () => ({text: ''}),
    methods: {
      send() {
        const user = this.$store.state.user;
        console.log('Sending ', this.text);
        this.$socket.emit('newMessage', {'id': user.id, 'text': this.text, 'name': user.name, 'room': user.room}, (data) => {
          if (!data.ok) {
            console.error(data.error);
          } else {
            this.text = '';
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
