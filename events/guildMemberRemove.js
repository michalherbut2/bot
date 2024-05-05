const { Events, PermissionsBitField } = require("discord.js");
const client = require("../index");

// data base
const betterSqlite3 = require("better-sqlite3");

client.on(Events.GuildMemberRemove, async member => {
  // chcek the bot permissions
  const { guild } = member;
  const clientMember = guild.members.cache.get(client.user.id);

  if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild))
    return console.log(`no permissions to check invites in ${guild}`);

  // open data base
  const db = new betterSqlite3(`db/db_${guild.id}.db`);

  try {
    // clear credits of member who left the server
    db.prepare("DELETE FROM invite WHERE inviter_id = ?").run(member.id);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }

  // close data base
  db.close();
});
