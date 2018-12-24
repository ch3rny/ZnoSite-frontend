<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <loader :loading="loading"/>
      <v-flex xs12 sm6 v-if="!loading">
        <p class="subheader inCard text-xs-center">Розподіл вірних/хибних відповідей</p>
        <v-card>
          <doughnut-chart :datacollection="trueFalseChart" :height="300"/>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 v-if="!loading">
        <p class="subheader inCard text-xs-center">Розподіл відповідей за темами</p>
        <v-card>
          <doughnut-chart :datacollection="testChart" :height="500"/>
        </v-card>
      </v-flex>
      <v-flex xs12 v-if="!loading">
        <p class="subheader inCard text-xs-center">Розподіл вірних/хибних ідповідей за темами</p>
        <v-card>
          <horizontal-bar-chart :datacollection="answerThemesChart" :height="500"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DoughnutChart from "../components/Charts/DoughnutChart.vue";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart.vue";
import Loader from "../components/Loader.vue";
import THEMES from "@/constants/Themes";
import api from "@/api";

export default {
  components: {
    DoughnutChart,
    HorizontalBarChart,
    Loader
  },
  data() {
    return {
      allStat: [],
      loading: true,
      trueFalseChart: {},
      answerThemesChart: {},
      testChart: {}
    };
  },
  methods: {
    loadChartData() {
      //график правильных-неправильных
      let trueAnswersCount = this.allStat.filter(item => item.is_true).length;
      let falseAnswersCount = this.allStat.filter(item => !item.is_true).length;
      //
      this.trueFalseChart = {
        labels: ["Правильних", "Неправильних"],
        datasets: [
          {
            backgroundColor: ["#11998e", "#FC466B"],
            data: [trueAnswersCount, falseAnswersCount]
          }
        ]
      };
      //график вопросов по темах
      let colors = [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#FF5722",
        "#795548",
        "#607D8B"
      ];
      let sortedAnswers = [];
      THEMES.forEach((element, i) => {
        sortedAnswers.push(this.allStat.filter(item => item.theme == element));
      });
      let arr = [];
      sortedAnswers.forEach(element => arr.push(element.length));
      console.log(arr);
      this.testChart = {
        labels: THEMES,
        datasets: [
          {
            backgroundColor: colors,
            data: arr
          }
        ]
      };
      //
      let answerThemesChartData = [];
      THEMES.forEach((element, i) => {
        answerThemesChartData.push({
          label: element,
          backgroundColor: colors[i],
          data: [
            sortedAnswers[i].filter(item => item.is_true).length,
            sortedAnswers[i].filter(item => !item.is_true).length
          ]
        });
      });
      this.answerThemesChart = {
        labels: ["Правильних", "Неправильних"],
        datasets: answerThemesChartData
      };
    }
  },
  created() {
    api.stats.getTestAnswers().then(res => {
      this.allStat = res.data;
      this.loadChartData();
      this.loading = false;
    });
    console.log("1.", this.allStat);
  }
};
</script>

<style>
</style>
