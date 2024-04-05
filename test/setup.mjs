import fs from "fs"
import { MongoClient } from "mongodb"
import path, { dirname } from "path"
import { DockerComposeEnvironment } from "testcontainers"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async () => {
    const environment = await new DockerComposeEnvironment(".", "docker-compose.yml").up()
    const port = environment.getContainer("mongod").getFirstMappedPort()
    const host = environment.getContainer("mongod").getHost()
    process.env.MONGO_URL = `mongodb://${host}:${port}/atlas-local-test?directConnection=true`
    const mongoClient = new MongoClient(process.env.MONGO_URL)
    try {
        await mongoClient
            .db()
            .admin()
            .command({
                replSetInitiate: { _id: "local", members: [{ _id: 0, host: "10.6.0.5:27017" }] }
            })
        await new Promise((r) => setTimeout(r, 500))
        const indexDefinition = path.join(__dirname, "../atlas-search-index-definition.json")
        const definition = JSON.parse(fs.readFileSync(indexDefinition).toString("utf-8"))
        const collection = await mongoClient.db("atlas-local-test").createCollection("items")
        await collection.createSearchIndex({ name: "items-index", definition })
    } finally {
        await mongoClient.close()
    }
    global.__MONGO_ENV__ = environment
}
