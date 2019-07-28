<template>
  <div class="c-wrap">
    <div class="c-chat">

        <message v-for="m in messages" :key="m.text" :name="m.name" :text="m.text" :isOwner="user.id === m.id"> </message>

    </div>
    <div class="c-form">
      <chat-form></chat-form>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Message from '../components/Message';
  import ChatForm from '../components/ChatForm'


  export default {
    name: 'chat',
    components: { ChatForm, Message},
    head() {
      return {
        title: `Комната ${this.user.room}`
      }
    },
    middleware: ['chat'],
    computed: mapState(['user', 'messages'])
  }
</script>

<style scoped>
  .c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .c-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 100px;
    background: #3d4142;
  }
  .c-chat {
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 0;
    top: 0;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
