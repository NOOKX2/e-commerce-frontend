export interface CartItemProps  {
  item: {
    ID: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  };
};