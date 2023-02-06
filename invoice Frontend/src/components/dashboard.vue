<template>
  <div>
    <app-header></app-header>
    <div id="mySidebar" class="sidebar">
      <a @click="add = true; view=false; inv=false">Add Product</a>
      <a @click="add=false; view = true; inv=false ">View Products</a>
      <a @click="add=false; view = false; inv=true ">Invoice</a>
    </div>
    <div id="main">
      <addproduct v-if="add"></addproduct>
      <viewproduct v-if="view"></viewproduct>
      <invoice v-if="inv"></invoice>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";
import addProduct from './addProduct.vue';
import ViewProduct from './Viewproducts.vue';
import Invoice from './invoice.vue';
export default {
  components: {
    "app-header": Header,
    'addproduct': addProduct,
    'viewproduct': ViewProduct,
    'invoice': Invoice
  },
  data() {
    return {
      add:false,
      view: false,
      inv: false
    };
  },
  methods: {},
  beforeCreate() {
    try {
      if (!this.$session.exists()) {
        this.$router.push("/");
      }
    } catch (err) {
      this.$router.replace({ path: "/" });
    }
  },
  created() {}
};
</script>


<style scoped>
.sidebar{
  height: 100%;
  width: 250px;
  position: absolute;;
  z-index: 1;
  left: 0;
  background-color: #111;
  overflow-x: auto;
  padding-top: 60px;
}
.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
  border: 2px solid;
  margin-bottom: 15px;
}
.sidebar a:hover {
  color: #f1f1f1;
}
#main{
  margin-left: 250px;
}
</style>
 