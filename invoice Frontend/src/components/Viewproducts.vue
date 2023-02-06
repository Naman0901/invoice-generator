<template>
  <div class="text-center">
    <h1 class="text-center my-5">Details of Product</h1>
    <div id="table" class="table text-center">
      <table class="table-dark">
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Tax (%)</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr v-for="detail in details" v-bind:key="detail.id">
          <td>
            <input type="text" v-model="detail.name" v-if="edit && id == detail.id" />
            <label v-else>{{detail.name}}</label>
          </td>
          <td>
            <input type="number" v-model="detail.price" v-if="edit && id == detail.id" />
            <label v-else>{{detail.price}}</label>
          </td>
          <td>
            <input type="number" v-model="detail.tax" v-if="edit && id == detail.id" />
            <label v-else>{{detail.tax}}</label>
          </td>
          <td>
            <img
              src="https://www.nicepng.com/png/detail/326-3260333_graphic-edit-pencil-icon.png"
              style="width: 30px;"
              @click="editform(detail.id)"
              v-if="!edit || id != detail.id"
            />
            <button class="btn btn-primary" v-if="id == detail.id" @click="update(detail.id)">Save</button>
            <img
              src="https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-cancel-icon-png-image_533028.jpg"
              style="width: 20px;"
              @click="cancel"
              v-if="id == detail.id"
            />
          </td>
          <td>
            <img
              src="https://toppng.com/uploads/preview/delete-comments-delete-icon-black-11563177686kfv8sa8gps.png"
              style="width: 30px;"
              @click="del(detail.id)"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: [],
      edit: false,
      id: "",
    };
  },
  methods: {
    getdata: function(){
      this.$http.get("http://localhost:3000/product").then(data => {
      this.details = data.body;
    });
    },
    update: function(id) {
      var updprd = this.details.filter(detail => detail.id==id)
      this.$http
        .put("http://localhost:3000/product/"+id, updprd[0])
        .then(data => {
          this.cancel();
        });
    },
    editform: function(id){
      this.edit= true; this.id=id;  this.getdata()
    },
    del: function(id){
      this.$http
        .delete("http://localhost:3000/product/"+id)
        .then(data => {
          console.log(data.body); this.cancel();
          this.details = this.details.filter(detail=> detail.id!=id)
        });
    },
    cancel: function(){
          this.edit= false; this.id='';
    }
  },
  beforeCreate() {
    try {
      if (!this.$session.exists()) {
        this.$router.push("/");
      }
    } catch (err) {
      this.$router.replace({ path: "/" });
    }
  },
  created() {
    this.getdata()
  }
};
</script>

<style scoped>
th,
td {
  border: 2px solid violet;
}
table {
  margin-left: 10%;
}
</style>