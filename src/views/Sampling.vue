<template>
  <v-container grid-list-md>
    <div>
      <p class="title font-weight-medium">Створіть власний тест за наступними параметрами:</p>
    </div>
    <v-layout row wrap="">
      <v-flex xs12 sm6 md4 lg4>
        <div>
          <v-subheader>Оберіть роки</v-subheader>
          <v-checkbox
            hide-details
            v-for="k in YEARS"
            v-model="checkedYears"
            :value="k"
            :key="k"
            :label="k.toString()"
            color="primary"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <div>
          <v-subheader>Оберіть теми</v-subheader>
          <v-checkbox
            hide-details
            v-for="theme in THEMES"
            v-model="checkedThemes"
            :value="theme"
            :key="theme"
            :label="theme"
            color="primary"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <div>
          <v-subheader>Оберіть типи завдань</v-subheader>
          <v-checkbox
            hide-details
            v-for="type in TYPES"
            v-model="checkedTypes"
            :value="type.value"
            :key="type.value"
            :label="type.name"
            color="primary"
          ></v-checkbox>
          <br>
          <br>
          <br>
          <v-subheader>Оберіть типи ЗНО</v-subheader>
          <v-checkbox
            hide-details
            v-for="type in ZNO_TYPES"
            v-model="checkedZnoTypes"
            :value="type.value"
            :key="type.name"
            :label="type.name"
            color="primary"
          ></v-checkbox>
        </div>
      </v-flex>
    </v-layout>
    <v-fab-transition>
      <v-btn
        color="primary"
        dark
        fixed
        bottom
        right
        fab
        :to="{ name: 'TestSolving', 
        query: {years: checkedYears, 
        themes: checkedThemes,
        znotypes: checkedZnoTypes, 
        types: checkedTypes} }"
      >
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import THEMES from "@/constants/Themes";
import YEARS from "@/constants/Years";
import TYPES from "@/constants/Types";
import ZNO_TYPES from "@/constants/ZnoTypes";

export default {
  data() {
    return {
      THEMES,
      TYPES,
      ZNO_TYPES,
      YEARS,
      checkedYears: [],
      checkedThemes: [],
      checkedTypes: [],
      checkedZnoTypes: [],
    };
  },
};
</script>

<style scoped>
.v-input {
  padding-left: 8px;
  margin-top: 4px;
}
</style>

