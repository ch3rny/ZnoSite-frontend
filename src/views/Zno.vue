<template>
  <v-container grid-list-md>
    <div>
      <p class="title font-weight-medium">Оберіть тест ЗНО:</p>
    </div>
    <v-layout row wrap="">
      <v-flex
        xs6
        sm4
        md3
        v-for="(zno, index) in ZNO_LIST"
        :key="index"
        @click="goToZnoSolving(zno.year, zno.znoType)"
      >
        <v-card class="white--text round">
          <div class="wrapper">
            <div class="headline inCard text-xs-center">{{zno.year}}</div>
            <hr>
            <div class="subheading inCard text-xs-center">{{getTitle(zno.znoType)}}</div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ZNO_LIST from "@/constants/ZnoList";
export default {
  data() {
    return {
      ZNO_LIST,
    };
  },
  methods: {
    goToZnoSolving(year, type) {
      this.$store.commit("znoSelection/setYear", [year]);
      this.$store.commit("znoSelection/setZnoType", [type]);
      this.$store.commit("znoSelection/setThemes", []);
      this.$store.commit("znoSelection/setType", []);
      this.$store.commit("znoTimer/setEndTime");
      this.$router.push({ name: "ZnoSolving" });
    },
    getTitle(type) {
      var desc = "";
      switch (type) {
        case 1:
          desc = "Основна сесія";
          break;
        case 2:
          desc = "Пробне ЗНО";
          break;
        case 3:
          desc = "Додаткова сесія";
          break;
      }
      return desc;
    },
  },
};
</script>

<style scoped>
span {
  margin-left: 12px;
  cursor: pointer;
  color: #1976d2;
}
div {
  margin-bottom: 10px;
}
.inCard {
  margin-bottom: 0;
}
.wrapper {
  padding: 10px;
  cursor: pointer;
}
.round {
  border-radius: 10px;
  background: #00c6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #0072ff,
    #00c6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #0072ff,
    #00c6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
