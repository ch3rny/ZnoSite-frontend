<template>
  <v-container class="noPadding">
    <v-layout
      row
      wrap
      justify-center
      v-touch="{
        left: nextTask,
        right: prevTask
        }"
    >
      <Loader :loading="loading"/>
      <!-- Number block -->
      <v-flex d-flex xs12 md10 lg9>
        <div class="card__wrapper">
          <v-layout justify-center wrap class>
            <div v-for="n in tasks.length" :key="n" @click="changeTask(n)">
              <div
                v-ripple
                :class="[
                {isActive: activeTask==n },
                {number: true},
                {isTrue: (userAnswersRight[n-1]==1 && showResult)},
                {isHalfTrue: (userAnswersRight[n-1]==0.5 && showResult)},
                {isFalse: ((userAnswersRight[n-1]==0) && showResult)},
                {isAnswered: (userAnswersRight[n-1]>=0) && !showResult }
              ]"
              >{{n}}</div>
            </div>
            <div v-if="showResult" @click="endTest">
              <div
                :class="[
                { isActive: activeTask==tasks.length+1 },
                {number: true}]"
              >&#931;</div>
            </div>
          </v-layout>
        </div>
      </v-flex>
      <!-- Number Block End-->
      <!-- Task Card -->
      <v-flex xs12 sm12 md10 lg9 v-if="activeTask<=tasks.length">
        <v-card class="card__wrapper">
          <zno-task-description v-bind="task" :length="tasks.length"/>
          <div>
            <img :src="task.task_image " :alt="`${task.year}-${task.zno_type}.${task.number}`">
          </div>
          <div v-if="!showResult">
            <answer-block
              v-if="userAnswersValue[task.index]===undefined "
              @checkAnswer="checkSolving($event, task.index, task.type) "
              :answer="task.correct_answer "
              :type="task.type "
            />
          </div>
          <div v-if="showResult">
            <solution-block
              :user-answer="userAnswersValue[task.index]"
              :user-answer-right="userAnswersRight[task.index]"
              :correct-answer="task.correct_answer"
              :user-score="userAnswersScore[task.index]"
            />
          </div>
        </v-card>
        <div class="card__wrapper">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn
                round
                block
                outline
                color="primary"
                :disabled="activeTask==1 "
                @click="prevTask "
              >Попереднє</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn
                round
                block
                outline
                color="primary"
                v-if="activeTask<tasks.length "
                @click="nextTask "
              >Наступне</v-btn>
              <v-btn round block outline color="primary" v-else @click="endTest ">Завершити</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <!-- Task Card End -->
      <v-flex xs12 sm12 md10 lg9 v-if="showResult && (activeTask> tasks.length)">
        <zno-result :total="totalScore"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ZnoTaskDescription from '@/components/ZnoTaskDescription.vue';
import AnswerBlock from '@/components/AnswerBlock.vue';
import ZnoResult from '@/components/ZnoResult.vue';
import Loader from '@/components/Loader.vue';
import SolutionBlock from '@/components/SolutionBlock.vue';
import { ROOT_URL } from '@/constants/Const';
import ZnoScale from '@/constants/ZnoScale';
import api from '@/api';

