<!-- prettier-ignore -->
<template>
  <div class="description">
    <span>{{index}}. </span>
    <span>Завдання №{{task.number}} </span>
    <span v-if="task.znoType==1"> з основної сесії ЗНО</span>
    <span v-if="task.znoType==2"> з пробного ЗНО</span>
    <span v-if="task.znoType==3"> з додаткової сесії ЗНО</span>
    <span> {{task.year}} року </span>
    <span>({{task.theme.name}})</span>
  </div>
</template>

<script>
export default {
  name: "ZnoDescription",
  props: {
    task: Object,
    index: Number
  }
};
</script>
<style scoped>
.description {
  max-height: 48px;
}
</style>
