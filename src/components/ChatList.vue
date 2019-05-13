<template>
  <div id="chat-list">
    <ul class="list-group" id="chats-list">
        <li class="list-group-item" v-for="item of chats" v-bind:key="item.message">
            {{item.name}}
        </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'ChatList',
    data: function () {
      return {
        chats: []
      }
    },
    methods: {
        fetchChats: async function () {
            var chatsArray = []
            var chatsRef = await firebase.database().ref().child('chats').orderByChild('name')
            chatsRef.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var members = childSnapshot.child('members')
                    members.forEach(function (member) { 
                        var user = member.child('email').val()
                        if (user === firebase.auth().currentUser.email) {
                            var childData = childSnapshot.val()
                            chatsArray.push(childData)
                            return 
                        }
                    })
                })
            })
            this.chats = chatsArray            
        },
        
    },
    created: async function () {
        await this.fetchChats();
    }
}
</script>

<style>
    #chat-list{
        align-content: center;
        width: 30%;
    }
</style>
