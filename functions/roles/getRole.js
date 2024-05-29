module.exports = async (roleName, guild) => {
  // get all roles
  const roles = await guild.roles.fetch();

  // return the role
  return roles.find(role => role.name.toLowerCase() === roleName);
};
