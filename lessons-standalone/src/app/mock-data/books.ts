import { Book } from '../models/book';

export const booksMock: Book[] = [
  {
    id: '1',
    isbn: '978-3-16-148410-0',
    title: "Everybody's Fool: A novel",
    author: 'BYRON KELLY',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-5.jpg',
    categories: ['art-photo', 'child-books', 'cook'],
    stock: 9,
    price: 10.5,
  },
  {
    id: '2',
    isbn: '978-3-16-148410-2',
    title: 'Everyone Brave is Forgiven',
    author: 'STEPHANIE MORENO',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-6.jpg',
    categories: ['bio', 'child-books'],
    stock: 0,
    price: 15.5,
  },
  {
    id: '3',
    isbn: '978-3-16-148410-5',
    title: 'Garden Design and Landscaping',
    author: 'Russell Reynolds',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/06/product-2.jpg',
    categories: ['art-photo', 'child-books'],
    stock: 4,
    price: 17,
  },
  {
    id: '4',
    isbn: '978-3-16-148410-6',
    title: 'How To Be An Explorer of The World',
    author: 'Diane Washington',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-10.jpg',
    categories: ['art-photo', 'bio'],
    stock: 1,
    price: 25,
  },
  {
    id: '5',
    isbn: '978-3-16-148410-7',
    title: "The Designer's Cookbook:  12 Colors, 12 Menus",
    author: 'Byron Kelly',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-4.jpg',
    categories: ['child-books'],
    stock: 10,
    price: 22.66,
  },
  {
    id: '6',
    isbn: '978-3-16-148413-0',
    title: 'The Naked Cookbook',
    author: 'Yvonne Flemming',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-7.jpg',
    categories: ['art-photo', 'bio', 'cook'],
    stock: 50,
    price: 8,
  },
  {
    id: '7',
    isbn: '978-3-16-149410-0',
    title: 'The Independent One: A Billionaire Bride Pact Romance',
    author: 'Katherine Spencer',
    cover:
      'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-8.jpg',
    categories: ['art-photo'],
    stock: 5,
    price: 10.5,
  },
];
