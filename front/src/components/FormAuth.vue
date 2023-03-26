<template>
  <div class="form">
    <div class="section">
      <label for="login">Login:</label>
      <div class="inputBlock">
        <input type="text" id="login" v-model="login" placeholder="Login">
        <small v-show="isLogin"> Must not be empty </small>
      </div>
    </div>
    <div class="section">
      <label for="room">Room:</label>
      <div class="inputBlock">
        <input type="text" id="room" v-model="room" placeholder="Room">
        <small v-show="isRoom"> Must not be empty </small>
      </div>
    </div>

    <button class="btnLogin" @click="joinChat()" ref="signBtn">
      Sign in
    </button>
  </div>
</template>

<script>
export default {
  name: "FormAuth",
  data() {
    return {
      login: '',
      room: '',
    }
  },
  computed: {
    isLogin() {
      return !this.login.trim();
    },
    isRoom() {
      return !this.room.trim();
    }
  },
  methods: {
    joinChat() {
      if (!this.isLogin && !this.isRoom) {
        this.$router.push({ path: `/chat/${this.login}`, query: { room: this.room }});
      }
    }
  }
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

.form .section {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.form .section label {
  width: 70px;
  font-size: 24px;
}

.inputBlock {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.inputBlock input {
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  font-size: 18px;
  padding: 4px 2px;
}

.inputBlock input:focus {
  border: none;
}

.inputBlock small {
  color: red;
}


.btnLogin {
  display: inline-block;
  margin-top: 25px;
  width: 100%;
  border: 1px solid black;
  background-color: black;
  padding: 10px 15px;
  color: white;
  font-size: 24px;
  transition-duration: 1s;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
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