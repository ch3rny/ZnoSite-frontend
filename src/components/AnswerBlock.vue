<template>
  <div>
    <div v-if="type==1">
      <br>
      <v-subheader>Позначте правильну відповідь:</v-subheader>
      <table class="half-padding">
        <tbody>
          <tr>
            <th>А</th>
            <th>Б</th>
            <th>В</th>
            <th>Г</th>
          </tr>
          <tr>
            <th>
              <input type="radio" value="А" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="Б" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="В" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="Г" v-model="answer1">
            </th>
          </tr>
        </tbody>
      </table>
      <v-btn round color="primary" class="padding" v-on:click="checkAnswerType1">Відповісти</v-btn>
    </div>
    <div v-if="type==2">
      <br>
      <v-subheader>Позначте правильні відповіді:</v-subheader>
      <table class="padding">
        <tbody>
          <tr>
            <th></th>
            <th>А</th>
            <th>Б</th>
            <th>В</th>
            <th>Г</th>
            <th>Д</th>
          </tr>
          <tr>
            <th>1</th>
            <th>
              <input type="radio" value="А" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="Б" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="В" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="Г" v-model="answer1">
            </th>
            <th>
              <input type="radio" value="Д" v-model="answer1">
            </th>
          </tr>
          <tr>
            <th>2</th>
            <th>
              <input type="radio" value="А" v-model="answer2">
            </th>
            <th>
              <input type="radio" value="Б" v-model="answer2">
            </th>
            <th>
              <input type="radio" value="В" v-model="answer2">
            </th>
            <th>
              <input type="radio" value="Г" v-model="answer2">
            </th>
            <th>
              <input type="radio" value="Д" v-model="answer2">
            </th>
          </tr>
          <tr>
            <th>3</th>
            <th>
              <input type="radio" value="А" v-model="answer3">
            </th>
            <th>
              <input type="radio" value="Б" v-model="answer3">
            </th>
            <th>
              <input type="radio" value="В" v-model="answer3">
            </th>
            <th>
              <input type="radio" value="Г" v-model="answer3">
            </th>
            <th>
              <input type="radio" value="Д" v-model="answer3">
            </th>
          </tr>
          <tr>
            <th>4</th>
            <th>
              <input type="radio" value="А" v-model="answer4">
            </th>
            <th>
              <input type="radio" value="Б" v-model="answer4">
            </th>
            <th>
              <input type="radio" value="В" v-model="answer4">
            </th>
            <th>
              <input type="radio" value="Г" v-model="answer4">
            </th>
            <th>
              <input type="radio" value="Д" v-model="answer4">
            </th>
          </tr>
        </tbody>
      </table>
      <v-btn round color="primary" class="padding" v-on:click="checkAnswerType2">Відповісти</v-btn>
    </div>
    <div v-if="(type==3) && (answer.indexOf(' ')<0)">
      <br>
      <v-subheader>Впишіть правильну відповідь:</v-subheader>
      <v-flex xs9 sm6>
        <v-text-field class="half-padding" v-model="answer5" solo></v-text-field>
        <v-btn round color="primary" class="padding" v-on:click="checkAnswerType4">Відповісти</v-btn>
      </v-flex>
    </div>
    <div v-if="(type==3) && (answer.indexOf(' ')>0)">
      <br>
      <v-subheader>Впишіть правильні відповіді:</v-subheader>
      <v-layout wrap="" row>
        <v-flex xs6>
          <v-text-field class="half-padding" v-model="answer5" solo label="1. "></v-text-field>
          <v-btn round color="primary" class="padding" v-on:click="checkAnswerType3">Відповісти</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-text-field class="half-padding-right" v-model="answer6" solo label="2. "></v-text-field>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerBlock",
  props: {
    type: Number,
    answer: String,
  },
  data() {
    return {
      answer1: " ",
      answer2: " ",
      answer3: " ",
      answer4: " ",
      answer5: "",
      answer6: "",
    };
  },
  methods: {
    checkAnswerType1() {
      this.$emit("checkAnswer", this.answer1);
    },
    checkAnswerType2() {
      let answer = `1${this.answer1}2${this.answer2}3${this.answer3}4${
        this.answer4
      }`;
      this.$emit("checkAnswer", answer);
    },
    checkAnswerType3() {
      let answer = `${this.answer5} ${this.answer6}`;
      this.$emit("checkAnswer", answer);
    },
    checkAnswerType4() {
      this.$emit("checkAnswer", this.answer5);
    },
  },
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
input[type="radio"] {
  position: relative;
  top: 2px;
  left: 2px;
  margin: 0 8px;
  cursor: pointer;
}
input[type="radio"]:before {
  content: "";
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
input[type="radio"]:after {
  content: "";
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
}
input[type="radio"]:checked:before {
  background-size: 14px 14px;
}
input[type="radio"]:focus {
  outline: none;
}
</style>
