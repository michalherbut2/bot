const { PermissionsBitField } = require("discord.js");
const client = require("../index");

const betterSqlite3 = require("better-sqlite3");
const db = new betterSqlite3(`db/db_982460828492107797.db`);

client.on("guildMemberRemove", async member => {
  // add basic roles
  const { guild } = member;

  const clientMember = guild.members.cache.get(client.user.id);

  if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild))
    return console.log("no permissions to check invites");

  try {
    db.prepare("DELETE FROM invite WHERE inviter_id = ?").run(member.id);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    
    console.log("Member left the server!");
  }
});