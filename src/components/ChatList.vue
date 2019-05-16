<template>
<div id="Chat-List">
  <div id="list">
    <ul class="list-group container" >
        <li class="list-group-item row" v-for="item of chats" v-bind:key="item.message">
            {{item.name}}
            <button v-on:click="deleteChat(item)" class="btn col-md-auto delete"><i class="fas col-md-auto fa-trash-alt"></i></button>
        </li>
        </ul>
  </div>
</div>

</template>

<script>
import firebase from 'firebase'
export default {
    name: 'ChatList',
    data: function () {
      return {
        chats: [],
        activeIndex: undefined
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
        deleteChat: async function (item) {
            var chatsRef = await firebase.database().ref().child("chats")
            chatsRef.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var name = childSnapshot.child('name')
                    if (name.val() === item.name) {
                        var members = childSnapshot.child('members')
                        members.forEach(function (member) { 
                            var user = member.child('email').val()
                            if (user === firebase.auth().currentUser.email) {
                                var memberRef = member.ref
                                memberRef.remove()
                                alert('Chat deleted')
                                location.reload()
                            }
                        })                       
                    }
                    var members = childSnapshot.child('members')
                    members.forEach(function (member) { 
                        var user = member.child('email').val()
                        if (user === firebase.auth().currentUser.email) {
                            var childData = childSnapshot.val()
                            return 
                        }
                    })
                })
            })
        }
        
    },
    created: async function () {
        await this.fetchChats();
    }
}
</script>

<style>
    #Chat-List{
        text-align: center;
    }
    #list {
        display: inline-block;
        width: 40%;
        text-align: left;
    }
    .list-group-item:hover{
        background: #007bff;
        color: white;
    }
    .delete {
        float: right;
    }
</style>
