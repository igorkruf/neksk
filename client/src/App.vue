<template>
  <div class="body">
    <q-layout view="lHh lpr lFf">
      <q-header reveal elevated>
        <!-- <router-view name="header" @toggle_drawer="toggleLeftDrawer" /> -->

        <div class="row header">
          <div class="col-auto q-pa-lg self-center column lt-sm">
            <!-- <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" /> -->
            <q-btn flat @click="toggleLeftDrawer" round dense icon="menu" />
          </div>
          <div class="row col no-wrap justify-between bbb">
            <div class="row q-ml-lg q-pb-sm content-end q-gutter-sm gt-xs hm">
              <q-space />
              <q-tabs v-model="tab">
                <q-route-tab class="col-auto q-pa-sm" :to="{ name: 'Home' }" label="Главная" />

                <q-route-tab class="col-auto q-pa-sm" :to="{ name: 'Uslugi' }" label="Услуги" />
                <q-route-tab class="col-auto q-pa-sm" :to="{ name: 'Tehnologes' }" label="Технологии" />
              </q-tabs>
            </div>

            <div class="column q-px-sm justify-around q-ma-md col hk">
              <div><q-icon name="phone" /> 8(902)-264-69-69</div>
              <div><q-icon name="alternate_email" /> igor-kruf@list.ru</div>
            </div>
          </div>
        </div>
      </q-header>
      <q-page-container>
        <router-view v-slot="{ Component }">
          <transition name="prozrachnost" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
      <q-drawer v-model="leftDrawerOpen" :width="200" :breakpoint="3000" overlay bordered class="bg-grey-3">
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue';
const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true,
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false,
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
  },
];
export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuList,
    };
  },
};
</script>
<style>
.body {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #8b7b78;
}
.header {
  background-color: #8b7b78;
  min-height: 100px;
}
.header > div {
  border: 0px solid #fff;
}
.hm > div {
  border: 0px solid green;
}
.bbb > div {
  border: 0px solid green;
}
.hk {
  text-align: right;
}

/* анимация переходы */
/* ///////////////////////////// */
.prozrachnost-enter-active,
.prozrachnost-leave-active {
  transition: opacity 1s;
}

.prozrachnost-enter-from,
.prozrachnost-leave-to {
  opacity: 0;
}
.prozrachnost-enter-to,
.prozrachnost-leave-from {
  opacity: 1;
}
/* /////////////////////////// */
/* ///////////////////////////// */
/* .prozrachnost_razmer-enter-active,
.prozrachnost_razmer-leave-active {
  transition: opacity 5s linear;
}

.prozrachnost_razmer-enter-from,
.prozrachnost_razmer-leave-to {
  opacity: 0;
}
.prozrachnost_razmer-enter-to,
.prozrachnost_razmer-leave-from {
  opacity: 1;
} */
/* /////////////////////////// */
/* ///////////////////////////// */
.pr-enter-to,
.pr-leave-from {
  opacity: 1;
}
.pr-enter-active,
.pr-leave-active {
  transition: opacity 0.3s ease;
}

.pr-enter-from,
.pr-leave-to {
  opacity: 0;
}

/* /////////////////////////// */
/* ///////////////////////////// */
.pr1-enter-to {
  opacity: 1;
  transform: translateY(100px);
}
.pr1-leave-from {
  opacity: 1;
}
.pr1-enter-active,
.pr1-leave-active {
  transition: all 1s ease-in-out;
}

.pr1-enter-from {
  opacity: 0;
}

.pr1-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

/* /////////////////////////// */
/*//////////////////////////////*/
/* ///Анимация списка технологий// */
.list_tehnologes-enter-to,
.list_tehnologes-leave-from {
  opacity: 1;
  /* transform: rotate(360deg); */
}
.list_tehnologes-enter-active,
.list_tehnologes-leave-active {
  transition: all 0.5s ease-in-out;
}

.list_tehnologes-enter-from,
.list_tehnologes-leave-to {
  opacity: 0;
  /* transform: rotate(270deg); */
}
</style>