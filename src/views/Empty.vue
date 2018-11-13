<template>
  <v-layout justify-center wrap="" align-center>
    <v-flex xs12 md10 lg9>
      <br>
      <p
        class="text-xs-center title font-weight-medium"
      >На жаль, за вашим запитом немає жодного питання</p>
      <br>
      <v-layout justify-center wrap="" align-center>
        <v-flex text-xs-center>
          <v-btn round depressed color="primary" class="resultButton" outline to="/">На головну</v-btn>
        </v-flex>
        <v-flex text-xs-center>
          <v-btn
            round
            depressed
            color="primary"
            class="resultButton"
            outline
            :to="{ name: 'Sampling'}"
          >Створити нову вибірку</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<style>
.resultButton {
  width: 200px;
}
</style>


