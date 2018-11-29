<template>
  <v-container class="noPadding" grid-list-md>
    <v-slide-y-transition>
      <v-layout
        row
        wrap
        justify-center
        v-touch="{ 
          left: () => nextTask(),
          right: () => prevTask()
          }"
      >
        <Loader :loading="loading"/>
        <!--Number block-->
        <v-flex d-flex xs12 md10 lg9 class="card__wrapper">
          <v-layout justify-center wrap>
            <div v-if="this.tasks.length>pageSize" @click="prevPage">
              <div
                :class="[
              {number:true},
              {disabled: currentPage==1}
              ]"
              >❮</div>
            </div>
            <div
              v-for="n in tasks.length"
              v-show="(n>(currentPage-1)*pageSize) && (n<=currentPage*pageSize)"
              :key="n"
              @click="changeTask(n)"
            >
              <div
                v-ripple
                :class="[
                { isActive: activeTask==n },
                {number: true},
                {isTrue: userAnswersRight[n-1]==1},
                {isFalse: userAnswersRight[n-1]==0}
              ]"
              >{{n}}</div>
            </div>
            <div v-if="this.tasks.length>pageSize" @click="nextPage">
              <div
                :class="[
              {number:true},
              {disabled:currentPage==pagesTotal}
              ]"
              >❯</div>
            </div>
            <div v-if="showResult" @click="endTest">
              <div
                :class="[
                { isActive: activeTask==tasks.length+1 },
                {number: true}]"
              >&#931;</div>
            </div>
          </v-layout>
        </v-flex>
        <!--Number block End-->
        <v-flex
          xs12
          sm12
          md10
          lg9
          v-for="(task, index) in tasks"
          :key="task.key"
          v-if="activeTask==index+1"
        >
          <v-card class="card__wrapper">
            <v-subheader>
              <ZnoDescription
                :index="index+1"
                :znoType="task.zno_type"
                :number="task.number"
                :year="task.year"
                :theme="task.theme.name"
              ></ZnoDescription>
            </v-subheader>
            <div>
              <img :src="ROOT_URL+task.task_image" alt>
            </div>
            <answer-block
              v-if="userAnswersValue[index]===undefined"
              @checkAnswer="checkSolving($event, index)"
              :answer="task.correct_answer"
              :type="task.type"
            ></answer-block>
            <div
              v-if="userAnswersValue[index]==task.correct_answer"
              class="answer font-weight-medium"
            >
              <span>Ви дали правильну відповідь</span>
              <br>
              <span>Ваша відповідь: {{userAnswersValue[index]}}</span>
            </div>
            <div v-if="userAnswersRight[index]==0" class="answer font-weight-medium">
              <span class="wrong">Ви дали неправильну відповідь</span>
              <br>
              <span class="wrong">Ваша відповідь: {{userAnswersValue[index]}}</span>
              <br>
              <span>Правильна відповідь: {{task.correct_answer}}</span>
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
                  :disabled="activeTask==1"
                  @click="prevTask"
                >Попереднє</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn
                  round
                  block
                  outline
                  color="primary"
                  v-if="activeTask<tasks.length"
                  @click="nextTask"
                >Наступне</v-btn>
                <v-btn
                  round
                  block
                  outline
                  color="primary"
                  v-if="activeTask==tasks.length"
                  @click="endTest"
                >Завершити</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 sm12 md10 lg9 v-if="showResult && (activeTask > tasks.length)">
          <Result :all="tasks.length" :answers="userAnswersRight"></Result>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import ZnoDescription from "../components/ZnoDescription.vue";
import AnswerBlock from "../components/AnswerBlock.vue";
import Result from "../components/Result.vue";
import Loader from "../components/Loader.vue";
import api from "@/api";
import { ROOT_URL } from "@/constants/Const";

export default {
  components: {
    ZnoDescription,
    AnswerBlock,
    Result,
    Loader
  },
  data() {
    return {
      tasks: [],
      ROOT_URL,
      userAnswersRight: [],
      userAnswersValue: [],
      activeTask: 1,
      showResult: false,
      currentPage: 1,
      pageSize: 15,
      loading: true,
      mode: "sampling",
      timer: null
    };
  },

  computed: {
    pagesTotal() {
      return Math.ceil(this.tasks.length / this.pageSize);
    },
    checkedYears() {
      return this.$route.query.years;
    },
    checkedThemes() {
      return this.$route.query.themes;
    },
    checkedTypes() {
      return this.$route.query.types;
    },
    checkedZnoTypes() {
      return this.$route.query.znotypes;
    }
  },
  methods: {
    checkSolving(value, index) {
      this.userAnswersValue[index] = value;
      this.userAnswersRight[index] =
        value == this.tasks[index].correct_answer ? 1 : 0;
      this.$forceUpdate();
      this.timer = setTimeout(this.nextTask, 3000);
    },
    changeTask(n) {
      clearTimeout(this.timer);
      this.activeTask = n;
    },
    nextTask() {
      clearTimeout(this.timer);
      if (this.activeTask == this.currentPage * this.pageSize) this.nextPage();
      if (this.activeTask < this.tasks.length) this.activeTask++;
    },
    prevTask() {
      if (this.activeTask == (this.currentPage - 1) * this.pageSize + 1)
        this.prevPage();
      if (this.activeTask > 1) this.activeTask--;
    },
    endTest() {
      this.showResult = true;
      this.activeTask = this.tasks.length + 1;
    },
    nextPage() {
      if (this.currentPage < this.pagesTotal) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  created() {
    this.mode = this.$route.params.mode;
  },
  mounted() {
    if (this.mode == "bundle") {
      api.tasks
        .getBundleTasks(this.$route.params.tasks)
        .then(res => (this.tasks = res.data));
    } else {
      api.tasks
        .getTasks(
          this.checkedYears,
          this.checkedThemes,
          this.checkedTypes,
          this.checkedZnoTypes
        )
        .then(res => (this.tasks = res.data));
    }
  },
  updated() {
    this.loading = false;
    if (this.tasks.length == 0) this.$router.push({ name: "Empty" });
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
.isFalse {
  border: 2px solid red;
  color: white;
  background-color: red;
}
.answer {
  padding: 16px;
  color: #1b5e20;
}
.wrong {
  color: red;
}
.noPadding {
  padding: 0;
  margin: 0;
}
.disabled {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #a0a0a0;
  color: #a0a0a0;
  text-align: center;
  padding-top: 3px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 8pt;
  font-weight: 600;
  cursor: default;
}
</style>
