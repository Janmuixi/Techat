<template>
  <div id="Register">
    <div class="register-form">
      <form>
        <h2 class="text-center">Register</h2>       
        <div class="form-group">
            <input type="text" class="form-control" v-model="username" placeholder="Username" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" v-model="email" placeholder="Email" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="secondPassword" placeholder="Repeat password" required="required">
        </div>
        <div class="form-group">
            <button v-on:click="register" type="submit" class="btn btn-primary btn-block">Sign up</button>
        </div>       
      </form>
    </div>
    <div v-show="showError" id="showError" class="container alert alert-danger" role="alert">
      <label for="showError"> {{ errorMessage }} </label>
    </div>
    <router-link class="btn btn-default" to="/login">I already have an account</router-link>
  </div>
</template>

<script>
import firebase from 'firebase';
import Navbar from './Navbar'
export default {
  name: 'Register',
  components: {
    Navbar
  },
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
      secondPassword: '',
      errorMessage: '',
      showError: false
    };
  },
  methods: {
    register: async function(e) {
      try {
        if (this.password === this.secondPassword) {
          await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          alert(`Account Created for ${this.email}`)
          await this.writeUserOnDatabase()
          this.$router.push('/')
          e.preventDefault()
        } else {
          alert("Passwords should be equal")
        }
        
      }
      catch(err) {
        this.errorMessage = err.message
        console.log(this.errorMessage)
        this.showError = true
      }
    },
    writeUserOnDatabase: async function(e) {
      try {
        const users = await firebase.database().ref().child("users")
        const newUser = await users.push()
        await newUser.child("username").set(this.username)
        await newUser.child("email").set(this.email)
        await newUser.child("password").set(this.password)       
      }
      catch(e) {}
    }
  }
}
</script>

<style>
  #showError {
    width: 400px;
    font-size: 14 px;
  }
  .register-form {
    width: 340px;
    margin: 50px auto;
  }
  .register-form form {
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
  
</style>
