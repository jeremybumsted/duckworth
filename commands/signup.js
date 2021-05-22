//TODO: Fix Signup to deny new signups if the character already exists
const Discord = require('discord.js');
const db = require('./tools/mongotools.js')

module.exports = {
  name: 'signup',
  description: 'Register with Duckworth\'s Dungeoneering, Adventure.. Awaits!',
  usage: "d!signup",
  execute(message, args){
    db.createPlayer(message.author).then(result => {
        if(result === "hasprofile"){
          message.channel.send("Looks like you're already signed up! Use `d!profile` to see your profile.")
        } else{
          console.log(result)
          message.channel.send("Welcome to Duckworth\'s Dungeoneering. Use `d!profile` to view your profile. Adventure Awaits!")
        }
      })
  }
}
