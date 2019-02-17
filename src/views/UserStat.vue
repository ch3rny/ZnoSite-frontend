<template>
  <v-container>
    <loader :loading="loading" v-if="loading"/>
    <v-tabs v-else color="transparent" fixed-tabs>
      <v-tab>Загальна</v-tab>
      <v-tab-item>
        <v-layout row wrap>
          <v-flex xs12 :style="{'margin-top': '10px'}">
            <div>
              <p class="title font-weight-medium">Статистика ваших відповідей</p>
            </div>
            <p class="body-1">Всього відповідей: {{allStat.length}}</p>
            <p class="body-1">Вірних/хибних: {{trueAnswersCount}}/{{falseAnswersCount}}</p>
            <p class="body-1">Відсоток успішності: {{sucessPercent}}%</p>
          </v-flex>

          <v-flex xs12 sm6>
            <v-card>
              <v-card-title>
                <p class="title inCard text-xs-center">Розподіл вірних/хибних відповідей</p>
              </v-card-title>
              <doughnut-chart :datacollection="trueFalseChart" :height="300"/>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-title>
                <p class="title inCard text-xs-center">Розподіл відповідей за темами</p>
              </v-card-title>
              <doughnut-chart :datacollection="testChart" :height="500"/>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <p class="title inCard text-xs-center">Розподіл вірних/хибних відповідей за темами</p>
              </v-card-title>
              <horizontal-bar-chart :datacollection="answerThemesChart" :height="500"/>
            </v-card>
          </v-flex>
          <!-- calendar -->
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <p class="title inCard text-xs-center">Історія відповідей</p>
              </v-card-title>
              <v-container grid-list-md>
                <v-layout :column="$vuetify.breakpoint.smAndDown" wrap align-content-space-between>
                  <v-flex xs12 sm5 class="centered">
                    <v-date-picker
                      locale="uk-UA"
                      ref="picker"
                      v-model="date"
                      :events="arrayEvents"
                      event-color="green lighten-1"
                    ></v-date-picker>
                  </v-flex>
                  <v-flex xs12 sm7 class="centered">
                    <div class="title text-xs-center">Відповіді за {{date}}</div>
                    <div
                      v-if="dailyAnswers.length>0"
                      class="subheading text-xs-center centered"
                    >Цього дня Ви мали такі результати
                      <v-expansion-panel class="task-wrapper centered">
                        <v-expansion-panel-content v-for="item in dailyAnswers" :key="item.id">
                          <div slot="header">
                            <v-icon v-if="item.is_true" color="green">done</v-icon>
                            <v-icon v-else color="red">clear</v-icon>
                            №{{item.task.number}}.({{item.task.year}} {{getZnoType(item.task.zno_type)}})
                          </div>
                          <v-card>
                            <v-img :src="ROOT_URL + item.task.task_image"></v-img>
                            <solution-block
                              :user-answer="item.user_answer"
                              :user-answer-right="item.is_true ? 1 : 0"
                              :correct-answer="item.task.correct_answer"
                            />
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </div>
                    <div
                      v-else
                      class="subheading text-xs-center"
                    >Цього дня Ви не відповіли на жодне питання</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab>ЗНО</v-tab>
      <v-tab-item lazy>
        <v-layout row wrap>
          <v-flex xs12>
            <div :style="{'margin-top': '10px'}">
              <p class="title font-weight-medium">Статистика результатів ЗНО</p>
            </div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-title>
                <p class="title inCard text-xs-center">Розподіл балів ЗНО за 200-бальною шкалою</p>
              </v-card-title>
              <!-- <line-chart :datacollection="znoChart" :height="300"/> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import DoughnutChart from '../components/Charts/DoughnutChart.vue';
