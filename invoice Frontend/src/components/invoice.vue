<template>
  <div class="page-content container" id="maindoc">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
    />

    <div class="page-header text-blue-d2">
      <h1 class="page-title text-secondary-d1">
        Invoice
        <small class="page-info">
          <i class="fa fa-angle-double-right text-80"></i>
          ID: {{Math.random().toString().slice(2,8)}}
        </small>
      </h1>

      <div class="page-tools">
        <div class="action-buttons">
          <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print" @click="print">
            <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
            Print
          </a>
          <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
            <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
            Export
          </a>
        </div>
      </div>
    </div>
    <div class="container px-0">
      <div class="row mt-4">
        <div class="col-12 col-lg-12">
          <div class="row">
            <div class="col-12">
              <div class="text-center text-150">
                <i class="fa fa-2x text-success-m2 mr-1"></i>
                <span class="text-default-d3">Argusoft</span>
              </div>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="my-2 date">
              <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>
              <span class="text-600 text-90">Issue Date:</span>
              {{new Date().toLocaleDateString()}}
            </div>
          </div>
          <div class="date">
            <i class="fa fa-close" @click="show=false" v-if="show"></i>
            <button class="btn btn-info mb-3" v-if="!show" @click="show=true">show</button>
          </div>
          <div class="form" v-if="show">
            <label>Select Product</label>
            <select class="custom-select mx-3" v-model="choice" required>
              <option
                v-for="product in products"
                v-bind:key="product.id"
              >{{product.id}} {{product.name}}</option>
            </select>
            <br />
            <span>Quantity</span>
            <input type="number" v-model="qnt" class="mb-3" />
            <br />
            <button class="btn btn-success" @click="add">Add To Bill</button>
          </div>

          <div class="table-responsive">
            <table class="table table-primary table-bordered">
              <thead class="bg-none bgc-default-tp1">
                <tr class>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Tax Per Unit (%)</th>
                  <th>Amount Payable</th>
                </tr>
              </thead>

              <tbody class="text-95 text-secondary-d3" v-for="item in bill" v-bind:key="item.id">
                <tr>
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>
                    <label v-if="!edit || id!=item.id">{{item.qunatity}}</label>
                    <img
                      src="https://www.nicepng.com/png/detail/326-3260333_graphic-edit-pencil-icon.png"
                      style="width: 30px;"
                      @click="edit=true; id = item.id"
                      v-if="!edit || id != item.id"
                    />
                    <input type="number" v-model="qnt" v-if="edit && id==item.id" />
                    <button
                      class="btn btn-success"
                      v-if="edit && id==item.id"
                      @click="editbill(item.id)"
                    >save</button>
                  </td>
                  <td class>{{item.price}}</td>
                  <td class>{{item.tax}}</td>
                  <td class>{{item.total}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="row mt-3">
            <div class="text-150 text-right">Total Amount</div>
            <span class="text-150 text-success-d3 opacity-2">{{total}}</span>
            <hr />

            <div>
              <span class="text-secondary-d1 text-105">Thank you for your business</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      choice: "",
      qnt: 1,
      show: true,
      edit: false,
      bill: [],
      total: 0,
      id: ""
    };
  },
  methods: {
    add: function() {
      var id = this.choice.split(" ");
      var product = this.products.filter(prduct => prduct.id == id[0]);
      product[0].qunatity = this.qnt;
      var total =
        (product[0].price + (product[0].price * product[0].tax) / 100) *
        this.qnt;
      product[0].total = total;
      this.total +=(product[0].price + (product[0].price * product[0].tax) / 100) *
        this.qnt;
      this.bill.push(product[0]);
      this.choice = "";
      this.qnt = 1;
      this.products = this.products.filter(prd => prd.id != id[0]);
    },
    editbill: function(id) {
      this.bill.forEach(item => {
        if (item.id == id) {
          item.qunatity = this.qnt;
          this.total -= item.total;
          item.total = (item.price + (item.price * item.tax) / 100) * this.qnt;
          this.total += item.total;
          this.edit=false; this.id=''; this.qnt=1;
        }
      });
    },
    print: function(){
        var prt = document.getElementById("maindoc").innerHTML;
        var winprint = window.open('','','left=0,top=0,width=800,height=900');
        winprint.document.write(prt);
        winprint.document.close();
        winprint.focus();

    }
  },
  created() {
    this.$http.get("http://localhost:3000/product").then(data => {
      this.products = data.body;
    });
  }
};
</script>

<style scoped>
body {
  margin-top: 20px;
  color: #484b51;
}
table,
td,
th {
  border: solid;
}
.form {
  margin-top: 20px;
  margin-bottom: 100px;
}
.form i {
}
select {
  border-radius: 10px;
  padding: 2px;
  margin-bottom: 5px;
}
.text-secondary-d1 {
  color: #728299 !important;
}
.page-header {
  margin: 0 0 1rem;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
  border-bottom: 1px dotted #e2e2e2;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}
.page-title {
  padding: 0;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 300;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: solid blueviolet;
  color: black;
}

.text-grey-m2 {
  color: #888a8d !important;
}

.text-success-m2 {
  color: #86bd68 !important;
}

.font-bolder,
.text-600 {
  font-weight: 600 !important;
}

.text-110 {
  font-size: 110% !important;
}

.page-header .page-tools {
  -ms-flex-item-align: end;
  align-self: flex-end;
}
.w-2 {
  width: 1rem;
}

.text-120 {
  font-size: 120% !important;
}
.text-primary-m1 {
  color: #4087d4 !important;
}

.text-danger-m1 {
  color: #dd4949 !important;
}
.text-blue-m2 {
  color: #68a3d5 !important;
}
.text-150 {
  font-size: 150% !important;
}
.text-60 {
  font-size: 60% !important;
}
.text-grey-m1 {
  color: #7b7d81 !important;
}
.align-bottom {
  vertical-align: bottom !important;
}
.date {
  text-align: right;
}
</style>