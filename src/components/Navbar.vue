<template>
  <div id="Navbar">
    <router-link class="btn btn-default navbar-link" to="/home">Home</router-link>
    <router-link class="btn btn-default navbar-link" to="/signout"><span v-on:click="signOut()" >Sign out</span></router-link>
    <router-link class="btn btn-default navbar-link" to="/newchat"><i class="fas fa-plus-square"></i> New chat</router-link>
  </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'navbar',
        methods: {
            signOut() {
                try {
                    firebase.auth().signOut()
                    this.$router.push('/')
                } catch (err) {
                    alert(err.message)
                }
                
            }
        }
    }
</script>

<style>
    #Navbar {
        text-align: center;
    }

    .navbar-link {
        margin: 0.5em;
    /**/
    }
    .active {
        border-bottom: 3px solid red;
    }
</style>
