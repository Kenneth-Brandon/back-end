const dummyPgConfig = {
  // placeholder since there is no pg locally
  host: '',
  database: '',
  user: '',
  password: '',
};

const prodDbConnection = process.env.DATABASE_URL || dummyPgConfig;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/fam-recipes.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: '/database/recipeBook.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: '/database/migrations',
    },
    seeds: {
      directory: '/database/seeds',
    },
  },
};
