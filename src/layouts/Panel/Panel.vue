<template>
  <q-layout view="lHh Lpr lFf"
    class="container">
    <q-header elevated
      class="header"
      height-hint="64">
      <q-toolbar>
        <q-btn flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          class="white"
          @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-space />
        <q-space />
        <div class="row items-center no-wrap">
          <q-btn-dropdown flat
            dense
            icon="person">
            <q-list dense>
              <router-link to="/dashboard/profile/edit">
                <q-item v-close-popup
                  dense
                  clickable>
                  <q-item-section avatar>
                    <q-avatar icon="account_circle" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>پروفایل</q-item-label>
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/dashboard/profile/change-password">
                <q-item v-close-popup
                  dense
                  clickable>
                  <q-item-section avatar>
                    <q-avatar icon="lock" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>تغییر رمز عبور</q-item-label>
                  </q-item-section>
                </q-item>
              </router-link>

              <q-item v-close-popup
                dense
                clickable
                @click="logOut">
                <q-item-section avatar>
                  <q-avatar icon="logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>خروج</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="280">
      <q-toolbar-title shrink
        class="py-2">
        <router-link to="/"
          class="row last items-center no-wrap center">
          <p class="logo--font mb-0 mt-2">
            EvoTeam
          </p>
        </router-link>
      </q-toolbar-title>

      <q-list bordered
        class="my-2 mx-1">
        <q-card>
          <q-card-section v-for="link in links"
            :key="link.title"
            class="p-0">
            <q-list v-if="!link.child">
              <q-item v-ripple
                :key="link.title"
                v-if="!link.hide"
                :to="link.link"
                clickable>
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  {{ link.title }}
                </q-item-section>
              </q-item>
            </q-list>

            <q-expansion-item v-else
              expand-separator
              :icon="link.icon"
              icon-class="icon"
              :label="link.title">
              <q-list dense
                bordered
                padding>
                <template v-for="child in link.child">
                  <q-item v-ripple
                    :key="child.title"
                    v-if="!child.hide"
                    :to="child.link"
                    clickable>
                    <q-item-section>
                      {{ child.title }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>

            </q-expansion-item>
          </q-card-section>
        </q-card>
      </q-list>
    </q-drawer>

    <q-page-container class="container">
      <div class="max-container mt-0 mb-0">
        <q-card class="breadcrumb-card p-2 my-2">
          <q-breadcrumbs>
            <template v-slot:separator>
              <q-icon size="1.5em"
                name="chevron_right"
                color="dark" />
            </template>
            <q-breadcrumbs-el v-for="(item, index) in store.list"
              :key="index"
              class="breadcrumb"
              :class="{'current': index == store.list.length - 1}">
              <router-link :to="item.link"
                class="pointer">
                {{ item.title }}
              </router-link>
            </q-breadcrumbs-el>
          </q-breadcrumbs>
        </q-card>
        <div class="my-2">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
@import "src/css/partial/_mixin.scss";
.header {
  background: $primary;
}

.breadcrumb-card {
  box-shadow: 3px 3px 7px 5px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

  .breadcrumb {
    color: $dark;
    &.current {
      border-radius: 50px;
      padding: 5px 10px 5px 10px;
      color: #e3e2f3;
      background: $dark;
    }
  }
}
.logo {
  height: 50px;
}

.logo--font {
  font-size: 2.5rem;
  color: #585858;
}
</style>

<style lang="scss">
</style>


<script src="./Panel.ts" lang="ts"></script>