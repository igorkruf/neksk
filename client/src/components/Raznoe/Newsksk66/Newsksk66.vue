<template>
  <div>
    <div v-for="(ksknew, i) in ksknews" :key="i" v-html="ksknew.excerpt.rendered" />
  </div>
</template>

<script>
//import axios from "axios";
//import { ref } from "vue";
import server from './server';
export default {
  name: 'kskNews',
  props: {
    // msg: String,
  },
  data() {
    return {
      ksknews: null,
    };
  },
  components: {},
  async created() {
    let response = await server.get('wp/v2/posts');
    this.ksknews = response.data;
    console.log(response.data);
  },
  mounted() {
    // axios.get("https://ksk66.ru/wp-json/wp/v2/posts").then((response) => {
    //   this.ksknews = response.data.results;
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
