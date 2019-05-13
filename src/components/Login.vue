<template>
  <div id="Login">
    <div class="login-form">
      <h2 class="text-center">Log in</h2>       
      <div class="form-group">
        <input type="text" class="form-control" v-model="email" placeholder="Email" required="required">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="password" placeholder="Password" required="required">
      </div>
      <div class="form-group">
        <button v-on:click="login" class="btn btn-primary btn-block">Log in</button>
      </div>
      <div class="form-group">
        <a href="#" class="pull-right"> <span v-on:click="openForgotPasswordForm">Forgot Password?</span></a>
        <div v-show="isForgotPasswordOpen" class="input-group forgotPasswordInput">
          <input v-model="emailToRecoverPassword" class="input-recover form-control" placeholder="Recovery email" type="email">
          <span class="input-group-btn">
            <button v-on:click="forgotPassword" class="btn-send btn btn-primary">Send</button>
          </span> 
        </div>
        </div>
      </div>
    <router-link class="btn btn-default" to="/register">Create a new account</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navbar from './Navbar'
export default {
  name: 'Login',
  
  
  components: {
    Navbar
  },
  data: function() {
    return {
      email: '',
      password: '',
      isForgotPasswordOpen: false,
      emailToRecoverPassword: ''
    };
  },
  methods: {
    login: async function (e) {
      try {
        await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        
        this.$router.push('/home'),
        e.preventDefault()
              
      }
      catch(err) {
        alert(err.message)
      }
    },
    forgotPassword: async function () {
      try {
        await firebase.auth().sendPasswordResetEmail(this.emailToRecoverPassword)
      } catch (err) {
        alert(err.message)
      }
      
    },
    openForgotPasswordForm: function () {
      if (this.isForgotPasswordOpen) this.isForgotPasswordOpen = false
      else this.isForgotPasswordOpen = true
    }
  }
}
</script>

<style>
  .forgotPasswordInput {
    margin-top: 20px;
  }
  .forgotPasswordInput .btn-send {
    margin-top: 10px;
  }
  .login-form {
    width: 340px;
    margin: 50px auto;
  }
  .login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }
  .login-form h2 {
    margin: 0 0 15px;
  }
  .form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
  }
  .input-recover {
    width: 70%;
  }
</style>
