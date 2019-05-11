<template>
  <div id="Home">
    <Navbar></Navbar>
    <div id="global" class="container">
        <h1>Techat, let's talk about technologies!</h1>
    </div>
  </div>
</template>

<script>
import NewChat from './NewChat'
import Navbar from './Navbar'
import firebase from 'firebase'
export default {
  name: 'home',
  components: {
    Navbar,
    NewChat
  }
}
</script>
<style>
  #global {
     margin-top: 100px; 
    }
</style>
