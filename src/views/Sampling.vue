<template>
  <v-container>
    <div>
      <p class="title font-weight-medium">Створіть власний тест за наступними параметрами:</p>
    </div>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg4>
        <check-box-group label="Оберіть роки" @update="checkedYears=$event" :items="YEARS"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <check-box-group label="Оберіть теми" @update="checkedThemes=$event" :items="THEMES"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-layout column>
          <v-flex xs12>
            <check-box-group
              label="Оберіть типи завдань"
              @update="checkedTypes=$event"
              :items="TYPES"
            />
          </v-flex>
          <v-flex>
            <div class="placeholder hidden-sm-and-down"/>
          </v-flex>
          <v-flex xs12>
            <check-box-group
              label="Оберіть типи ЗНО"
              @update="checkedZnoTypes=$event"
              :items="ZNO_TYPES"
            />
          </v-flex>
        </v-layout>
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
import THEMES from '@/constants/Themes';
import YEARS from '@/constants/Years';
import TYPES from '@/constants/Types';
import ZNO_TYPES from '@/constants/ZnoTypes';
import CheckBoxGroup from '../components/CheckBoxGroup.vue';

export default {
	components: {
		CheckBoxGroup
	},
	data() {
		return {
			THEMES,
			TYPES,
			ZNO_TYPES,
			YEARS,
			checkedYears: [],
			checkedThemes: [],
			checkedTypes: [],
			checkedZnoTypes: []
		};
	}
};
</script>
<style scoped>
.placeholder {
	height: 3em;
}
</style>

