import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Grid.css";

interface CellProps {
  alive: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ alive, onClick }) => {
  return <div className={`cell ${alive ? "alive" : ""}`} onClick={onClick} />;
};

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<boolean[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    )
  );

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Use NodeJS.Timeout for Node environments or number for browser environments

  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
    setGrid(newGrid);
  };

  const evaluateGrid = useCallback(() => {
    const dir = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    // Make a copy of the grid to work on
    let newGrid = JSON.parse(JSON.stringify(grid)); // Deep copy

    // Example loop structure to evaluate each cell
    const updatedCells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let numNeighbors = 0;

        dir.forEach(([dx, dy]) => {
          const newX = row + dx;
          const newY = col + dy;

          if (
            newX >= 0 &&
            newX < rows &&
            newY >= 0 &&
            newY < cols &&
            newGrid[newX][newY] === true
          )
            numNeighbors++;
        });

        // if cell is dead but has 3 neighbors, save it
        if (newGrid[row][col] === false && numNeighbors === 3)
          updatedCells.push([row, col]);
        else if (
          newGrid[row][col] === true &&
          (numNeighbors < 2 || numNeighbors > 3)
        )
          updatedCells.push([row, col]);
      }
    }

    updatedCells.forEach(([row, col]) => {
      newGrid[row][col] = !newGrid[row][col];
    });

    // Update the grid state with the new grid
    return newGrid;
  }, [cols, grid, rows]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        console.log("Evaluating grid...");

        const newGrid = evaluateGrid();
        setGrid(newGrid);
      }, 350);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    // Cleanup on component unmount or when isRunning changes
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, evaluateGrid]); // Dependency array includes isRunning to react to its changes

  const clearGrid = () => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    );

    setGrid(newGrid);
  };

  return (
    <>
    <div className="header">
        <h1> Conway's game of life </h1>
            <div className="buttons">
                <button onClick={clearGrid}>Reset</button>
                <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Stop" : "Start"}</button>
                <button onClick={() => {
                    const newGrid = evaluateGrid();
                    setGrid(newGrid);
                    }
                }>Next</button>
            </div>
    </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(20px, 1fr))` }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                alive={cell}
                onClick={() => toggleCell(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
