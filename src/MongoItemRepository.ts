import { Item } from "./Item"
import { MongoItemModel } from "./MongoItem"

export class MongoItemRepository {
    async getItemsInPriceRange(min: number, max: number): Promise<Item[]> {
        const items = await MongoItemModel.aggregate([
            {
                $search: {
                    index: "items-index",
                    compound: {
                        filter: [
                            {
                                range: {
                                    gte: min,
                                    lte: max,
                                    path: "price"
                                }
                            }
                        ]
                    }
                }
            }
        ]).exec()
        return items
    }
}
