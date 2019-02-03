<template>
  <div>
    <v-subheader>{{label}}</v-subheader>
    <v-checkbox
      class="checkbox"
      hide-details
      v-for="(item,index) in items"
      v-model="checked"
      :value="getValue(item)"
      :key="index"
      :label="getLabel(item)"
      color="primary"
      @change="$emit('update', checked)"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
	props: {
		items: Array,
		label: String
	},
	data() {
		return { checked: [] };
	},
	methods: {
		getLabel: item => (item.name ? item.name : item),
		getValue: item => (item.value ? item.value : item)
	}
};
</script>

<style scoped>
.checkbox {
	padding-left: 8px;
	margin-top: 4px;
}
</style>
