<template>
  <div class="chat">
    <div class="posts">
      <h3 v-if="!posts.length"> No messages... </h3>
      <p v-else v-for="post of posts" :key="post">
        {{ post }}
      </p>
    </div>
    <div class="field">
      <input type="text" v-model="text" placeholder="Message">
      <button @click="setMessage"> Send </button>
    </div>
    <div class="listUsers">
      <p v-for="user of activeUsers" :key="user">
        {{ user }}
      </p>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: "ChatVue",
  data() {
    return {
      socket: '',
      posts: [],
      activeUsers: [],
      text: '',
    }
  },
  mounted() {
    this.socket = io("ws://localhost:3000");

    this.socket.emit('login', {
      login:  this.$route.params.login,
      room:  this.$route.query.room
    });
    this.getListActiveUsers();
    this.getMessage();
  },
  methods: {
    setMessage() {
      this.socket.emit('message', this.text);
    },
    getListActiveUsers() {
      this.socket.on('active-users', (users) => {
        this.activeUsers = users;
      })
    },
    getMessage() {
      this.socket.on('new-message', (listPosts) => {
        this.posts = [...listPosts];
      })
    },
    checkActiveUsers() {
      this.socket.on('check-user', () => {
        console.log('111111122223333')
        this.socket.emit('login', this.$route.params.login);
      })
    }
  },
  unmounted() {
    this.socket.disconnect();
  }
}
</script>

<style scoped>
    .chat {
      max-width: calc(100% - 250px);
      margin: 15px auto 50px;
      border: 1px solid black;
      display: grid;
      grid-template: 1fr 50px / 1fr 250px ;
    }

    .posts {
      padding: 10px 15px;
      border-right: 1px solid black;
      grid-area: 1 / 1 / 2 / 2;
    }

    .posts h3 {
      padding: 10px 15px;
      font-size: 32px;
    }

    .posts p {
      border: 1px solid black;
      padding: 10px 15px;
      font-size: 24px;
    }

    .listUsers {
      padding: 10px 15px;
      grid-area: 1 / 2 / 3 / 3;
    }

    .listUsers p {
      border: 1px solid black;
      padding: 10px 15px;
      font-size: 24px;
    }

    .field {
      border-right: 1px solid black;
      border-top: 1px solid black;
      display: flex;
    }

    .field input {
      flex-grow: 1;
      padding: 0 15px;
      font-size: 20px;
    }

    .field button {
      width: 100px;
      background-color: black;
      color: white;
      font-size: 20px;
      border: 1px solid black;
      cursor: pointer;
      transition-duration: 1s;
    }

    .field button:hover {
      background-color: white;
      color: black;
    }
</style>