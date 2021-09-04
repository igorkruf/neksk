<template>
  <editor
    api-key="no-api-key"
    :init="{
      menubar: false,
      plugins: 'lists link image emoticons code',
      toolbar:
        ' bold italic | alignleft aligncenter alignright alignjustify | bullist numlist code|  link emoticons',
    }"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "App",
  components: {
    Editor,
  },
};
</script>