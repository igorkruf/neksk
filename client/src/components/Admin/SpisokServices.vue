<template >
  <div>
    {{ spisokservices }}

    <table border="1px">
      <tr v-for="(service, index) in spisokservices" :key="index">
        <td>{{ service.nameService }}</td>
        <td>
          <span v-on:click="$emit('del_service33', service._id)"
            >Удалить услугу {{ service._id }}</span
          >
        </td>
      </tr>
    </table>

    <!-- <q-table
      title="Мои услуги"
      :rows="spisokservices"
      :columns="columns"
      :pagination="mypagination"
      column-sort-order="ad"
    /> -->
  </div>
</template>
<script>
//import { ref } from "vue";
//import axios from "axios";
const columns = [
  // {
  //   name: "nameservice",
  //   label: "Название сервиса",
  //   field: "nameService",
  // },

  {
    name: "nameservice",
    label: "Название сервиса",
    field: (row) => row.nameService,
    sortable: true,
  },
  {
    name: "aboutservice",
    label: "Подробнее о  сервисе",
    field: (row) => row.aboutService,
  },
];
export default {
  props: {
    spisokservices: Array,
  },
  setup(props) {
    // });
    let sps = props.spisokservices.map((el) => {
      let obj = {};
      obj.nameService = el.nameService;
      obj.idService = el._id;
      return obj;
    });
    console.log(sps);
    let mypagination = {
      rowsPerPage: 30,
      sortBy: "nameservice",
    };
    return {
      columns,
      mypagination,
    };
  },
  //   setup(props) {
  //     const spisokservices = ref(null);
  //     // axios.get("http://localhost:3001/admin/spisokservices", {}).then((res) => {
  //     //   spisokservices.value = res.data;
  //     // });
  //     //const spisokservices = ref[null];
  //     return {
  //       spisokservices,
  //     };
  //   },

  methods: {
    // addservice1() {
    //   console.log(this.select);
    // },
  },
  components: {
    //visualEditor: visualEditor,
  },
};
</script>
