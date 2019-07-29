<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650">
      <v-list subheader>
        <v-subheader>Люди в комнате</v-subheader>
        <v-list-tile
          v-for="usr in users"
          :key="usr.id"
          @click.prevent
        >
          <v-list-tile-content>
            <v-list-tile-title>{{usr.name}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="usr.id === user.id ? 'teal' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer">

      </v-toolbar-side-icon>
      <v-btn icon @click="exit">
        <v-icon>
          arrow_back
        </v-icon>
      </v-btn>
      <v-toolbar-title>Вы находитесь в комнате {{user.room}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
export default {
  data: () => ({
    drawer: true
  }),
  computed: mapState(['user', 'users']),
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat');
        this.clearData();
      });
    }
  }

}
</script>
