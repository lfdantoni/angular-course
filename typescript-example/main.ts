// Primitive types
let title: string = 'Angular Book';
let price: number = 29.99;
let available: boolean = true;
let tags: string[] = ['angular', 'typescript'];
let mixed: string | number = 'hello';

// Optional chaining and nullish coalescing
const user = { name: 'Leo', address: { city: 'Buenos Aires' } };
console.log(user?.address?.city);       // 'Buenos Aires'
console.log(user?.phone ?? 'No phone'); // 'No phone'

// Interface
interface Book {
  id: number;
  title: string;
  author: string;
  categories: string[];
  inStock: boolean;
  description?: string; // optional
}

// Class with inheritance
class PhysicalBook implements Book {
  id: number;
  title: string;
  author: string;
  categories: string[];
  inStock: boolean;
  description?: string;
  pages: number;

  constructor(id: number, title: string, author: string, categories: string[], inStock: boolean, pages: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.categories = categories;
    this.inStock = inStock;
    this.pages = pages;
  }

  getInfo(): string {
    return `${this.title} by ${this.author} (${this.pages} pages)`;
  }
}

class EBook extends PhysicalBook {
  downloadUrl: string;

  constructor(id: number, title: string, author: string, categories: string[], inStock: boolean, downloadUrl: string) {
    super(id, title, author, categories, inStock, 0);
    this.downloadUrl = downloadUrl;
  }

  override getInfo(): string {
    return `${super.getInfo()} [Digital] - ${this.downloadUrl}`;
  }
}

// Generics - reusable functions with type safety
function identity<T>(value: T): T {
  return value;
}

function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// Usage
const book1 = new PhysicalBook(1, 'Clean Code', 'Robert C. Martin', ['programming'], true, 431);
const ebook1 = new EBook(2, 'Angular in Action', 'Jeremy Wilken', ['angular'], true, 'https://example.com/angular-in-action.pdf');

console.log(book1.getInfo());
console.log(ebook1.getInfo());

const num = identity<number>(42);
const str = identity<string>('Angular');
const firstBook = getFirstItem<Book>([book1, ebook1]);

console.log(num, str, firstBook?.title);
