<template lang="html">
      <q-intersection
        once
        @visibility="onIntersection"
        transition="scale"
      >
          <img :src="shownSource">
      </q-intersection>
</template>

<style scoped lang="scss">
</style>

<script src="./Lazy.ts" lang="ts"></script>
