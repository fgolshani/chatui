<template>
  <div class="row">
    <FormField v-for="(value, key) in form.fields"
      :key="key"
      v-model="form.value[key]"
      :field="value"
      :class="{normilize : !value.rules}" />
  </div>
</template>

<style lang="scss" scoped>
.normilize {
  padding-bottom: 20px;
}
</style>

<script src="./FormMaker.ts" lang="ts"></script>
