const { PermissionFlagsBits } = require("discord.js");

module.exports = member => {
  // get all roles
  const roles = member.guild.roles.cache;

  // get the admin role
  const adminRoleName = "admin";
  const adminRole = roles.find(
    role => role.name.toLowerCase() === adminRoleName
  );

  return (
    (member?.permissions.has(PermissionFlagsBits.Administrator) ||
      member.roles.cache.has(adminRole.id)) &&
    !member.user.bot
  );
};
