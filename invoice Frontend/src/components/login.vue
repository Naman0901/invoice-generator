<template>
  <div id="login">
    <div class="card login-page" style="width: 400px; border: 2px solid;">
      <h1 class="text-center pt-3">Login</h1>
      <form class="form-group m-5 text-center" @submit.prevent="loginto">
        <input
          type="text"
          placeholder="Enter Username"
          class="form-control"
          v-model="userdata.username"
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          class="form-control"
          v-model="userdata.password"
        />
        <button class="btn btn-success m-3">Submit</button>
        <label class="text-danger alert alert-danger" v-if="error">Wrong Username or password</label>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdata: {
        username: "",
        password: ""
      },
      error: false
    };
  },
  methods: {
    loginto: function() {
      if (
        this.userdata.username == "admin" &&
        this.userdata.password == "1234"
      ) {
        this.$session.start();
        this.$session.set("jwt", this.userdata.username);
        this.$router.push("/dashboard");
      } else {
        this.error = true;
      }
    }
  },
  beforeCreate() {
    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user");
    }
    if (sessionStorage.getItem("vue-session-key")) {
      sessionStorage.removeItem("vue-session-key");
    }
  }
};
</script>

<style scoped>
.login-page {
  align-items: center;
  display: flex;
  height: 50vh;
  margin: 16% auto;
  background-color: cadetblue;
}
</style>