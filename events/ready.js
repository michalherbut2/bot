const { Collection, PermissionsBitField } = require("discord.js");
const client = require("../index");
const createDB = require("../functions/db/createDB");

const invites = new Collection();

client.on("ready", async () => {
  console.log(`${client.user.tag} is up and ready to go!`);

  // handle invites
  client.guilds.cache.forEach(async guild => {
    const clientMember = await guild.members.fetch(client.user.id);

    if (!clientMember?.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return console.log(
        "\x1b[31m%s\x1b[0m",
        `No Manage Guild permission to check invites in ${guild} server`
      );

    const firstInvates = await guild.invites.fetch();

    invites.set(
      guild.id,
      new Collection(firstInvates.map(invite => [invite.code, invite.uses]))
    );

    client.invites = invites;
  });

  // create data bases
  createDB(client);
});
