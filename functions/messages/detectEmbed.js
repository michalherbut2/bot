module.exports = (message, channelName, embedTitle) => {
  
  const embed = message?.embeds[0];

  return (
    message?.channel &&
    message?.channel.name.startsWith(channelName) &&
    embed?.title === embedTitle
  );

};
