<template>
  <div id="New-Chat">
    <Navbar></Navbar>
    <div class="newchat-form">
      <form>
        <h2 class="title text-center">New Chat</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name your chat" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="#Tag - Exemple: #ANGLR, #PYTHN" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Short description" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Long description" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Create</button>
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
    createNewChat: function () {
      this.$router.push('/home')
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
