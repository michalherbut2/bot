const betterSqlite3 = require("better-sqlite3");

module.exports = () => {
  const db = new betterSqlite3(`db/db_982460828492107797.db`);

  // const databases = client.guilds.cache.map(guild => new betterSqlite3(`db/db_${guild.id}.db`))
  const createInviteTable =
    // "CREATE TABLE IF NOT EXISTS invite (user_id TEXT PRIMARY KEY, invite_num INTEGER DEFAULT 0)";
    "CREATE TABLE IF NOT EXISTS invite (user_id TEXT PRIMARY KEY, inviter_id TEXT)";

  // db.pragma("journal_mode = WAL");
  db.prepare(createInviteTable).run();
  db.close();
};
