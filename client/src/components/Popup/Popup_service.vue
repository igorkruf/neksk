<template>
  <transition name="pr" @after-leave="afterLeave">
    <div class="modal-backdrop" v-if="visible_modal_backdrop" @click.self="visible_modal = !visible_modal">
      <transition name="pr1" appear @after-enter="afterEnter" @after-leave="afterLeave_modal">
        <div class="modal" v-if="visible_modal">
          <slot name="header">
            This is the default tile!

            <q-btn class="close" round @click="visible_modal = !visible_modal"><q-icon name="close" /></q-btn>
          </slot>
          <div class="modal-body">
            <slot name="body"> I'm the default body! </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const visible_modal_backdrop = ref(true);
    const visible_modal = ref(true);

    return {
      visible_modal_backdrop,
      visible_modal,
    };
  },
  data() {
    return {};
  },

  methods: {
    afterEnter() {
      let ddd = document.querySelector('.modal');
      ddd.style.top = '100px';
    },
    afterLeave_modal() {
      this.visible_modal_backdrop = !this.visible_modal_backdrop;
    },
    afterLeave() {
      this.$emit('close');
    },
  },
  mounted() {
    //console.log(this.$refs.mb);
    // let vm = this;
    // document.addEventListener('click', function (event) {
    //   if (event.target == vm.$refs.mb) {
    //     console.log('hh');
    //   }
    // });
  },
};
</script>
<style lang="scss">
.modal-backdrop {
  background-color: rgba(75, 75, 75, 0.89);
  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2001;
}
.modal {
  position: fixed;
  top: 0px;
  background-color: #fff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  padding: 16px;
  width: 900px;
  z-index: 2002;
  left: calc(50vw - 450px);
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>

