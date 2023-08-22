import { config } from './config/api';

function shouldEnableLogging(env: string | undefined): boolean {
  return env === 'development';
}

const env = config.ENV;
const loggingEnabled = shouldEnableLogging(env);

console.log(config.DATABASE.TYPE)

export default {
  type: config.DATABASE.TYPE,
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  synchronize: false,
  logging: loggingEnabled,
  logger: "file",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/shared/infra/typeorm/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
    entitiesDir: "./src/shared/infra/typeorm/entities",
  },
};
