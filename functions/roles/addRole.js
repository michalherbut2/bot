const { GuildMember, User } = require("discord.js");

module.exports = async (interaction, target, roleName) => {
  const {
    guild: { members, roles },
  } = interaction;

  let member;

  if (target instanceof GuildMember) member = target;
  else if (target instanceof User) member = members.cache.get(target.id);
  else if (typeof target === "string") member = members.cache.get(target);
  else
    return console.error("\x1b[31m%s\x1b[0m", `Invalid target type: ${target}`);

  const role = roles.cache.find(role => role.name === roleName);

  if (!role)
    return console.error(
      "\x1b[31m%s\x1b[0m",
      `There is no role with name: ${roleName}`
    );

  if (!member)
    return console.error(
      "\x1b[31m%s\x1b[0m",
      `There is no member with id: ${userId}`
    );

  if (member.roles.cache.has(role.id))
    return console.error(
      "\x1b[31m%s\x1b[0m",
      `${member.displyName} already have the ${roleName} role!`
    );

  try {
    await member.roles.add(role);

    console.log("\x1b[32m%s\x1b[0m", `${member.displayName} received the ${roleName} role`);

    return true;
  } catch (error) {
    return console.error(
      "\x1b[31m%s\x1b[0m",
      `Role assignment error: ${error}`
    );
  }
  // member.roles
  //   .add(roleToAssign)
  //   .then(() => {
  //     console.log(`${member.displayName} received the ${roleName} role`);
  //     // sendEmbed(channel, {
  //     //   description: `${member.displayName} received the ${roleName} role`,
  //     // });
  //     // channel.send(`Dodano rolę ${roleName}!`);
  //   })
  //   .catch(error => {
  //     // channel.send("Wystąpił problem podczas próby przydzielenia roli.");

  //     // sendEmbed(channel, {
  //     //   description: `Role assignment error: ${error.message}`,
  //     //   color: "red",
  //     // });
  //     console.error("Role assignment error:", error);
  //   });
};
