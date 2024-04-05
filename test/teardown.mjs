export default async () => {
    await global.__MONGO_ENV__.down()
    process.env.MONGO_URL = undefined
}
