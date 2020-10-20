<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="leftDrawerOpen = true"
          />

          <q-btn round flat>
            <q-avatar>
              <img
                :src="currentConversation ? currentConversation.avatar : null"
              />
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md">
            {{ currentConversation ? currentConversation.name : null }}
          </span>

          <q-space />

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="leftDrawerOpen = false"
          />
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="room in rooms"
              :key="room.id"
              clickable
              v-ripple
              @click="joinRoom(room)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="room.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ room.name }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <q-page class="cont">
          <div class="column px-3">
            <Chat v-for="chat in chatList" :input="chat" :key="chat.id" />
          </div>
        </q-page>
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input
            rounded
            outlined
            ref="input"
            dense
            @keydown.enter="sendMessage"
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            placeholder="Type a message"
          />
          <q-btn round flat icon="send" class="q-mr-sm" @click="sendMessage"/>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<style scoped lang="scss">
.cont {
  overflow: hidden;
  &::before {
    position: absolute;
    height: 100%;
    width: 100%;
    content: "";
    background: url(/statics/images/bg.png);
    opacity: 0.3;
    background-repeat: repeat;
  }
}

.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}

.WAL:before {
  content: "";
  height: 127px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #009688;
}

.WAL__layout {
  margin: 0 auto;
  z-index: 4000;
  height: 100%;
  width: 90%;
  max-width: 950px;
  border-radius: 5px;
}

.WAL__field.q-field--outlined .q-field__control:before {
  border: none;
}

.WAL__field {
  flex: 1;
}

.WAL .q-drawer--standard .WAL__drawer-close {
  display: none;
}

@media (max-width: 850px) {
  .WAL {
    padding: 0;
  }

  .WAL__layout {
    width: 100%;
    border-radius: 0;
  }
}

@media (min-width: 691px) {
  .WAL__drawer-open {
    display: none;
  }
}

.conversation__summary {
  margin-top: 4px;
}

.conversation__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>
<script src="./Index.ts" lang="ts" />
