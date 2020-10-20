<template>
  <component :is="field.component"
    v-bind="childProp"
    :value="value"
    v-on="childEvent"
    ref="ref"
    @input="onValChanged">

    <template v-if="childProp.icon"
      v-slot:prepend>
      <q-icon :name="childProp.icon"
        color="primary" />
    </template>

    <template v-slot:append>
      <q-icon dense
        v-if="field.passwordToggle"
        flat
        round
        :name="field.type == 'password' ? 'visibility' : 'visibility_off'"
        @click="field.type == 'password' ? field.type = 'text' : field.type = 'password'" />

    </template>

  </component>
</template>

<style lang="scss" scoped>
</style>

<script src="./FormField.ts" lang="ts"></script>
