const { GuildMember, User } = require("discord.js");

module.exports = async (interaction, target, roleName) => {
  const {
    guild: { members, roles },
  } = interaction;

  let member;

  try {
    // check the target type
    if (target instanceof GuildMember) member = target;
    else if (target instanceof User) member = members.cache.get(target.id);
    else if (typeof target === "string") member = members.cache.get(target);
    else
      throw new Error(
        `Invalid target: "${member}"! Target must be a member, user or id!`
      );

    const role = roles.cache.find(role => role.name === roleName);

    // chceck if the role exist
    if (!role) throw new Error(`There is no role with name: ${roleName}`);

    // chceck if the member already has the role
    if (member.roles.cache.has(role.id))
      throw new Error(
        `${member.displyName} already have the ${roleName} role!`
      );

    // add the role to the member
    await member.roles.add(role);

    console.log(
      "\x1b[32m%s\x1b[0m",
      `${member.displayName} received the ${roleName} role`
    );

    return true;
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", `Role assignment error: ${error}`);
  }
};
