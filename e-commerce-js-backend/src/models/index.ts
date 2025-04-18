import 'dotenv/config'
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/sequelize.config.js')[env];
const db: { [key: string]: any } = {};

let sequelize;
if (config.use_env_variable) {
  const connectionString = process.env[config.use_env_variable];
  if (!connectionString) {
    throw new Error(`Environment variable ${config.use_env_variable} is not defined`);
  }
  sequelize = new Sequelize(connectionString, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db };
