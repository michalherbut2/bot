const { Collection } = require("discord.js");
const isAdmin = require("../permissions/isAdmin");

const positions = new Collection();
positions.set("⬆️", { index: 1, value: -1 });
positions.set("⬇️", { index: 1, value: 1 });
positions.set("⬅️", { index: 0, value: -1 });
positions.set("➡️", { index: 0, value: 1 });

module.exports = message => {
  const position = [0, 0];

  // skip if meessage has no images
  if (!message.attachments.size) return false;
  
  // console.log(message.reactions.cache);
  positions.map(({ index, value }, emoji) => {
    // get the position reaction
    const positionReaction = message.reactions.cache.get(emoji);

    if (!positionReaction)
      // throw new Error(`There is no ${position} reaction under ${message.attachments.first().url}!`);
    return;

    // get the users that have given the position reaction
    const rectionUsers = positionReaction.users.cache;

    // check if any admin has given the main page reaction
    rectionUsers.some(user => {
      // get the server member
      const member = message.guild.members.cache.get(user.id);

      // check if the member is an admin
      if (isAdmin(member)) {
        position[index] += value;
        console.log(emoji);

      }
    });
  });

  console.log(position);
  return position;
};
