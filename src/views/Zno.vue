<template>
  <v-container>
    <div>
      <p class="title font-weight-medium">Оберіть тест ЗНО:</p>
    </div>
    <v-layout row wrap>
      <v-flex
        xs6
        sm4
        md3
        lg2
        v-for="(zno, index) in ZNO_LIST"
        :key="index"
        @click="goToZnoSolving(zno.year, zno.znoType)"
      >
        <v-card class="white--text round">
          <div class="wrapper">
            <div class="headline inCard text-xs-center">{{ zno.year }}</div>
            <hr>
            <div class="subheading inCard text-xs-center">{{ getTitle(zno.znoType) }}</div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ZNO_LIST from '@/constants/ZnoList';
export default {
	data() {
		return {
			ZNO_LIST
		};
	},
	methods: {
		goToZnoSolving(year, type) {
			this.$router.push({
				name: 'ZnoSolving',
				params: { year: year, znotype: type }
			});
		},
		getTitle: type =>
			type == 1 ? 'Основна сесія' : type == 2 ? 'Пробне ЗНО' : 'Додаткова сесія'
	}
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
	max-width: 200px;
	background: #00c6ff;
	background: linear-gradient(to top, #0072ff, #00c6ff);
}
</style>
