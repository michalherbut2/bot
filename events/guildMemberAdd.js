const { PermissionsBitField } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");
const addRole = require("../functions/roles/addRole");
const client = require("../index");

const betterSqlite3 = require("better-sqlite3");

client.on("guildMemberAdd", async member => {
  // get a guild
  const { guild } = member;

  const roles = await guild.roles.fetch();

  // get a "guest" role
  const role = roles.find(role => role.name.toLowerCase() === "guest");

  try {
    if (!role) throw new Error(`There is no role ${roleName}`);

    member.roles.add(role);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }

  // hanlde an invite
  // check bot permission to work with invites (ManageGuild)
  const clientMember = guild.members.fetch(client.user.id);
  try {
    if (!clientMember) throw new Error(`There is no client ${client.user.id}`);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }

  // find current invite
  const newInvites = await guild.invites.fetch();

  const oldInvites = client.invites.get(guild.id);

  const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));

  if (!invite) return console.log("I cannot check who joined the server!");

  // find welcome channel
  const channel = guild.channels.cache.find(c => c.name.includes("welcome"));

  // opend db
  const db = new betterSqlite3(`db/db_${guild.id}.db`);

  try {
    // add 1 credit to a inviter
    db.prepare("INSERT INTO invite (user_id, inviter_id) VALUES (?, ?)").run(
      member.id,
      invite.inviter.id
    );
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    console.log("Member already invited!");
  }

  try {
    if (!channel) throw new Error("There is no channel 'welcome'");

    member.channel = channel;

    // get invites from the data base
    const inviteNum = getInvite(invite.inviter.id, db);

    const mess = `${invite.inviter} invited ${member} to the Viral Buzz Beehive.\nYou currently have **${inviteNum} credits**!`;

    // send welcome message
    sendEmbed(channel, {
      title: "Viral Buzz",
      description: mess,
      image:
        "https://cdn.discordapp.com/attachments/1217520156855635999/1219399073199554700/123333.png?ex=660b28e2&is=65f8b3e2&hm=3d8e5637a2db47cf0b78a7365b1cc4fb203cacdfde1c92ce9f6e9650e02afa1e&",
    });

    // add a role for 5 or 25 invites
    switch (inviteNum) {
      case 5:
        let roleName = "Home";

        // add the role
        await addRole(member, invite.inviter.id, roleName);

        // send message
        sendEmbed(channel, {
          description: `${invite.inviter} received Free BuzzHome subscription for inviting 5 people!`,
        });
        break;

      case 25:
        roleName = "home | lifetime";

        // add the role
        await addRole(member, invite.inviter.id, roleName);

        // send message
        sendEmbed(channel, {
          description: `${invite.inviter} received Free BuzzHome | lifetime subscription for inviting 25 people!`,
        });
        break;
    }

  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }
  db.close();
});

// get the number of invitations
function getInvite(inviterId, db) {
  const result = db
    .prepare("SELECT COUNT(*) num FROM invite WHERE inviter_id = ?")
    .get(inviterId);

  return result.num || 0;
}
