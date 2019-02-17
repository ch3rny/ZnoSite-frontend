<template>
  <div>
    <div v-if="type==1">
      <br>
      <v-subheader>Позначте правильну відповідь:</v-subheader>
      <table class="half-padding">
        <tbody>
          <tr>
            <th v-for="i in 'АБВГ'" :key="i">{{i}}</th>
          </tr>
          <tr>
            <th v-for="i in 'АБВГ'" :key="i">
              <input type="radio" :value="i" v-model="answer1">
            </th>
          </tr>
        </tbody>
      </table>
      <v-btn
        round
        depressed
        color="primary"
        class="padding"
        v-on:click="checkAnswerType1"
      >Відповісти</v-btn>
    </div>
    <div v-if="type==2">
      <br>
      <v-subheader>Позначте правильні відповіді:</v-subheader>
      <table class="padding">
        <tbody>
          <tr>
            <th></th>
            <th v-for="i in 'АБВГД'" :key="i">{{i}}</th>
          </tr>
          <tr v-for="i in 4" :key="i">
            <th>{{i}}</th>
            <th v-for="j in 'АБВГД'" :key="j">
              <input type="radio" :value="j" v-model="answer2[i-1]">
            </th>
          </tr>
        </tbody>
      </table>
      <v-btn
        round
        depressed
        color="primary"
        class="padding"
        v-on:click="checkAnswerType2"
      >Відповісти</v-btn>
    </div>
    <div v-if="(type==3) && (answer.indexOf(' ')<0)">
      <br>
      <v-subheader>Впишіть правильну відповідь:</v-subheader>
      <v-flex xs9 sm6>
        <v-text-field class="half-padding" v-model.trim="answer5" solo></v-text-field>
        <v-btn
          round
          depressed
          color="primary"
          class="padding"
          v-on:click="checkAnswerType4"
        >Відповісти</v-btn>
      </v-flex>
    </div>
    <div v-if="(type==3) && (answer.indexOf(' ')>0)">
      <br>
      <v-subheader>Впишіть правильні відповіді:</v-subheader>
      <v-layout wrap row>
        <v-flex xs6>
          <v-text-field class="half-padding" v-model.trim="answer5" solo label="1. "></v-text-field>
          <v-btn
            round
            depressed
            color="primary"
            class="padding"
            v-on:click="checkAnswerType3"
          >Відповісти</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-text-field class="half-padding-right" v-model.trim="answer6" solo label="2. "></v-text-field>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
	name: 'AnswerBlock',
	props: {
		type: Number,
		answer: String
	},
	data() {
		return {
			answer1: ' ',
			answer2: [' ', ' ', ' ', ' '],
			answer5: '',
			answer6: ''
		};
	},
	methods: {
		checkAnswerType1() {
			this.$emit('checkAnswer', this.answer1);
			this.clearAnswers();
		},
		checkAnswerType2() {
			let answer = this.answer2.map((item, index) => index + 1 + item).join('');
			this.$emit('checkAnswer', answer);
			this.clearAnswers();
		},
		checkAnswerType3() {
			let answer = `${this.answer5} ${this.answer6}`;
			answer = answer.replace(/\./g, ',');
			this.$emit('checkAnswer', answer);
			this.clearAnswers();
		},
		checkAnswerType4() {
			this.answer5 = this.answer5.replace(/\./g, ',');
			this.$emit('checkAnswer', this.answer5);
			this.clearAnswers();
		},
		clearAnswers() {
			this.answer1 = ' ';
			this.answer2 = [' ', ' ', ' ', ' '];
			this.answer5 = '';
			this.answer6 = '';
		}
	}
};
</script>
<style scoped>
.half-padding {
	padding-left: 8px;
}
.padding {
	padding-left: 16px;
}
.half-padding-right {
	padding-right: 8px;
}
input[type='radio'] {
	position: relative;
	top: 2px;
	left: 2px;
	margin: 0 8px;
	cursor: pointer;
}
input[type='radio']:before {
	content: '';
	background-color: white;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: solid 2px #3486d7;
	display: inline-block;
	position: absolute;
	top: -2px;
	left: -2px;
	background-image: radial-gradient(circle, #3486d7 40%, white 50%);
	background-size: 0;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	will-change: background-size;
	z-index: 2;
}
input[type='radio']:after {
	content: '';
	width: 16px;
	height: 16px;
	background: white;
	border-radius: 50%;
	position: absolute;
}
input[type='radio']:checked:before {
	background-size: 12px 12px;
}
input[type='radio']:focus {
	outline: none;
}
</style>