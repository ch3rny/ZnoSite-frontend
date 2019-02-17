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
        <v-card class="mx-auto card" color="#26c6da" dark>
          <v-card-text class="text-xs-center pb-0 headline font-weight-bold">{{zno.year}}</v-card-text>
          <v-card-text
            class="text-xs-center pt-0 body-2 font-weight-light"
          >{{getZnoType(zno.znoType)}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ZNO_LIST from '@/constants/ZnoList';
import { getZnoType } from '@/mixins/zno-type';
export default {
	data() {
		return {
			ZNO_LIST
		};
	},
	mixins: [getZnoType],
	methods: {
		goToZnoSolving(year, type) {
			this.$router.push({
				name: 'ZnoSolving',
				params: { year: year, znotype: type }
			});
		}
	}
};
</script>

<style scoped>
.card {
	border-radius: 10px;
	background: #00c6ff;
	background: linear-gradient(to top, #0072ff, #00c6ff);
	cursor: pointer;
}
</style>
