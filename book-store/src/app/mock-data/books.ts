import { Book } from '../models/book';

export const booksMock: Book[] = [
  {
    id: 1,
    title: "Everybody's Fool: A novel",
    author: 'Byron Kelly',
    categories: ['fiction', 'novel'],
    inStock: true,
  },
  {
    id: 2,
    title: 'Everyone Brave is Forgiven',
    author: 'Stephanie Moreno',
    categories: ['biography', 'fiction'],
    inStock: false,
  },
  {
    id: 3,
    title: 'Garden Design and Landscaping',
    author: 'Russell Reynolds',
    categories: ['art', 'design'],
    inStock: true,
  },
  {
    id: 4,
    title: 'How To Be An Explorer of The World',
    author: 'Diane Washington',
    categories: ['art', 'biography'],
    inStock: true,
  },
  {
    id: 5,
    title: "The Designer's Cookbook",
    author: 'Byron Kelly',
    categories: ['cook', 'design'],
    inStock: false,
  },
  {
    id: 6,
    title: 'The Naked Cookbook',
    author: 'Yvonne Flemming',
    categories: ['cook', 'biography'],
    inStock: true,
  },
  {
    id: 7,
    title: 'The Independent One',
    author: 'Katherine Spencer',
    categories: ['fiction', 'romance'],
    inStock: true,
  },
];
