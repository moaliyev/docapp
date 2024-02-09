# React Project README

Welcome to our React project! This project is built using React and utilizes JSON Server as a mock API to simulate backend functionality.

## Getting Started

To get started with the project, follow these steps:

1. **Change Directory to Data Folder**: Navigate to the `data` folder in your terminal or command prompt:

### `cd data`

2. **Start JSON Server**: Run the following command to start the JSON Server with the provided `db.json` file:

### `npx json-server db.json`

This will simulate a backend server with the data provided in `db.json`. Make sure the server is running before proceeding to the next step.

3. **Start the React App**: Once the JSON Server is running, navigate back to the main directory of the project and start the React app:

### `npm start`

This command will start the development server and open the app in your default web browser.

## Project Structure

- **`src/`**: This directory contains all the source code for the React application.
- **`data/`**: Contains the `db.json` file which serves as the mock backend data for JSON Server.
- **`public/`**: Static assets and HTML files for the application.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Additional Information

For more information about React, check out the [React documentation](https://reactjs.org/).

For more information about JSON Server, check out the [JSON Server documentation](https://github.com/typicode/json-server).