import HorizontalBarChart from '../components/Charts/HorizontalBarChart.vue';
import LineChart from '../components/Charts/LineChart.vue';
import SolutionBlock from '../components/SolutionBlock.vue';
import Loader from '../components/Loader.vue';
import THEMES from '@/constants/Themes';
import { ROOT_URL } from '@/constants/Const';
import api from '@/api';
import { getZnoType } from '@/mixins/zno-type';

export default {
	components: {
		DoughnutChart,
		HorizontalBarChart,
		Loader,
		SolutionBlock,
		LineChart
	},
	mixins: [getZnoType],
	data() {
		return {
			allStat: [],
			znoStat: [],
			loading: true,
			trueFalseChart: {},
			answerThemesChart: {},
			//znoChart: {},
			testChart: {},
			trueAnswersCount: 0,
			falseAnswersCount: 0,
			sucessPercent: 0,
			dailyAnswers: [],
			ROOT_URL,
			//
			date: null,
			arrayEvents: [],
			activeTab: 0
		};
	},
	watch: {
		date(val) {
			this.dailyAnswers = this.allStat
				.filter(item => new Date(item.date).toISOString().substr(0, 10) == val)
				.map(item => ({
					...item,
					'task.task_image': ROOT_URL + item.task.task_image
				}));
		}
	},
	methods: {
		loadChartData() {
			//график правильных-неправильных
			this.trueAnswersCount = this.allStat.filter(item => item.is_true).length;
			this.falseAnswersCount = this.allStat.filter(
				item => !item.is_true
			).length;
			this.sucessPercent = Math.round(
				(this.trueAnswersCount / this.allStat.length) * 100
			);
			//
			this.trueFalseChart = {
				labels: ['Правильних', 'Неправильних'],
				datasets: [
					{
						backgroundColor: ['#11998e', '#FC466B'],
						data: [this.trueAnswersCount, this.falseAnswersCount]
					}
				]
			};
			//график вопросов по темах
			let colors = [
				'#F44336',
				'#E91E63',
				'#9C27B0',
				'#673AB7',
				'#3F51B5',
				'#2196F3',
				'#03A9F4',
				'#00BCD4',
				'#009688',
				'#4CAF50',
				'#8BC34A',
				'#CDDC39',
				'#FFEB3B',
				'#FFC107',
				'#FF9800',
				'#9E9E9E',
				'#795548',
				'#607D8B'
			];
			let sortedAnswers = [];
			THEMES.forEach(element => {
				sortedAnswers.push(this.allStat.filter(item => item.theme == element));
			});
			let arr = [];
			sortedAnswers.forEach(element => arr.push(element.length));
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
				labels: ['Правильних', 'Неправильних'],
				datasets: answerThemesChartData
			};
			// let zno200 = [];
			// let znoDates = [];
			// this.znoStat.forEach(item => {
			// 	zno200.push(item.zno_result == 'Не склав' ? 0 : item.zno_result);
			// 	znoDates.push(new Date(item.date).toISOString().substr(0, 10));
			// });
			// this.znoChart = {
			// 	labels: znoDates,
			// 	datasets: [
			// 		{
			// 			label: 'Бали ЗНО',
			// 			backgroundColor: '#f87979',
			// 			data: zno200
			// 		}
			// 	]
			// };

			//
		}
	},
	created() {
		// api.stats.getZnoResult().then(res => {
		// 	this.znoStat = res.data;
		// });
		api.stats.readTestAnswers().then(res => {
			this.allStat = res.data;
			this.allStat.forEach(item =>
				this.arrayEvents.push(new Date(item.date).toISOString().substr(0, 10))
			);
			this.loadChartData();
			this.loading = false;
		});
	},
	mounted() {
		this.date = new Date().toISOString().substr(0, 10);
	}
};
</script>

<style scoped>
.v-card {
	border-radius: 10px !important ;
}
.noPadding {
	padding: 0;
	margin: 0;
}
.centered {
	margin: 10px auto;
}
.task-wrapper {
	max-width: 600px;
}
.full {
	width: 100%;
	background-color: green;
}
</style>
