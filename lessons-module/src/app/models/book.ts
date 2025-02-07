export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover: string;
  categories: string[];
  stock: number;
  price: number;
}
