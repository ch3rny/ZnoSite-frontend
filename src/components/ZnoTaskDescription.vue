<!-- prettier-ignore -->
<template>
  <v-subheader>
    <span>{{year}}&nbsp;({{getZnoType(zno_type)}})</span>
    <v-spacer/>
    <span>Завдання {{number}} з {{length}}</span>
  </v-subheader>
</template>
<!-- prettier-ignore -->
<script>
import { getZnoType } from '@/mixins/zno-type';
export default {
	props: {
		year: Number,
		znotype: Number,
		number: Number,
		length: Number
	},
	mixins: [getZnoType]
};
</script>
<style scoped>
</style>
