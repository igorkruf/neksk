<template >
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name1"
        label="Название услуги"
        lazy-rules
        :rules="[(v) => (v && v.length > 0) || 'Обязательно заполнить']"
      />

      <visualEditor v-model="editor"></visualEditor>

      <q-input
        filled
        type="text"
        v-model="age1"
        label="Стоимость услуги от..."
        mask="### ### ###"
        reverse-fill-mask
        input-class="text-right"
        style="width: 200px"
        suffix=" руб."
      />
      <!-- select -->
      <!-- <q-select
        filled
        multiple
        option-label="label1"
        option-value="value1"
        v-model="select"
        label="Простой выбор"
        :options="stringOptions"
        style="width: 250px"
        behavior="menu"
      /> -->
      <br />
      <br />
    </q-form>
    <q-btn @click="addservice1">qqq</q-btn>
    <q-btn @click="addservice">qqqMongo</q-btn>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
//импортируем визуальный редактор
import visualEditor from "../VisualEditor.vue";
//import Editor from "@tinymce/tinymce-vue";
const stringOptions = [
  { value1: "car", label1: "BMW" },
  { label1: "Samsung Phone", value1: "phone" },
];
export default {
  setup() {
    const name1 = ref(null);
    const age1 = ref(null);
    const editor = ref("fffffff");
    const select = ref(null);
    const options = ref(stringOptions);
    const addservice1 = () => {
      console.log(select.value);
    };
    return {
      name1,
      age1,
      editor,
      stringOptions,
      select,
      options,
      addservice1,
    };
  },
  methods: {
    addservice() {
      console.log(this.editor);
      axios.post("http://localhost:3001/admin/addservice", {
        aaa: this.name1,
        ccc: this.age1,
        ddd: this.text,
        fff: this.editor,
        ggg: this.select,
      });
    },

    // addservice1() {
    //   console.log(this.select);
    // },
  },
  components: {
    visualEditor: visualEditor,
  },
};
</script>
