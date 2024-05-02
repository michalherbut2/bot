const betterSqlite3 = require("better-sqlite3");

module.exports = async client => {
  // sql queries to create a tables
  const createInviteTable =
    "CREATE TABLE IF NOT EXISTS invite (user_id TEXT PRIMARY KEY, inviter_id TEXT)";
  
  const createRewardTable =
    "CREATE TABLE IF NOT EXISTS reward (user_id TEXT PRIMARY KEY)";

  // get guild
  const guilds = await client.guilds.fetch();

  // create the table for each guild
  guilds.map(guild => {
    const db = new betterSqlite3(`db/db_${guild.id}.db`);

    db.pragma("journal_mode = WAL");
    db.prepare(createInviteTable).run();
    db.prepare(createRewardTable).run();
    db.close();
  });
};
