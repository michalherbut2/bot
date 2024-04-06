const betterSqlite3 = require("better-sqlite3");

module.exports = async client => {
  // const db = new betterSqlite3(`db/db_982460828492107797.db`);

  const createInviteTable =
    "CREATE TABLE IF NOT EXISTS invite (user_id TEXT PRIMARY KEY, inviter_id TEXT)";

  const guilds = await client.guilds.fetch();

  guilds.map(guild => {
    const db = new betterSqlite3(`db/db_${guild.id}.db`);

    db.pragma("journal_mode = WAL");
    db.prepare(createInviteTable).run();
    db.close();
  });
};
