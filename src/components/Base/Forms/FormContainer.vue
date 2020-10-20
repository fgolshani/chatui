<template>
  <q-card class="container"
    :class="{[containerConfig.class.containerClass] : true}">
    <slot name="header">
      <div v-if="containerConfig.title"
        class="header between mid"
        :class="{[containerConfig.class.headerClass] : true}">

        <span class="mr-2">{{ containerConfig.title }}</span>

        <div>

          <q-btn flat
            v-if="containerConfig.list && containerConfig.list.link"
            dense
            :to="containerConfig.list.link"
            icon="list">
            <q-tooltip transition-show="scale"
              transition-hide="scale">
              نمایش جدولی
            </q-tooltip>
          </q-btn>

          <q-btn flat
            v-if="containerConfig.subLink && containerConfig.subLink.length"
            icon="more_vert">
            <q-menu auto-close
              transition-show="flip-right"
              transition-hide="flip-left">
              <q-list class="list">
                <q-item v-for="item in containerConfig.subLink"
                  :key="item.title"
                  :to="item.link ? item.link : null"
                  clickable
                  @click="item.clickHandler? item.clickHandler() : null">
                  <q-item-section avatar>
                    <q-icon color="primary"
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
    </slot>
    <q-form class="relative"
      @submit="submit(form.value)"
      ref="qForm"
      :class="{'loading' : containerConfig.loading, [containerConfig.class.bodyClass] : true}"
      @reset="reset($event)">
      <q-linear-progress query
        color="primary"
        class="progress"
        v-if="containerConfig.loading" />

      <slot />
      <FormMaker v-if="!containerConfig.noBuild"
        class="center"
        :form="form" />

      <slot name="button">
        <div class="center">
          <q-btn :loading="containerConfig.loading"
            label="ثبت"
            type="submit"
            color="primary" />
          <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
        </div>
      </slot>
    </q-form>
  </q-card>
</template>

<style lang="scss" scoped>
.header {
  font-size: 1rem;
  padding: 10px;
}
.progress {
  top: 0px;
  right: 0px;
  right: 0px;
  position: absolute;
}

.list {
  min-width: 175px;
  font-size: 0.75rem;
}

.container {
  background: white;
}
</style>

<script src="./FormContainer.ts" lang="ts"></script>
