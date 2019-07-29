<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      multi-line
      right
      :timeout="timeout"
      top
    >
      {{ message }}
      <v-btn
        flat
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-flex
      xs12
      sm8
      md8
      xl6
    >
      <!--      <v-btn @click="sendMessage">Send</v-btn>-->
      <v-card
        flat
        min-width="350px"
      >
        <v-card-title>
          <h3>Чатик</h3>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Комната"
              required
            ></v-text-field>

            <!--TODO add room selector and random room id and connect to mongo-->
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'Необходимо принять условия!']"
              label="Согласен с условиями"
              required
              dark
            ></v-checkbox>
            <v-card-actions>
              <v-btn
                flat
                :disabled="!valid"
                color="primary"
                @click="submit"
              >
                Войти
              </v-btn>

              <v-btn
                flat
                color="warning"
                @click="reset"
              >
                Сбросить
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>

          </v-form>
          <v-flex>
          <v-slide-y-transition>
            <div v-show="show">
            <!--TODO make it to not expand card-->
              *тут описаны условия*
            </div>
          </v-slide-y-transition>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapMutations} from 'vuex';
  export default {
    layout: 'empty',
    head: {
      title: 'О дивный новый чат'
    },
    sockets: {
      connect: function() {
        console.log('Client socket connected')
      }
    },
    data: () => ({
      snackbar: false,
      snackbarColor: '',
      valid: true,
      name: '',
      show: false,
      nameRules: [
        v => !!v || 'Необходимо ввести имя',
        v => (v && v.length <= 20) || 'Имя не должно превышать 20 символов'
      ],
      room: '',
      roomRules: [
        v => !!v || 'Необходимо ввести комнату'
      ],
      checkbox: false,
      message: '',
      timeout: 6000
    }),
    mounted() {
      const message = this.$route.query.message
      switch (message) {
        case 'noUser':
          this.message = 'Необходимо авторизироваться';
          this.snackbarColor = 'error';
          this.snackbar = true
          this.$router.push('/')
          break;
        case 'leftChat':
          this.message = 'Вышли из комнаты';
          this.snackbarColor = 'cyan darken-2';
          this.snackbar = true
          this.$router.push('/')
          break;
      }
    },
    methods: {
      ...mapMutations(['setUser']),
      submit() {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          }

          this.$socket.emit('addUser', user, (data) => {
            if (!data.ok) {
              console.error(data.error);
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat')
            }
          });
        }
      },
      reset() {
        this.$refs.form.reset()
      }
    }
  }
</script>
