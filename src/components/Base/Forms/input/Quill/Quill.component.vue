<template>
  <div>
    <q-field v-bind="$attrs"
      v-on="$attrs.events">
      <q-card class="mx-1 mt-3 mb-2"
        style="width: 100%">
        <q-card-section>
          <div ref="editor" />
        </q-card-section>
      </q-card>
    </q-field>
  </div>
</template>
<script src="./Quill.component.ts" lang="ts"></script>

<style lang="scss">
@import "src/css/quill";
.ql-container.ql-snow {
  max-height: 400px;
  overflow: auto;
  font-family: Vazir;
}
</style>