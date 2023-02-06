<template>
  <div id="add-product">
    <h2>Add a New Product</h2>
    <form>
      <label>Product Name</label>
      <input type="text" class="form-control" v-model="product.name" @click="added = false" required />
      <label>Product Price</label>
      <input type="number" class="form-control" v-model="product.price" required />
      <br />

      <label>Tax on Product</label>
      <input type="number" class="form-control" v-model="product.tax" required placeholder="in %" />
      <br />
      <button @click.prevent="post" class="btn btn-success add" v-if="!id">Add Product</button> <br>
      <label v-if="added">Product Added</label>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: { name: "", price: 0, tax: 0},
      id: "",
      added: false
    };
  },
  methods: {
    post: function() {
      this.$http
        .post("http://localhost:3000/product", this.product)
        .then(function(data) {
          this.added = true;
          this.product = { name: "", price: 0, tax: 0};
        });
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
    /*this.blog.user_id = (JSON.parse(sessionStorage.getItem("user"))).id
    if (this.$route.params.id)
      this.$http
        .get("http://localhost:3000/blog/" + this.$route.params.id)
        .then(function(data) {
          this.blog = data.body[0];
          this.id = this.$route.params.id;
        });*/
  }
};
</script>

<style scoped>
#add-product * {
  box-sizing: border-box;
}
#add-product {
  margin: 20px auto;
  max-width: 500px;
}
label {
  margin: 20px 0 10px;
}
input {
  width: 300px;
}
.add {
  margin-top: 20px;
}
</style>