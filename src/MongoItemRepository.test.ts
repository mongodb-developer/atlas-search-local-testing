import mongoose from "mongoose"
import { MongoItem, MongoItemModel } from "./MongoItem"
import { MongoItemRepository } from "./MongoItemRepository"

jest.setTimeout(300000)
const repository = new MongoItemRepository()

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL!)
    const itemModel1 = new MongoItem({
        name: "Cool Thing",
        price: 1337,
        condition: "used",
        color: "green"
    })
    await MongoItemModel.create(itemModel1)

    const itemModel2 = new MongoItem({
        name: "Nice Thing",
        price: 10000,
        condition: "new",
        color: "blue"
    })
    await MongoItemModel.create(itemModel2)
    await new Promise((r) => setTimeout(r, 1000))
})

describe("MongoItemRepository", () => {
    describe("getItemsInPriceRange", () => {
        it("get all items in given price range", async () => {
            const items = await repository.getItemsInPriceRange(1000, 2000)

            expect(items).toHaveLength(1)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.collection("items").deleteMany({})
    await mongoose.connection.close()
})
