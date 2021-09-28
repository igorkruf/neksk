<template >
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Название услуги"
        lazy-rules
        :rules="[(v) => (v && v.length > 0) || 'Обязательно заполнить']"
      />

      <visualEditor v-model="editor"></visualEditor>

      <q-input
        filled
        type="text"
        mask="### ### ###"
        reverse-fill-mask
        v-model="cena"
        label="Стоимость услуги от..."
        style="width: 200px"
        suffix=" руб."
        :input-style="{ textAlign: 'right' }"
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
    <!-- <q-btn @click="addservice1">qqq</q-btn> -->
    <q-btn @click="addservice">Добавить услугу</q-btn>

    <spisokServices
      :spisokservices="spserv"
      v-on:del_service33="del_service"
    ></spisokServices>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
//импортируем визуальный редактор
import visualEditor from "../VisualEditor.vue";
import spisokServices from "@/components/Admin/SpisokServices.vue";
//import Editor from "@tinymce/tinymce-vue";
// const stringOptions = [
//   { value1: "car", label1: "BMW" },
//   { label1: "Samsung Phone", value1: "phone" },
// ];
export default {
  setup() {
    console.log("fffffff");
    axios.get("http://localhost:3001/admin/spisokservices", {}).then((res) => {
      spserv.value = res.data;
    });

    //Строки сообщений при операциях с записями в MONGODB касающихся сервисов
    //строки сообщений об валидации полей формы
    const $q = useQuasar();
    // const goodDeleteService = () => {
    //   $q.notify({
    //     type: "negative",
    //     message: "Расширение загружаемого файла должно быть CSV!!!",
    //   });
    // };

    ///////////////////////////////////////////////////////////////////////
    const name = ref(null);
    const editor = ref("fffffff");
    const cena = ref(null);
    const spserv = ref(null);
    const addservice = () => {
      axios
        .post("http://localhost:3001/admin/addservice", {
          name: name.value,
          editor: editor.value,
          cena: cena.value,
        })
        .then((res) => {
          //console.log(res);
          (name.value = ""), (editor.value = ""), (cena.value = null);
          spserv.value = res.data;
        });
    };
    let del_service = (id) => {
      axios
        .delete(`http://localhost:3001/admin/delservice/${id}`, {})
        .then((res) => {
          //console.log(res.data[0]);
          spserv.value = res.data[0];
          console.log(res.data[1]);
          if (res.data[1].ok == 0) {
            $q.notify({
              type: "negative",
              message: "Ошибка при удалении услуги",
            });
          } else {
            $q.notify({
              type: "positive",
              message: "Услуга успешно удалена",
            });
          }
        });
    };
    //
    return {
      name,
      editor,
      cena,
      spserv,
      addservice,
      del_service,
      //goodDeleteService,
    };
  },
  methods: {
    // addservice1() {
    //   console.log(this.select);
    // },
  },
  components: {
    visualEditor: visualEditor,
    spisokServices: spisokServices,
  },
};
</script>
