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
//import Papa from "papaparse";
//import axios from "axios";
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

    const GoodAddService = () => {
      $q.notify({
        type: "positive",
        message: "Файл удачно сгенерирован и предложен вам для скачивания",
      });
    };

    //////////////////////////////
    //const canUpload = ref(false);
    const isUploading = ref(true);
    return {
      //canUpload,
      isUploading,
      TypeFile,
      GoodAddService,
    };
  },
  data() {
    return {
      files: null,
      familiya: "",
      canUpload: false,
      finalcsv: null,
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
      console.log(this.files);
      //для преобразования русских букв в английские не забыть: word = word.toLowerCase();(перевести заглавные в строчные)
      let translet = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ь: "",
        ы: "y",
        ъ: "",
        э: "e",
        ю: "yu",
        я: "ya",
        ".": "",
      };
      //контекст this не работает в конструкторе filereader - определяем переменную metka_gr а она уже видна в конструкторе -непонятно почему
      let metka_gr = this.familiya;
      let reader = new FileReader();
      reader.readAsText(this.files);
      reader.onload = function () {
        console.log(reader.result);
        //   Papa.parse(reader.result, {
        //     complete: function (results) {
        //       console.log("Parsing complete:", results);
        //     },

        //     download: false,
        //   });

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        let array_str = [];

        let array_buffer = reader.result.split("\r\n");
        console.log(array_buffer);
        //Убираем пустые элементы массива array_buffer(почему то есть пустой элемент в конце)
        let array_buffer1 = array_buffer.filter(function (elem) {
          return elem != "";
        });
        console.log(array_buffer1);
        array_buffer1.forEach(function (str, index) {
          //console.log(this.familiya);
          //let array_str_item = [];

          //каждую строку (кроме первой- которую не добавляем в итоговый массив)преобразуем в массив разделмтель ; (должен совпадать с разделителем в закачиваемом csv файле)
          if (index != 0) {
            let strarr = str.split(";");
            console.log(strarr);
            let firstname = strarr[0] + " " + strarr[1] + " " + strarr[2];
            strarr.push(firstname);
            console.log(strarr);

            strarr.push(metka_gr);
            console.log(strarr);
            //преобразуем массив в массив где элементы только из строчных символов
            let strarrlowercase = strarr.map(function (a, i) {
              //транскрипция только не для поля firstname(имя) и не для поля lastname(фамилия)
              if (i != 4 && i != 5) {
                let answer = "";

                a = a.toLowerCase();
                //Транскрипция
                for (var ii = 0; ii < a.length; ++ii) {
                  if (translet[a[ii]] == undefined) {
                    answer += a[ii];
                  } else {
                    answer += translet[a[ii]];
                  }
                }
                //////////////
                return answer;
              } else {
                return a;
              }
            });
            console.log(strarrlowercase);
            let aio = [];
            //оставляем первые буквы(английские) в имени и отчестве
            let strarrlowercaseio = strarrlowercase.map(function (a, index) {
              if (index == 1 || index == 2) {
                aio = a[0];
              } else {
                aio = a;
              }

              //let answer = "";
              //a = a.toLowerCase();

              //////////////
              return aio;
            });

            array_str.push(strarrlowercaseio);
            //console.log(firstname);
            //array_str.push(firstname);
          }
          //    console.log(array_str);

          //global.firstname;
        });

        //формируем строки финального массива(из которого сформируем csv)
        let array_str_final = array_str.map(function (el) {
          // if (index == 0) {
          //     finalel = ['username', 'password', 'firstname', 'lastname', 'email'];
          // }
          // else {

          let username = el[0] + el[1] + el[2] + el[3];
          let firstname = el[4];
          let lastname = el[5];
          let email = username + "@pochta.invalid";
          let password = 123456;
          let finalel = [username, password, firstname, lastname, email];

          return finalel;
        });
        //добавляем элемент (строку)в начало массива
        array_str_final.unshift([
          "username",
          "password",
          "firstname",
          "lastname",
          "email",
        ]);
        ////////////////////////////////////////////////////////

        console.log(array_str_final);
        var str = "";
        for (var i = 0; i < array_str_final.length; i++) {
          let line = "";
          line = array_str_final[i].join(",");
          str += line + "\r\n";
        }
        console.log(str);
        var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
        let link = document.createElement("a");
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        //Настраиваем имя и расширение сохраняемого файла
        link.setAttribute("download", `${metka_gr}.csv`);
        //link.setAttribute("download");
        link.style.visibility = "hidden";
        //document.body.appendChild(link);
        link.click();
        //document.body.removeChild(link);

        // ////////////////////////////////////////////////////////////////////////////////////////////////////
      };
      this.GoodAddService();
    },
    //добавил комментарии в новой ветке "tinymce"
  },
};
</script>
<style>
</style>