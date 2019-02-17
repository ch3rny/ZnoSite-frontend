<template>
	<div class="description">
		<v-subheader>
			<span>{{ index + 1 }}.</span>
			<span>Завдання №{{ number }}</span>
			<span v-if="zno_type == 1">з основної сесії ЗНО</span>
			<span v-if="zno_type == 2">з пробного ЗНО</span>
			<span v-if="zno_type == 3">з додаткової сесії ЗНО</span>
			<span>{{ year }} року</span>
			<span>({{ theme.name }})</span>
		</v-subheader>
	</div>
</template>

<script>
export default {
	props: {
		index: Number,
		number: Number,
		zno_type: Number,
		year: Number,
		theme: Object
	}
};
</script>
<style scoped>
.description {
	max-height: 48px;
}
</style>
