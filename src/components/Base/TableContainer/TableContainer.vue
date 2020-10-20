<template>
  <q-card>
    <div v-if="containerOptions.title"
      class="header between mid">
      <span class="mr-1">{{ containerOptions.title }}</span>

      <div>
        <q-btn flat
          v-if="containerOptions.filterForm"
          dense
          @click="openFilterDialog"
          icon="search">
          <q-tooltip transition-show="scale"
            transition-hide="scale">
            فیلتر و جستجو
          </q-tooltip>
        </q-btn>

        <q-btn flat
          v-if="containerOptions.delete && containerOptions.delete.handler"
          dense
          :disabled="disabled"
          @click="openDialog"
          icon="close">
          <q-tooltip transition-show="scale"
            transition-hide="scale">
            حذف مورد انتخابی
          </q-tooltip>
        </q-btn>

        <q-btn flat
          v-if="containerOptions.add && containerOptions.add.link"
          dense
          :to="containerOptions.add.link"
          icon="add">
          <q-tooltip transition-show="scale"
            transition-hide="scale">
            ایجاد مورد جدید
          </q-tooltip>
        </q-btn>

        <q-btn flat
          dense
          v-if="containerOptions.subLink && containerOptions.subLink.length"
          icon="more_vert">
          <q-menu auto-close
            transition-show="flip-right"
            transition-hide="flip-left">
            <q-list class="list">
              <q-item v-for="item in containerOptions.subLink"
                :key="item.title"
                :to="item.link ? item.link : null"
                clickable
                @click="item.clickHandler? item.clickHandler() : null">
                <q-item-section avatar>
                  <q-icon color="accent"
                    :name="item.icon" />
                </q-item-section>
                <q-item-section>{{ item.title }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <q-separator />
    <q-table v-bind="$attrs"
      v-on="childEvents"
      :selected.sync="_selected"
      :pagination.sync="_pagination"
      :columns="trnsformedColumns">
      <template v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData">
        <slot :name="name"
          v-bind="slotData" />
      </template>
    </q-table>
  </q-card>
</template>


<style lang="scss" scoped>
.header {
  font-size: 1rem;
  padding: 10px;
  z-index: 1000;
}

.list {
  min-width: 175px;
  font-size: 0.75rem;
}
</style>

<script src="./TableContainer.ts" lang="ts"></script>
