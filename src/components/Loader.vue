<template>
  <v-flex d-flex xs12 md10 lg9 class="loader" v-if="loading">
    <v-layout align-center justify-center fill-height>
      <v-flex>
        <div class="text-xs-center">
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
        </div>
        <br>
        <div class="text-xs-center">
          <p class="title font-weight-medium">Завантаження</p>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: {
    loading: Boolean
  }
};
</script>

<style scoped>
.loader {
  width: 100%;
  height: 60vh;
}
</style>
