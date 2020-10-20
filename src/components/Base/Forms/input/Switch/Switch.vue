<template>
  <q-field v-bind="fieldInput"
    class="q-field-padding"
    v-on="$attrs.events"
    item-aligned
    @input="clear">

    <template v-slot:prepend>
      <component :is="$attrs.type"
        class="font-size"
        @input="onInput($event)"
        v-bind="componentInput" />
    </template>
  </q-field>
</template>

<style lang="scss" scoped>
.font-size {
  font-size: 1rem;
}
.q-field-padding {
  padding-top: 0;
}
</style>

<script src="./Switch.ts" lang="ts"></script>