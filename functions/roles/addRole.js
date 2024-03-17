const sendEmbed = require("../messages/sendEmbed");

module.exports = async (interaction, userId, roleName) => {
  const { guild, channel } = interaction;
  const member = guild.members.cache.get(userId);
  const roleToAssign = guild.roles.cache.find(role => role.name === roleName);

  if (!roleToAssign)
    return console.error(`There is no role with name: ${roleName}`);
  if (member)
    if (member.roles.cache.has(roleToAssign.id))
      sendEmbed(channel, {
        description: `You already have the ${roleName} role!`,
      });
    else
      member.roles
        .add(roleToAssign)
        .then(() => {
          // sendEmbed(channel, {
          //   description: `${member.displayName} received the ${roleName} role`,
          // });
          // channel.send(`Dodano rolę ${roleName}!`);
        })
        .catch(error => {
          // channel.send("Wystąpił problem podczas próby przydzielenia roli.");
          sendEmbed(channel, {
            description: `Role assignment error: ${error.message}`,
            color: "red",
          });
          console.error("Role assignment error:", error);
        });
};
