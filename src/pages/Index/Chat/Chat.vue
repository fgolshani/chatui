
<template>
  <div :class="input.isMine ?'end' : ''">
    <q-card class="p-1 m-2 text-grey-9"
      :class="input.isMine ? 'mine': 'bg-grey-3'"
      style="display: inline-block">
      <div class="between mb-1">
        <span>
          {{ input.name }}
        </span>
        <span class="mx-2" />
        <span>
          {{ input.date }}
        </span>
        <!-- <q-chip dense> -->
        <!-- </q-chip> -->
      </div>
      <span class="text-black">{{ input.message }}</span>
    </q-card>
  </div>

</template>


<style scoped lang="scss">
.mine {
  background-color: #dcf8c6;
}
</style>

<script src="./Chat.ts" lang="ts"></script>