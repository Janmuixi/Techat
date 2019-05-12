<template>
  <div id="New-Chat">
    <Navbar></Navbar>
    <div class="newchat-form">
      <form>
        <h2 class="title text-center">New Chat</h2>       
        <div class="form-group">
            <input v-model="name" type="text" class="form-control" placeholder="Name your chat" required="required">
        </div>
        <div class="form-group">
            <input v-model="tag" type="text" class="form-control" placeholder="#Tag - Exemple: #ANGLR, #PYTHN" required="required">
        </div>
        <div class="form-group">
            <input v-model="shortDescription" type="text" class="form-control" placeholder="Short description" required="required">
        </div>
        <div class="form-group">
            <input v-model="longDescription" type="text" class="form-control" placeholder="Long description" required="required">
        </div>
        <div class="form-group">
            <button v-on:click="createNewChat" class="btn btn-primary btn-block">Create</button>
        </div> 
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import firebase from 'firebase'
export default {
  name: 'NewChat',
  data: function () {
    return {
      name: '',
      tag: '',
      shortDescription: '',
      longDescription: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    createNewChat: async function () {
      try {
        const chats = await firebase.database().ref().child("chats")
        const newChat = await chats.push()
        await newChat.child("name").set(this.name)
        await newChat.child("tag").set(this.tag)
        await newChat.child("shortDescription").set(this.shortDescription)
        await newChat.child("longDescription").set(this.longDescription)
        const members = await newChat.child("members")
        const member = await members.push()
        await member.child("email").set(firebase.auth().currentUser.email)
        await member.child("role").set("Admin")
        this.$router.push('/home')
      } catch (err) {
        alert(err.message)
      }
    }
  }
}
</script>

<style>
  #showError {
    width: 400px;
    font-size: 14 px;
  }
  .newchat-form {
    width: 340px;
    margin: 50px auto;
  }
  .newchat-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }
  .register-form h2 {
    margin: 0 0 15px;
  }
  .form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
  }
  .title {
    margin-bottom: 30px;
  }
</style>
