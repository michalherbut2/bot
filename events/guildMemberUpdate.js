const { Events } = require("discord.js");
const client = require("../index");

client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  // get a roles
  const roles = await oldMember.guild.roles.fetch();
  const hadRole = oldMember.roles.cache.find(role => role.name.toLowerCase() === "home");
  const hasRole = newMember.roles.cache.find(role => role.name.toLowerCase() === "home");
  
  // if the member has the "Home" role, add they the "Guest" role
  if (hadRole && !hasRole) {
    try {
      // get the "Guest" role
      const guestRole = roles.find(
        role => role.name.toLowerCase() === "guest"
      );

      // add the role th the member
      await newMember.roles.add(guestRole);
      
      console.log(`Dodano rolę "Guest" użytkownikowi ${newMember.user.tag}.`);
    } catch (error) {
      console.error("Wystąpił błąd podczas dodawania roli:", error);
    }
  }
});
