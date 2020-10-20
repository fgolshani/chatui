<template>
  <q-input v-bind="$attrs"
    @input="onInput($event)"
    v-on="$attrs.events">
    <template v-slot:append>
      <q-icon name="event"
        class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale">
          <q-date :value="$attrs.value"
            :calendar="$attrs.calendar"
            @input="onInput($event)" />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-if="$attrs.icon"
      v-slot:prepend>
      <q-icon :name="$attrs.icon"
        color="primary" />
    </template>
  </q-input>
</template>

<style lang="scss" scoped>
</style>

<script src="./QCalendar.ts" lang="ts"></script>