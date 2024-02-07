import React, { useEffect, useImperativeHandle, useState } from "react";
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
  flag: boolean;
}

const Grid: React.FC<GridProps> = ({ rows, cols, flag }) => {
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const rowArray = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    );
    return rowArray;
  });


  useEffect(() => {
    console.log('flag: ', flag);
        if (flag) {
            toggleGrid();
        } else {

        }
  }, [flag]);

  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
    setGrid(newGrid);
  };

  const toggleGrid = (() => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            console.log('is the flag set to true?: ', flag);
            if (flag) {
                console.log('i am here');
                setTimeout(() => {
                    toggleCell(j, i);
                }, (i * rows + j) * 1000); // Adjusted delay
            }
        }
    }
  });

  return (
    <>
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
    </>
  );
};

export default Grid;
