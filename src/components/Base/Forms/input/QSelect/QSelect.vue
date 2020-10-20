<template>
  <QuasarSelect v-bind="attrs"
    @input="onInput($event)"
    :options="filteredOptions"
    v-on="$attrs.events">
    <template v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData">
      <slot :name="name"
        v-bind="slotData" />
    </template>
  </QuasarSelect>

</template>

<style scoped lang="scss">
</style>

<script src="./QSelect.ts" lang="ts"></script>