<template>
  <v-layout justify-center wrap align-center column>
    <v-flex xs12 md10 lg9>
      <img src="@/assets/dev.png" alt>
    </v-flex>
    <v-flex text-xs-center>
      <v-btn round depressed color="primary" v-on:click="goBack()">Назад</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    goBack: () => window.history.go(-1)
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>