<template>
  <div class="body">
    <ksk-news></ksk-news>
  </div>
</template>

<script>
import { ref } from 'vue';
import kskNews from './components/Raznoe/Newsksk66/Newsksk66.vue';
export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  components: {
    kskNews,
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