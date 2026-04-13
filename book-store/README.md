# BookStore

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

This app uses **json-server** as a local REST API backend. You need to run both servers simultaneously.

### 1. Start the API server (json-server)

```bash
npm run server
```

This starts json-server on `http://localhost:3000` using `db.json` as the data source.

### 2. Start the Angular dev server

In a separate terminal:

```bash
npm start
```

Once both servers are running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deploy to Firebase Hosting

Firebase Hosting is free on the Spark plan (no credit card required). It provides HTTPS, a global CDN, and a `*.web.app` domain.

### Prerequisites (one-time setup)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Install the Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```
3. Log in:
   ```bash
   firebase login
   ```

### Initialize Firebase in this project (one-time)

```bash
firebase init
```

When prompted:
- Select **Hosting**
- Choose your Firebase project
- Public directory: `dist/book-store/browser`
- Configure as single-page app (rewrite all URLs to index.html): **Yes**
- Set up automatic builds with GitHub?: **No**

This generates a `firebase.json` file:

```json
{
  "hosting": {
    "public": "dist/book-store/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

> The `rewrites` rule is critical — without it, Angular routes like `/books/1` return 404 on page refresh.

### Deploy

```bash
ng build && firebase deploy
```

The CLI will print the live URL: `https://<your-project>.web.app`

### Redeploy after changes

```bash
ng build && firebase deploy
```

The URL stays the same on every deploy.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
