const isAdmin = require("../permissions/isAdmin");

module.exports = async (listingChannel, targetChannel) => {
  // get the guild to check if member is an admin
  const { guild } = listingChannel;

  // get a filter embed to get a reactions (tags or filters)
  const embeds = await listingChannel.messages.fetch();
  const tagEmbed = embeds.find(e =>
    e.embeds[0]?.title?.includes("Add Filters")
  );

  // get a reactions (tags or filters)
  const reactions = tagEmbed.reactions.cache;

  const appliedTags = [];

  // get a tags to add
  await Promise.all(
    reactions.map(async reaction => {
      // check if admin add a reaction
      const hasAdmin = (await reaction.users.fetch()).some(user => {
        const member = guild.members.cache.get(user.id);

        return isAdmin(member);
      });

      if (hasAdmin) {
        // check if a tag exists
        const tag = targetChannel?.availableTags.find(tag => {
          return (
            tag.emoji?.id === reaction.emoji.id ||
            tag.emoji?.name === reaction.emoji.name
          );
        });

        // add a tag
        if (tag) appliedTags.push(tag.id);
      }
    })
  );

  console.log("TAGS:", appliedTags.length);

  if (appliedTags.length) return appliedTags;

  throw new Error(`Add filters in ${tagEmbed.url}!`);
};
