<template >
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input filled v-model="name" label="Название технологии" lazy-rules :rules="[(v) => (v && v.length > 0) || 'Обязательно заполнить']" />

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
    <spisokTehnologes :spisokTehnologes="sptehn" @del_tehnologe="del_tehnologe"></spisokTehnologes>
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
//импортируем визуальный редактор
import visualEditor from '../VisualEditor.vue';
import spisokTehnologes from '@/components/Admin/SpisokTehnologes.vue';
//import Editor from "@tinymce/tinymce-vue";
// const stringOptions = [
//   { value1: "car", label1: "BMW" },
//   { label1: "Samsung Phone", value1: "phone" },
// ];
export default {
  setup() {
    axios.get('http://localhost:3001/admin/spisoktehnologes', {}).then((res) => {
      sptehn.value = res.data;
    });
    const $q = useQuasar();
    const name = ref(null);
    const editor = ref('');

    const sptehn = ref(null);
    const addtehnology = () => {
      axios
        .post('http://localhost:3001/admin/addtehnologe', {
          name: name.value,
          editor: editor.value,
        })
        .then((res) => {
          console.log(res.data[1]);
          sptehn.value = res.data[0];
          if (res.data[1] == 'DocumentNotFoundError') {
            $q.notify({
              type: 'negative',
              message: 'Ошибка при добавлении технологии',
            });
          } else {
            $q.notify({
              type: 'positive',
              message: `Технология "${res.data[1].nameTehnologe}" успешно добавлена `,
            });
          }
          //console.log(res);
          (name.value = ''), (editor.value = '');
        });
    };
    let del_tehnologe = (id) => {
      axios.delete(`http://localhost:3001/admin/deltehnologe/${id}`, {}).then((res) => {
        //console.log(res.data[0]);
        sptehn.value = res.data[0];
        console.log(res.data[1]);
        if (res.data[1].ok == 0) {
          $q.notify({
            type: 'negative',
            message: 'Ошибка при удалении технологии',
          });
        } else {
          $q.notify({
            type: 'positive',
            message: 'Технология успешно удалена',
          });
        }
      });
    };
    return {
      name,
      editor,
      sptehn,
      addtehnology,
      del_tehnologe,
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
