<template >
  <div>
    <h1>Генерация CSV</h1>
    <div class="q-gutter-md row items-start">
      <q-file
        v-model="files"
        label="csv файл "
        filled
        clearable
        style="min-width: 300px"
        @clear="notUpload"
        @change="proverka"
      >
      </q-file>

      <q-input
        filled
        v-model="familiya"
        label="Метка группы"
        lazy-rules
        :rules="[(v) => (v && v.length > 0) || 'Введи метку группы']"
        oninput="proverka"
      />

      <q-btn
        v-if="canUpload"
        color="primary"
        dense
        icon="cloud_upload"
        round
        @click="upload"
        :disable="!canUpload"
        :loading="isUploading"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
//import axios from "axios";
export default {
  setup() {
    const canUpload = ref(false);

    return {
      canUpload,
    };
  },
  data() {
    return {
      files: null,
      familiya: "",
    };
  },
  methods: {
    //axios.post("http://localhost:3001/test");

    proverka() {
      console.log("ddddd");
      //Разбиваем имя файла на массив  до "." и после split(".") и сохраняем удаленную pop() часть в переменной typefile
      let typefile = this.files.name.split(".").pop();

      if (typefile != "csv") {
        this.files = null;
        this.canUpload = false;
        console.log("не то расширение файла");
      }

      this.canUpload =
        typefile == "csv" && this.familiya.length > 0 ? true : false;
    },
    notUpload() {
      //let formData = new FormData();
      this.canUpload = false;
      console.log("здорово!!!!!!!");
    },
    upload() {
      //let formData = new FormData();

      console.log("здорово");
    },
  },
  //добавил комментарии в новой ветке "tinymce"
};
</script>
<style>
</style>