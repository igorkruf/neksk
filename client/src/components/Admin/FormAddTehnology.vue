<template >
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Название технологии"
        lazy-rules
        :rules="[(v) => (v && v.length > 0) || 'Обязательно заполнить']"
      />

      <visualEditor v-model="editor"></visualEditor>

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
    <!-- <q-btn @click="addservice1">qqq</q-btn> -->
    <q-btn @click="addtehnology">Добавить технологию</q-btn>
    <spisokTehnologes :spisokTehnologes="sptehn"></spisokTehnologes>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
//импортируем визуальный редактор
import visualEditor from "../VisualEditor.vue";
import spisokTehnologes from "@/components/Admin/SpisokTehnologes.vue";
//import Editor from "@tinymce/tinymce-vue";
// const stringOptions = [
//   { value1: "car", label1: "BMW" },
//   { label1: "Samsung Phone", value1: "phone" },
// ];
export default {
  setup() {
    axios.get("http://localhost:3001/admin/spisokservices", {}).then((res) => {
      spserv.value = res.data;
    });
    const name = ref(null);
    const editor = ref("");

    const sptehn = ref(null);
    const addtehnology = () => {
      axios
        .post("http://localhost:3001/admin/addservice", {
          name: name.value,
          editor: editor.value,
          cena: cena.value,
        })
        .then((res) => {
          //console.log(res);
          (name.value = ""), (editor.value = "");
          spserv.value = res.data;
        });
    };

    // const polspservices = () => {
    //   axios
    //     .get("http://localhost:3001/admin/spisokservices", {})
    //     .then((res) => {
    //       spserv.value = res.data;
    //     });
    // };
    return {
      name,
      editor,
      sptehn,
      addtehnology,
      //polspservices,
    };
  },
  methods: {
    // addservice1() {
    //   console.log(this.select);
    // },
  },
  components: {
    visualEditor: visualEditor,
    spisokTehnologes: spisokTehnologes,
  },
};
</script>
