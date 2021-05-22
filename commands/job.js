const Discord = require('discord.js');
const db = require('./tools/mongotools.js')
const jobs = require('./assets/jobs.json')


module.exports = {
  name: 'job',
  description: 'Change your job, or look at more information for a job (Skills, etc). No argument will list all `available` jobs to you.',
  usage: "`d!job` `[change/view]` `[jobname]`",
  execute(message, args) {
    function jobList() {
      var jobList = ""
      for (const [key, value] of Object.entries(jobs["joblist"])) {
        jobList = jobList.concat(`${value}\n`)
      }
      return jobList
    }

    async function job() {
      const player = await db.getPlayerId(message.author.id).then(result => {
        db.sleep(2000)
        console.log(result)
        return result
      }).catch(err => {console.log(err)})
      if(!args.length){
        var embed = new Discord.MessageEmbed()
        .setColor('#5b6ee1')
        .setTitle(`Jobs`)
        .setDescription(`See job information. For more detail, try \`d!job\` [change/view] [jobname]`)
        .addField(`Current Job`, `${player[0]["character"]["job"]}`)
        .addField(`Available Jobs`, `${jobList()}`)
        message.channel.send(embed)
      } else if(args == "change") {
        console.log(args)
        message.channel.send("Coming Soon:tm:")
      } else if(args == "view") {
        var embed = new Discord.MessageEmbed()
          .setColor('#5b6ee1')
          .setTitle(`${player[0]["character"]["job"]}`)
          .setDescription(`${jobs[player[0["character"]["job"]]]["description"]}`)
          .addField(`Level: ${player[0]["character"]["jlvl"]}`, `XP to level up: ${player[0]["character"]["jxptolevel"]}`)
        message.channel.send(embed)
      }
    }
    job()
  }//end of execute
}
