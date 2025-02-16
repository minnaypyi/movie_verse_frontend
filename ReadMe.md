# MovieVerse Frontend

This is the frontend application for MovieVerse, built using React.js and Vite.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/minnaypyi/movie_verse_frontend.git
   cd movie_verse_frontend
   ```

2. Install dependencies:

   Using npm:
   ```sh
   npm install
   ```
   
   OR using yarn:
   ```sh
   yarn install
   ```

## Running the Application

To start the development server, run:

Using npm:
```sh
npm run dev
```

OR using yarn:
```sh
yarn dev
```

This will start the application at `http://localhost:3000/`.

## Building for Production

To create a production build, run:

Using npm:
```sh
npm run build
```

OR using yarn:
```sh
yarn build
```

The production-ready files will be generated in the `dist` directory.

## Serving the Production Build

To preview the production build, run:

Using npm:
```sh
npm run serve
```

OR using yarn:
```sh
yarn serve
```

## Environment Variables

You can configure environment variables in a `.env` file:

```
VITE_BACKEND_URL=localhost // Change this according to your backend URL
VITE_TMDB_KEY=b6e697da8917a9bf6035e0ee29c76732 // Change this according to your TMDB API Key
VITE_TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmU2OTdkYTg5MTdhOWJmNjAzNWUwZWUyOWM3NjczMiIsIm5iZiI6MTczODY1MzQ3MS44OCwic3ViIjoiNjdhMWJmMWZlZWE4OWFkZjA5MDJlZWNkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.f4LTSR993hRHTveYhNUmxTo0awVRaXmFMoRP7uwozb8 // Change this according to your TMDB token
```

## Additional Commands

- **Linting**: Run `npm run lint` or `yarn lint` to check code quality.
- **Testing**: Run `npm test` or `yarn test` to execute tests.

## License

This project is licensed under the [ISS GDip SA 59 Team 8](LICENSE).

## Author

Developed by ISS GDip SA 59 Team 8.

