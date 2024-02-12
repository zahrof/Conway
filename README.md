# React Game of Life

This project is an implementation of the famous "Game of Life" by John Conway using React. The "Game of Life" is a cellular automaton designed to simulate the evolution of cells on a two-dimensional grid based on certain simple rules.

## Prerequisites

Before you can run this project locally, make sure you have the following installed:

- Node.js and npm: [Download Node.js](https://nodejs.org/)

## Installation

1. **Clone this repository** to your local machine.

2. **Navigate to the project directory**.

3. **Install dependencies** using npm.

## Usage

To start the development server and view the project in your browser, use the following npm command:

```bash
git clone <https://github.com/zahrof/Conway.git>
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## About the Game of Life

The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. The rules of the game are as follows:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
