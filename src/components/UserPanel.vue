<template>
  <v-card>
    <v-list dark>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="avatar" alt="avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{user.first_name+' '+user.last_name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile :to="{ name: 'Bundle'}">
        <v-list-tile-action>
          <v-icon>folder_open</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Добірки</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="logout()">
        <v-list-tile-action>
          <v-icon>input</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Вийти</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "UserPanel",
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    avatar() {
      return this.$store.state.auth.avatar;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>