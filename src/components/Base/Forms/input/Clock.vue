<template>
  <q-input v-bind="$attrs"
    @input="onInput($event)"
    v-on="$attrs.events">
    <template v-slot:append>
      <q-icon name="access_time"
        class="cursor-pointer">
        <q-popup-proxy transition-show="scale"
          transition-hide="scale"
          breakpoint="10000">
          <q-time :value="$attrs.value"
            @input="onInput($event)" />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:prepend>
      <q-icon :name="$attrs.icon"
        color="primary" />
    </template>
  </q-input>
</template>

<style lang="scss" scoped>
</style>

<script src="./Clock.ts" lang="ts"></script>
