export interface ItemProperties {
    name: string
    price: number
    condition: string
    color: string
}

export class Item {
    public readonly name: string
    public readonly price: number
    public readonly condition: string
    public readonly color: string

    constructor(props: ItemProperties) {
        this.name = props.name
        this.price = props.price
        this.condition = props.condition
        this.color = props.color
    }
}