export default {
	components: {
		AnswerBlock,
		ZnoResult,
		Loader,
		SolutionBlock,
		ZnoTaskDescription
	},
	data() {
		return {
			tasks: [],
			ROOT_URL,
			userAnswersRight: [],
			userAnswersValue: [],
			userAnswersScore: [],
			activeTask: 1,
			showResult: false,
			totalScore: 0,
			loading: true,
			timer: null,
			ZnoScale
		};
	},
	computed: {
		endTime() {
			return this.$store.state.znoTimer.endTime;
		},
		task() {
			return {
				...this.tasks[this.activeTask - 1],
				index: this.activeTask - 1
			};
		}
	},
	methods: {
		timer_loop() {
			let now = new Date().getTime();
			let timeLeft = Math.round((this.endTime - now) / (60 * 1000));
			this.$store.commit('znoTimer/changeTimeLeft', timeLeft);
			this.timer = setTimeout(this.timer_loop, 60 * 1000);
		},
		checkSolving(value, index, type) {
			this.userAnswersValue[index] = value;
			let score = 0;
			switch (type) {
				case 1:
					if (value == this.tasks[index].correct_answer) {
						score = 1;
					}
					break;
				case 2:
					for (var i = 1; i < value.length; i += 2) {
						if (value[i] === this.tasks[index].correct_answer[i]) {
							score += 1;
						}
					}
					break;
				case 3:
					if (this.tasks[index].correct_answer.indexOf(' ') > 0) {
						let ans1 = value.split(' ');
						let ans2 = this.tasks[index].correct_answer.split(' ');
						ans1.forEach((item, i) => {
							if (item == ans2[i]) {
								score += 1;
							}
						});
					} else {
						if (value == this.tasks[index].correct_answer) {
							score += 2;
						}
					}
					break;
			}
			this.userAnswersScore[index] = score;
			this.userAnswersRight[index] =
				value == this.tasks[index].correct_answer ? 1 : 0;
			if (type == 2 && score > 0 && score < 4) {
				this.userAnswersRight[index] = 0.5;
			}
			if (type == 3 && score == 1) {
				this.userAnswersRight[index] = 0.5;
			}
			if (this.activeTask < this.tasks.length) {
				this.nextTask();
			} else {
				this.$forceUpdate();
			}
		},
		changeTask(n) {
			this.activeTask = n;
		},
		nextTask() {
			if (this.activeTask < this.tasks.length) this.activeTask++;
		},
		prevTask() {
			if (this.activeTask > 1) this.activeTask--;
		},
		endTest() {
			this.showResult = true;
			this.activeTask = this.tasks.length + 1;
			this.totalScore = this.userAnswersScore.reduce((a, b) => a + b, 0);
			let payload = {
				user: 1,
				answers_right: this.userAnswersRight,
				answers_value: this.userAnswersValue,
				answers_score: this.userAnswersScore,
				zno_result: this.ZnoScale[this.totalScore].scale200,
				dpa_result: this.ZnoScale[this.totalScore].scale12
			};
			console.log(payload);
			api.stats
				.postZnoResult(payload)
				.then(res => console.log(res).catch(err => console.log(err)));
		}
	},
	created() {
		if (this.endTime == null) {
			this.$store.commit('znoTimer/setEndTime');
		}
		this.timer_loop();
	},
	mounted() {
		api.tasks
			.getZno(this.$route.params.year, this.$route.params.znotype)
			.then(res => {
				this.tasks = res.data.map(item => ({
					...item,
					task_image: ROOT_URL + item.task_image
				}));
				this.loading = false;
				if (res.data.length == 0) this.$router.push({ name: 'Empty' });
			});
	},
	beforeDestroy() {
		clearTimeout(this.timer);
		this.$store.commit('znoTimer/resetEndTime');
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
	width: 100%;
	max-width: 600px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
.card__wrapper {
	max-width: 620px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 12px;
}
.number {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 2px solid #3486d7;
	text-align: center;
	padding-top: 3px;
	margin-left: 5px;
	margin-bottom: 5px;
	font-size: 8pt;
	font-weight: 600;
	cursor: pointer;
}
.isActive {
	border: 2px solid #3486d7;
	color: white;
	background-color: #3486d7;
}
.isTrue {
	border: 2px solid green;
	color: white;
	background-color: green;
}
.isHalfTrue {
	border: 2px solid black;
	color: black;
	background-color: yellow;
}
.isFalse {
	border: 2px solid red;
	color: white;
	background-color: red;
}
.isAnswered {
	background-color: lightblue;
}

.loader {
	width: 100%;
	height: 60vh;
}
.noPadding {
	padding: 0;
	margin: 0;
}
</style>
