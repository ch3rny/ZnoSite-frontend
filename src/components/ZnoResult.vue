<template>
  <v-layout justify-center wrap align-center>
    <v-flex xs12 md10 lg9>
      <v-card class="card__wrapper">
        <br>
        <p class="text-xs-center title font-weight-medium">Ваш результат:</p>
        <p class="text-xs-center title font-weight-medium">{{total}}/{{max}}</p>
        <p class="text-xs-center title font-weight-medium">За 12-бальною шкалою: {{ZnoScale[total].scale12}}</p>
        <p class="text-xs-center title font-weight-medium">За 200-бальною шкалою: {{ZnoScale[total].scale200}}</p>

        <v-divider></v-divider>
        <v-layout justify-center wrap align-center>
          <v-flex text-xs-center>
            <v-btn round depressed color="primary" class="resultButton" outline to="/">На головну</v-btn>
          </v-flex>
          <v-flex text-xs-center>
            <v-btn round depressed color="primary" class="resultButton" outline to="/Zno">Вибрати інше ЗНО</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ZnoScale from "@/constants/ZnoScale";
export default {
  name: "ZnoResult",
  props: {
    total: Number
  },
  data() {
    return {
      max: 60,
      ZnoScale: ZnoScale,
      score200: "",
      score12: 1
    };
  }
};
</script>

<style scoped>
.card__wrapper {
  margin-top: 20px;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
}
.resultButton {
  width: 165px;
}
</style>
