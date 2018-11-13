<template>
  <div class="description">
    <span>{{index}}. </span>
    <span>Завдання №{{number}} </span>
    <span v-if="znoType==1">з основної сесії ЗНО </span>
    <span v-if="znoType==2">з пробного ЗНО </span>
    <span v-if="znoType==3">з додаткової сесії ЗНО </span>
    <span>{{year}} року </span>
    <span>({{theme}})</span>
  </div>
</template>

<script>
export default {
  name: "ZnoDescription",
  props: {
    znoType: Number,
    number: Number,
    year: Number,
    theme: String,
    index: Number
  }
};
</script>
<style scoped>
.description {
  max-height: 48px;
}
</style>
