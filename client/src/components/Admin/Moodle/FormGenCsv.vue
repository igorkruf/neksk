<template >
  <div>
    <div class="q-gutter-md row items-start">
      <q-input
        filled
        v-model="familiya"
        label="Метка группы"
        lazy-rules
        :rules="[(v) => (v && v.length > 0) || 'Введи метку группы']"
        @update:model-value="proverka"
        @change="proverka"
      />
      <q-file
        v-model="files"
        label="csv файл "
        filled
        clearable
        style="min-width: 300px"
        @clear="notUpload"
        @change="proverka"
        accept="text/csv"
        @rejected="TypeFile"
      >
        <template v-slot:after v-if="canUpload">
          <q-btn
            color="primary"
            dense
            icon="cloud_upload"
            round
            @click="upload"
            :disable="!canUpload"
            :loading="!isUploading"
          />
        </template>
      </q-file>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
////Для плагина Notify
import { useQuasar } from "quasar";

import axios from "axios";
export default {
  setup() {
    //строки сообщений об валидации полей формы
    const $q = useQuasar();
    const TypeFile = () => {
      $q.notify({
        type: "negative",
        message: "Расширение загружаемого файла должно быть CSV!!!",
      });
    };

    //////////////////////////////
    //const canUpload = ref(false);
    const isUploading = ref(true);
    return {
      //canUpload,
      isUploading,
      TypeFile,
    };
  },
  data() {
    return {
      files: null,
      familiya: "",
      canUpload: false,
    };
  },
  methods: {
    //axios.post("http://localhost:3001/test");

    proverka() {
      //console.log("ddddd");
      //Разбиваем имя файла на массив  до "." и после split(".") и сохраняем удаленную pop() часть в переменной typefile
      // let typefile = this.files.name.split(".").pop();
      // console.log(typefile);
      // console.log(this.files.name);
      if (this.files.type != "text/csv") {
        this.files = null;
        this.canUpload = false;
        this.TypeFile();
      } else {
        this.canUpload = this.familiya.length > 0 ? true : false;
      }
    },
    notUpload() {
      this.canUpload = false;
    },
    upload() {
      let formData = new FormData();
      formData.append("idgrup", this.familiya);
      let ddd = formData.get("idgrup");
      console.log(ddd);
      //formData.append("file", this.files);
      axios
        .post("http://localhost:3001/gencsv", formData)
        .then(console.log("сервер ответил"));

      console.log("здорово");
    },
  },
  //добавил комментарии в новой ветке "tinymce"
};
</script>
<style>
</style>