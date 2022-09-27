import Redis from "ioredis";

let redisClient: Redis | null = null;

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  console.warn("no REDIS_HOST or REDIS_POST env vars defined!");
}

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    redisClient =
      process.env.REDIS_HOST && process.env.REDIS_PORT
        ? new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT as unknown as number,
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PASSWORD
          })
        : new Redis({
            port: 5002,
            host: "localhost",
          });
  }
  return redisClient;
};