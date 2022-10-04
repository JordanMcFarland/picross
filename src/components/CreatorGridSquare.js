import React, { useEffect, useState } from "react";

const CreatorGridSquare = ({
  coordinates,
  currentTool,
  dragging,
  setDragging,
  dragColor,
  setDragColor,
  grid,
  setGrid,
  state,
  x,
  y,
  color,
  squareColor,
}) => {
  function getDragColor() {
    setDragColor(squareColor ? null : color);
  }

  // update the state of the toggled grid square
  function toggleGridSquare() {
    const newGrid = [...grid];
    let toColor;

    dragging ? (toColor = dragColor) : (toColor = squareColor ? null : color);

    newGrid[coordinates.y][coordinates.x] = {
      ...newGrid[coordinates.y][coordinates.x],
      color: toColor,
    };
    setGrid(newGrid);
  }

  return (
    <div
      className="gridSquare"
      style={{
        backgroundColor: grid[y][x].color ? squareColor : "white",
      }}
      onMouseDown={() => {
        toggleGridSquare();
        getDragColor();
        setDragging(true);
      }}
      onMouseOver={() => dragging && toggleGridSquare()}
    >
      {state === "dead" && <p style={{ userSelect: "none" }}>X</p>}
    </div>
  );
};

export default CreatorGridSquare;
