<template >
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name1"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(v) => (v && v.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="age1"
        label="Your age *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your age',
          (val) => (val > 0 && val < 100) || 'Please type a real age',
        ]"
      />
      <!-- <div class="q-pa-md q-gutter-sm"> -->

      <visualEditor v-model="editor"></visualEditor>
    </q-form>
    <q-btn @click="addservice"></q-btn>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
//импортируем визуальный редактор
import visualEditor from "../VisualEditor.vue";

export default {
  setup() {
    const name1 = ref(null);
    const age1 = ref(null);
    return {
      name1,
      age1,
      text: ref(""),
      editor: ref("nklkl j jlj lkjlklk lklklklkj lkklj"),
    };
  },
  methods: {
    addservice() {
      axios.post("http://localhost:3001/test/form", {
        aaa: this.name1,
        ccc: this.age1,
        ddd: this.text,
        fff: this.editor,
      });
    },
  },
  components: {
    visualEditor,
  },
};
</script>
