import React, { useState } from "react";
import "./Grid.css";

interface CellProps {
  alive: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ alive, onClick }) => {
  return (
    <div
      className={`cell ${alive ? "alive" : ""}`}
      onClick={onClick}
    />
  );
};

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const rowArray = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    );
    return rowArray;
  });

  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
    setGrid(newGrid);
  };

  return (
    <div className="grid">
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
  );
};

export default Grid;
