
<template>
  <q-dialog ref="dialog"
    v-bind="$attrs">
    <FormContainer :form="form"
      class="q-dialog-plugin"
      @submit="submit" />
  </q-dialog>
</template>


<style scoped lang="scss">
</style>

<script src="./TableFilter.ts" lang="ts"></script>