# TypeScript Example

Pure TypeScript example for Angular Course - Lesson 1.

## Setup

- `npm init -y`
- `npm install --save-dev typescript`
- Add to `package.json`: `"start": "tsc main.ts --outDir dist --target es6"`

## What's in main.ts

- `Book` interface with typed properties
- Union types, optional chaining and nullish coalescing
- `PhysicalBook` class implementing `Book`
- `EBook` class extending `PhysicalBook` (inheritance, `super()`)
- Generics: `identity<T>()` and `getFirstItem<T>()`

## Run

```
npm start
```

Compiles `main.ts` and outputs `dist/main.js`.

## View in browser

Open `index.html` in the browser (Live Server or similar).
Check DevTools > Console for `console.log` output.
