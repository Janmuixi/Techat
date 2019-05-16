<template>
  <div id="Home">
    <Navbar></Navbar>
    <div id="global">
      <div id="title" class="container">
        <h1>Techat, let's talk about technologies!</h1>
      </div>      
    </div>
    <ChatList id="chatList"></ChatList>
  </div>
</template>

<script>
import NewChat from './NewChat'
import Navbar from './Navbar'
import ChatList from './ChatList'
import firebase from 'firebase'
export default {
  name: 'home',
  components: {
    Navbar,
    NewChat,
    ChatList
  }
}
</script>
<style>
  #global {
     margin-top: 50px; 
  }
  #chatList {
    margin-top: 50px;
  }
</style>
