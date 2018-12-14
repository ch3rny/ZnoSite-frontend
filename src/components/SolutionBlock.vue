<template>
  <div>
    <div v-if="(userAnswer==correctAnswer)" class="answer font-weight-medium">
      <span>Ви дали правильну відповідь</span>
      <br>
      <span>Ваша відповідь: {{userAnswer}}</span>
      <br>
      <span v-if="userScore>=0">Отримано балів: {{userScore}}</span>
    </div>
    <div v-if="(userAnswerRight==0.5)" class="answer font-weight-medium">
      <span class="wrong">Ви частково виконали завдання</span>
      <br>
      <span class="wrong">Ваша відповідь: {{userAnswer}}</span>
      <br>
      <span>Правильна відповідь: {{correctAnswer}}</span>
      <br>
      <span>Отримано балів: {{userScore}}</span>
    </div>
    <div v-if="(userAnswerRight==0)" class="answer font-weight-medium">
      <span class="wrong">Ви дали неправильну відповідь</span>
      <br>
      <span class="wrong">Ваша відповідь: {{userAnswer}}</span>
      <br>
      <span>Правильна відповідь: {{correctAnswer}}</span>
      <br>
      <span v-if="userScore>=0">Отримано балів: {{userScore}}</span>
    </div>
    <div
      v-if="(userAnswer===undefined) && $route.name=='ZnoSolving'"
      class="answer font-weight-medium"
    >
      <span>Ви не виконували це завдання</span>
      <br>
      <span>Отримано балів: 0</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userAnswer: String,
    correctAnswer: String,
    userAnswerRight: Number,
    userScore: Number
  }
};
</script>

<style scoped>
.answer {
  padding: 16px;
  color: #1b5e20;
}
.wrong {
  color: red;
}
</style>
