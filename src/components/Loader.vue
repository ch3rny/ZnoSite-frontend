<template>
  <v-flex d-flex xs12 md10 lg9 class="loader" v-if="loading">
    <v-layout align-center justify-center fill-height>
      <v-flex>
        <div class="text-xs-center">
          <semipolar-spinner :animation-duration="2000" :size="90" color="#0D47A1" class="anime"/>
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
import { SemipolarSpinner } from "epic-spinners";

export default {
  components: {
    SemipolarSpinner
  },
  props: {
    loading: Boolean
  }
};
</script>

<style scoped>
.loader {
  width: 100%;
  height: 60vh;
  z-index: 1;
}
.anime {
  margin: 0 auto;
}
</style>
