const { PermissionsBitField } = require("discord.js");
const sendEmbed = require("../messages/sendEmbed");
const createRow = require("../messages/createRow");
const Colors = require("../../utils/colors");
const getRole = require("../roles/getRole");

const images = {
  tiktok:
    "https://cdn.discordapp.com/attachments/1217520156855635999/1227701414017499233/listing-tt.png?ex=66295d0a&is=6616e80a&hm=02ba786f1976b6e2df16adb11fe0d8b46eb55131744e085847bc7c50f3bae97d&",
  youtube:
    "https://cdn.discordapp.com/attachments/1217520156855635999/1227701433617350656/listing-yt.png?ex=66295d0f&is=6616e80f&hm=19375c5dd90ab3ec9fa0c7eb97157906b61d919826b10aae387cf277d809fd3b&",
  instagram:
    "https://cdn.discordapp.com/attachments/1217520156855635999/1227701470326165624/insta-listing.png?ex=66295d18&is=6616e818&hm=75da713b2e92b8cf7c8966e3eee55808a9aaf30373a304501cc027bd4c483f92&",
};

const fans = {
  tiktok: "Amount of Followers",
  youtube: "Amount of Subscribers",
  instagram: "Amount of Followers",
};

const statuses = {
  tiktok: "CPB status",
  youtube: "Monetization status",
  instagram: "Average views",
};

module.exports = name => {
  return {
    name,

    async run(interaction) {
      await interaction.deferReply({ ephemeral: true });

      const { guild, user, client, fields } = interaction;

      // get a listing content
      const titleValue = fields.getTextInputValue("title");
      const originValue = fields.getTextInputValue("origin");
      const fansValue = fields.getTextInputValue("fans");
      const statusValue = fields.getTextInputValue("status");
      const descriptionValue = fields.getTextInputValue("description");

      const channels = await guild.channels.fetch();

      // find the category
      const categoryName = `listings - ${name}`;
      const targetCategory = channels.find(
        channel => channel.name.toLowerCase() === categoryName
      );

      try {
        if (!targetCategory)
          throw new Error(`I cannot create the listing channel.\n
      There is no **listings - ${name}** category on the server!`);

        // find the forum
        const forumCategoryName = `home marketplace`;
        const targetForumCategory = channels.find(
          channel => channel.name.toLowerCase() === forumCategoryName
        );

        if (!targetForumCategory)
          throw new Error(`I cannot create the listing channel.\n
There is no **home marketplace** category on the server!`);

        // check if the forum exists
        const forumName = `${name}`;
        const forumChannel = targetForumCategory.children?.cache.find(channel =>
          channel.name.includes(forumName)
        );

        if (!forumChannel)
          throw new Error(`I cannot create the listing channel.

There is no **${forumName}** forum to public listing on the server!`);

        // check if the channel exists
        const channelName = `listing-${user.tag}`;
        let targetChannel = targetCategory.children?.cache.find(
          channel => channel.name === channelName
        );

        const adminRole = await getRole("admin", guild);

        if (targetChannel)
          throw new Error(`**You already have a listing ${targetChannel} in progress.**

Please wait until your previous listing is finalised!`);
        // create channel
        else
          targetChannel = await guild.channels.create({
            name: channelName,

            parent: targetCategory.id,

            permissionOverwrites: [
              // access only for admins, bot and listing author
              {
                id: client.user,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                ],
              },
              {
                id: adminRole,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessagesInThreads,
                  PermissionsBitField.Flags.AttachFiles,
                ],
              },
              {
                id: user,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessagesInThreads,
                  PermissionsBitField.Flags.AttachFiles,
                ],
              },
              {
                id: guild.id,
                deny: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                ],
              },
            ],
          });

        // create the buttons
        const row = createRow("endChat", "edit", "create");

        // send listing embed
        await sendEmbed(targetChannel, {
          title: `${user.tag} listing`,

          description: `The user - ${user} created the listing below.

**Listing Title:**
${titleValue}

**Account Origin:**
${originValue}

**${fans[name]}:**
${fansValue}

**${statuses[name]}:**
${statusValue}

**Description:**
${descriptionValue}

*Please provide all images necessary and wait for one of out staff members to create your listing.*

**Thank you.**`,
          row,
          image: images[name],
          color: name,
        });

        // reply
        await sendEmbed(interaction, {
          description: `Your submission was received successfully!

**MAKE YOUR WAY TO THE ${targetChannel}**`,
          ephemeral: true,
          followUp: true,
        });

        // create a thread
        const thread = await targetChannel.threads.create({
          name: "ADD IMAGES",
          invitable: false,
        });

        // add the member to the thread
        thread.members.add(user);

        // send an info embed in the thread
        await sendEmbed(thread, {
          description:
            "Please wait for the **STAFF** to join the chat.\n\nThey should be here shortly!",
          color: name,
        });

        // create a button
        const instructionRow = createRow("instruction");

        // send the filters embed
        const tagEmbed = await sendEmbed(targetChannel, {
          title: "Add Filters",
          description: `Choose filters by simply clicking on a emoji below.

*If unsure of which filters you should use. Please read the instructions.*`,
          row: instructionRow,
          color: name,
        });

        // add emojis to the filters embed
        await Promise.all(
          forumChannel?.availableTags?.map(async tag => {
            if (tag.emoji?.id || tag.emoji?.name)
              await tagEmbed.react(tag.emoji?.id || tag.emoji?.name);

            return tag.emoji?.id || tag.emoji?.name;
          })
        );

        adminRole.members.map(admin =>
          sendEmbed(admin, {
            description: `${user} created a ${thread} listing and needs assistance!`,
            row: createRow("join"),
            color: name,
          })
        );

        console.log(`CREATED LISTING ${name.toUpperCase()} for ${user.tag}`);
      } catch (error) {
        console.error("\x1b[31m%s\x1b[0m", error);

        sendEmbed(interaction, {
          description: error.message,
          ephemeral: true,
          followUp: true,
          color: Colors.RED,
        });
      }
    },
  };
};
