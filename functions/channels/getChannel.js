module.exports = (channelName, targetCategory) => {
  // get target channel
  const targetChannel = targetCategory?.children?.cache.find(channel =>
    channel.name.includes(channelName)
  );

  if (targetChannel) return targetChannel;

  throw new Error(`I cannot find the forum channel.
There is no **${channelName}** forum on the **${targetCategory}** category!`);
};
