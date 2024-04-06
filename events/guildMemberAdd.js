const { PermissionsBitField } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");
const addRole = require("../functions/roles/addRole");
const client = require("../index");

const betterSqlite3 = require("better-sqlite3");
const db = new betterSqlite3(`db/db_982460828492107797.db`);

client.on("guildMemberAdd", async member => {
  // add basic roles
  const { guild } = member;

  const roles = await guild.roles.fetch();

  const role = roles.find(role => role.name === "Guest");

  try {
    if (!role) throw new Error(`There is no role ${roleName}`);

    member.roles.add(role);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }
  // hanlde an invite
  // check bot permission to work with invites (ManageGuild)
  const clientMember = guild.members.cache.get(client.user.id);

  if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild))
    return console.log("no permissions to check invites");

  // find current invite
  const newInvites = await guild.invites.fetch();

  const oldInvites = client.invites.get(guild.id);

  const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));

  if (!invite) return console.log("I cannot check who joined the server!");

  // find welcom channel
  const channel = guild.channels.cache.find(c => c.name.includes("welcome"));

  try {
    console.log("SELECT *:", db.prepare("SELECT * FROM invite").get());

    db.prepare("INSERT INTO invite (user_id, inviter_id) VALUES (?, ?)").run(
      member.id,
      invite.inviter.id
    );
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    console.log("Member already invited!");
    // sendEmbed(channel, {
    //   description: "Member already invited!",
    //   color: "red", //`${invite.inviter} received Free BuzzHome | lifetime subscription for inviting 25 people!`,
    // });
  }

  try {
    if (!channel) throw new Error("There is no channel 'welcome'");

    member.channel = channel;

    // save invite to the data base

    console.log("Informacje o zaproszeniach zostały zaktualizowane.");

    const inviteNum = getInvite(invite.inviter.id, db);

    console.log("ZAPROSZENIA:", inviteNum);

    const mess = `${invite.inviter} invited ${member} to the Viral Buzz Beehive.\nYou currently have **${inviteNum} credits**!`;

    console.log("przywitanie");

    sendEmbed(channel, {
      title: "Viral Buzz",
      description: mess,
      image:
        "https://cdn.discordapp.com/attachments/1217520156855635999/1219399073199554700/123333.png?ex=660b28e2&is=65f8b3e2&hm=3d8e5637a2db47cf0b78a7365b1cc4fb203cacdfde1c92ce9f6e9650e02afa1e&",
    });

    console.log("przywitanie wysłane");

    switch (invite.uses) {
      case 5:
        let roleName = "Home";

        addRole(member, invite.inviter.id, roleName);

        sendEmbed(channel, {
          description: `${invite.inviter} received Free BuzzHome subscription for inviting 5 people!`,
        });
        break;

      case 25:
        roleName = "home | lifetime";

        addRole(member, invite.inviter.id, roleName);

        sendEmbed(channel, {
          description: `${invite.inviter} received Free BuzzHome | lifetime subscription for inviting 25 people!`,
        });
        break;
    }

    db.close();
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }
});

function getInvite(inviterId, db) {
  console.log(inviterId);

  const result = db
    .prepare("SELECT COUNT(*) num FROM invite WHERE inviter_id = ?")
    .get(inviterId);

  console.log("get invate", result);

  return result.num || 0;
}
