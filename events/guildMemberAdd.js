const sendEmbed = require("../functions/messages/sendEmbed");
const addRole = require("../functions/roles/addRole");
const client = require("../index");

client.on("guildMemberAdd", async member => {
  // Pobranie informacji o zaproszeniach użytkownika
  //   const userInvites = await member.guild.invites.fetch();

  const newInvites = await member.guild.invites.fetch()
  // console.log(client.invites);
  const oldInvites = client.invites.get(member.guild.id)

  const invite = newInvites.find(i => i.uses > oldInvites.get(i.code))
  
  if (!invite)
    return console.log("I cannot check who joined the server!");
  
  // const inviter = await client.users.
  // "User ${ten co wbił} joined the server invited by ${ktoś kto zaprosił}. Current credits count for user ${ktoś kto zaprosił} is ${e.g. 1234125}credits."
  // const mess=`<@${invite.inviter.id}> invited <@${member.id}> to the Viral Buzz Beehive.\nYou currently have **${invite.uses} credits**!`
  const mess=`${invite.inviter} invited ${member} to the Viral Buzz Beehive.\nYou currently have **${invite.uses} credits**!`
  // console.log(mess);
  
  const channel = member.guild.channels.cache.find(c => c.name.includes("welcome"))
  if (!channel) return console.log("There is no channel 'welcome'")
  member.channel = channel

  

  console.log("przywitanie");

  sendEmbed(channel, {title: "Viral Buzz", description: mess, image: "https://cdn.discordapp.com/attachments/1217520156855635999/1219399073199554700/123333.png?ex=660b28e2&is=65f8b3e2&hm=3d8e5637a2db47cf0b78a7365b1cc4fb203cacdfde1c92ce9f6e9650e02afa1e&"})
  console.log("zdj wysłane");

  switch (invite.uses) {
    case 5:
      let roleName = "Home"
      addRole(member, invite.inviter.id, roleName)
      // sendEmbed(channel,{description: `<@${invite.inviter.id}> received Free BuzzHome subscription for inviting 5 people!`})  
      sendEmbed(channel,{description: `${invite.inviter} received Free BuzzHome subscription for inviting 5 people!`})  
      break;
    
    case 25:
      roleName = "home | lifetime"
      addRole(member, invite.inviter.id, roleName)
      // sendEmbed(channel,{description: `<@${invite.inviter.id}> received Free BuzzHome | lifetime subscription for inviting 25 people!`})
      sendEmbed(channel,{description: `${invite.inviter} received Free BuzzHome | lifetime subscription for inviting 25 people!`})
      break;
  }
  // // Sumowanie ilości zaproszeń użytkownika
  // const totalInvites = userInvites.reduce(
  //   (acc, invite) => acc + invite.uses,
  //   0
  // );

  // // Sprawdzenie, czy istnieje odpowiednia rola dla danej ilości zaproszeń
  // if (invitesToRoles.has(totalInvites)) {
  //   // Pobranie roli z mapy
  //   const roleName = invitesToRoles.get(totalInvites);
  //   // Pobranie obiektu roli z serwera
  //   const role = member.guild.roles.cache.find(r => r.name === roleName);
  //   // Przydzielenie roli użytkownikowi
  //   if (role) {
  //     member.roles.add(role);
  //     console.log(
  //       `Przydzielono rolę "${roleName}" użytkownikowi ${member.user.tag} za ${totalInvites} zaproszeń.`
  //     );
  //   } else {
  //     console.log(`Nie można znaleźć roli "${roleName}" na serwerze.`);
  //   }
  // }
});
