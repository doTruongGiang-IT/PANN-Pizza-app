export interface Order {
    id: number;
    address: string;
    placed_at: Date;
    status: string;
    quantity: number;
    customer_id: number;
    pizza_id: number;
    [key: string]: any;
}