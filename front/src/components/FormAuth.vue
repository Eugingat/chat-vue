<template>
  <div class="form">
    <div>
      <label for="login">Login:</label>
      <input type="text" id="login" v-model="login" placeholder="Login">
    </div>
    <div>
      <label for="room">Room:</label>
      <input type="text" id="room" v-model="room" placeholder="Room">
    </div>

    <router-link :to="{ path: `/chat/${login}`, query: { room } }" class="btnLogin"> Sign in</router-link>
  </div>
</template>

<script>
export default {
  name: "FormAuth",
  data() {
    return {
      login: '',
      room: ''
    }
  },
}
</script>

<style scoped>
.form {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px black;
  padding: 15px 20px;
}

.form div {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.form div label {
  width: 120px;
  font-size: 24px;
}

.form div input {
  width: 100%;
}


.btnLogin {
  display: inline-block;
  margin-top: 25px;
  width: calc(100% - 32px);
  border: 1px solid black;
  background-color: black;
  padding: 10px 15px;
  color: white;
  font-size: 24px;
  transition-duration: 1s;
  text-align: center;
  text-decoration: none;
}

.btnLogin:hover {
  background-color: white;
  color: black;
}

@media all and (max-width: 850px) {
  .form {
    width: calc(100% - 50px);
  }
}
</style>