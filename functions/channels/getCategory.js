module.exports = async (categoryName, guild) => {
  // get all channels
  const channels = await guild.channels.fetch();

  // find a category
  const targetCategory = channels.find(
    channel => channel.name.toLowerCase() === categoryName
  );

  if (targetCategory) return targetCategory;
  
  throw new Error(`I cannot find the forum category.
There is no **${categoryName}** category on the server!`);
};
