import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"
import { Item } from "./Item"

export class MongoItem {
    @prop({ type: String, required: true })
    name: string
    @prop({ type: Number, required: true })
    price: number
    @prop({ type: String, required: true })
    condition: string
    @prop({ type: String, required: true })
    color: string

    constructor(domainObject: Item) {
        this.name = domainObject.name
        this.price = domainObject.price
        this.condition = domainObject.condition
        this.color = domainObject.color
    }

    toDomain(): Item {
        return new Item({
            name: this.name,
            price: this.price,
            condition: this.condition,
            color: this.color
        })
    }
}

@modelOptions({
    options: { customName: "Item" }
})
class DatabaseMongoItem extends MongoItem {
    constructor(domainObject: Item) {
        super(domainObject)
    }
}

export const MongoItemModel = getModelForClass(DatabaseMongoItem)
