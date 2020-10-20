<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer v-model="openTrigger"
      bordered
      elevated
      :breakpoint="10000"
      class="q-drawer-bg">
      <q-list>
        <q-item-label header>
          دسترسی سریع
        </q-item-label>
        <q-item v-for="link in links"
          :key="link.to"
          clickable
          tag="a"
          :to="link.to">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer v-if="!layout.hideFooter" />
  </q-layout>
</template>

<style lang="scss" scoped>
@import "src/css/partial/_mixin.scss";
.e-header {
  z-index: 2001;
  background: rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(5px);
  transition: min-height cubic-bezier(0.18, 0.89, 0.32, 1.28) 300ms;
  min-height: 64px;
  @include screen(tablet) {
    min-height: 56px;
  }
  @include screen(mobile) {
    min-height: 50px;
  }
}
.hide-web {
  @include screen(web) {
    display: none;
  }
}
.router-link-exact-active {
  button {
    background: #00000047;
  }
}
.logo {
  width: 120px;
}
</style>

<script src="./Base.ts" lang="ts"></script>
