const { Collection, PermissionsBitField } = require("discord.js");
const client = require("../index");
const createDB = require("../functions/db/createDB");

const invites = new Collection()

client.on("ready", async () => {
  console.log(`${client.user.tag} is up and ready to go!`);

  client.guilds.cache.forEach(async guild => {
    const clientMember = guild.members.cache.get(client.user.id)
    
    if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) return console.log("no permissions to check invites");

    const firstInvates = await guild.invites.fetch()

    invites.set(guild.id, new Collection(firstInvates.map(invite => [invite.code, invite.uses])))

    client.invites = invites
  })

  createDB(client)
});
