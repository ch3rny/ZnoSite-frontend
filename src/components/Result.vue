<template>
  <v-layout justify-center wrap align-center>
    <v-flex xs12 md10 lg9>
      <v-card class="card__wrapper">
        <br>
        <p class="text-xs-center title font-weight-medium">Ваш результат:</p>
        <p class="text-xs-center title font-weight-medium">{{correct()}}/{{all}}</p>
        <div class="text-xs-center">
          <v-progress-circular
            :rotate="90"
            :size="200"
            :width="20"
            :value="rate()"
            color="green"
            background-color="red"
          >
            <span class="title font-weight-medium">{{rate()}}%</span>
          </v-progress-circular>
        </div>
        <br>
        <v-divider></v-divider>
        <v-layout justify-center wrap align-center>
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
              to="/Sampling"
            >Створити нову вибірку</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
//import Chart from "../components/Chart.vue";

export default {
	name: 'Result',
	props: {
		all: Number,
		answers: Array
	},
	methods: {
		correct() {
			return this.answers.filter(n => n > 0).length;
		},
		rate() {
			return ((this.correct() / this.all) * 100).toFixed(2);
		}
	}
};
</script>

<style scoped>
.card__wrapper {
	max-width: 620px;
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 12px;
}

.resultButton {
	width: 200px;
}
</style>
