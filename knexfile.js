let connectionString =
  process.platform === "win32"
    ? "postgres://postgres:root@localhost/golf_course"
    : "postgres://localhost/golf_course";

module.exports = {
  development: {
    client: "pg",
    connection: connectionString,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  test: {
    client: "pg",
    connection: connectionString,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  }
};
