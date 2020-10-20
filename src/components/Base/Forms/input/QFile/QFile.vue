<template>
  <QuasarFile v-bind="$attrs"
    :value="transformedValue"
    @input="onInput($event)"
    v-on="$attrs.events">

    <template v-if="$attrs.icon"
      v-slot:prepend>
      <q-icon :name="$attrs.icon"
        color="primary" />
    </template>

    <template v-slot:append>

      <q-icon dense
        name="image_search"
        flat
        round
        v-if="$attrs.preview && imageUrl"
        @click="previewImage" />

    </template>

    <q-dialog v-model="isModalOpen"
      class="image-dialog">
      <q-scroll-area class="fit">

        <img :src="imageUrl"
          spinner-color="white"
          class="rounded-borders">

      </q-scroll-area>
    </q-dialog>

  </QuasarFile>
</template>

<style scoped lang="scss">
</style>

<script src="./QFile.ts" lang="ts"></script>