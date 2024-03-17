module.exports = (message, channelName, embedTitle) => {
  if (message?.author?.username === 'bot_test') return false
  const embed = message?.embeds[0];
  console.log("MESSAGE",message);
  console.log("EMBED",embed);
  // console.log(message?.channel,message?.channel.name, channelName, message?.channel.name.startsWith(channelName),embed?.title === embedTitle, embed?.title, embedTitle);
  console.log(embed?.title === embedTitle, embed?.title, embedTitle);
  return (
    message?.channel &&
    message?.channel.name.startsWith(channelName)
    &&
    embed?.title === embedTitle
  );

};
