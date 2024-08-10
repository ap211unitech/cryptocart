export type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  cost: string;
  rating: number;
  stock: number;
};

export enum OrderStatus {
  PaymentDone,
  Shipped,
  Cancelled,
  Completed,
}

export type Order = {
  time: number;
  product: Product;
  status: OrderStatus;
};

export type AllOrder = {
  buyer: string;
  orders: Order[];
};
