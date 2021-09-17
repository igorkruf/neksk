<template>
  <q-layout view="lhh lp lff">
    <q-header reveal bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn
          class="lt-md"
          dense
          flat
          round
          icon="menu"
          @click="drawerLeft = !drawerLeft"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      side="left"
      show-if-above
      breakpoint="1023"
      bordered
      width="400"
    >
      <!-- drawer content -->
      <!-- <div style="max-width: 80vw"> -->
      <q-list separator>
        <q-item
          clickable
          v-ripple
          active-class="my-menu-link"
          :active="link === 'singleline'"
          @click="link = 'singleline'"
        >
          <q-item-section>Single line item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="my-menu-link">
          <q-item-section>
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label>Item with caption</q-item-label>
          </q-item-section>
        </q-item>

        <!-- </div> -->

        <q-item
          clickable
          v-ripple
          :active="link === 'inbox'"
          @click="link = 'inbox'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>Inbox</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'outbox'"
          @click="link = 'outbox'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>Outbox</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'trash'"
          @click="link = 'trash'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>

          <q-item-section>Trash</q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item
          clickable
          v-ripple
          :active="link === 'settings'"
          @click="link = 'settings'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'help'"
          @click="link = 'help'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>

          <q-item-section>Help</q-item-section>
        </q-item>

        <q-expansion-item
          :content-inset-level="0.5"
          expand-separator
          icon="mail"
          label="Услуги"
          default-opened
        >
          <q-item clickable :to="{ name: 'addservice' }">
            <q-item-section>Добавление услуги</q-item-section>
          </q-item>
          <q-item clickable :to="{ name: 'test' }">
            <q-item-section>Тэст</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          :content-inset-level="0.5"
          expand-separator
          icon=""
          label="Moodle"
          default-opened
        >
          <q-item clickable :to="{ name: 'Moodle', params: { id: 1 } }">
            <q-item-section>Аграрный колледж</q-item-section>
          </q-item>
          <q-item clickable :to="{ name: 'VueMoodle', params: { id: 2 } }">
            <q-item-section
              >Аграрные колледж(без Backend только Vue)</q-item-section
            >
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

 <style lang="scss">
/* .row {
  border: 1px solid red;
  height: 150px;
} */
.q2 {
  border: 1px solid green;
}
.q-drawer--left {
  max-width: 80vw;
}
.my-menu-link {
  color: white;
  background: #f2c037;
}
</style>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      drawerLeft: ref(false),
      link: ref(),
      link1: ref(),
      addservice: "addservice",
    };
  },
};
</script>
