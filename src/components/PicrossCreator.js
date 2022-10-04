import React, { useEffect, useState } from "react";
import CreatorGridSquare from "./CreatorGridSquare";
import PUZZLES from "../shared/PUZZLES";
import ColorSelector from "./ColorSelector";

const PicrossCreator = () => {
  const [gridSize, setGridSize] = useState({ x: 5, y: 5 });
  const [grid, setGrid] = useState([[]]);
  const [dragging, setDragging] = useState(false);
  const [dragColor, setDragColor] = useState("#000");
  const [picrossName, setPicrossName] = useState("");
  const [color, setColor] = useState("#000");

  // Listen for mouse up anywhere on screen so drag state updates properly
  useEffect(() => {
    function handleMouseUp() {
      setDragging(false);
    }
    window.addEventListener("mouseup", handleMouseUp);

    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    function updateGrid() {
      let newGrid = [];
      for (let i = 0; i < gridSize.y; i++) {
        const currentRow = [];
        for (let j = 0; j < gridSize.x; j++) {
          const xIndexObj = { state: "inactive", color: null };
          currentRow.push(xIndexObj);
        }
        newGrid.push(currentRow);
      }

      setGrid(newGrid);
    }

    updateGrid();
  }, [gridSize]);

  function handleSubmit() {
    let newPuzzles = { ...PUZZLES.fiveByFive };
    let formattedGrid = [];
    grid.forEach((row, yIndex) => {
      const currentRow = [];
      row.forEach((col, xIndex) => {
        col.state === "active" ? currentRow.push("x") : currentRow.push("");
      });
      formattedGrid.push(currentRow);
    });
    console.log(JSON.stringify(grid));
    console.log(JSON.stringify(formattedGrid));
  }

  const renderGrid = grid.map((row, yIndex) => {
    return (
      <>
        {/* Include barrier to outline 5x5 grid */}
        {yIndex > 0 && yIndex % 5 === 0 && (
          <div className="gridRow">
            {grid[0].map((col, xIndex) => {
              return (
                <div
                  className="rowBarrier"
                  // Compensate for vertical barrier with this styling
                  style={{
                    paddingLeft: xIndex > 0 && xIndex % 5 === 0 && 2,
                  }}
                />
              );
            })}
          </div>
        )}
        <div key={yIndex} className="gridRow">
          {row.map((col, xIndex) => {
            return (
              <>
                {/* Include barrier to outline 5x5 grid */}
                {xIndex > 0 && xIndex % 5 === 0 && (
                  <div className="colBarrier" />
                )}
                <CreatorGridSquare
                  key={xIndex}
                  x={xIndex}
                  y={yIndex}
                  state={col.state}
                  coordinates={{ x: xIndex, y: yIndex }}
                  currentTool={"fillInTool"}
                  dragging={dragging}
                  setDragging={setDragging}
                  dragColor={dragColor}
                  setDragColor={setDragColor}
                  grid={grid}
                  setGrid={setGrid}
                  color={color}
                  squareColor={grid[yIndex][xIndex].color}
                />
              </>
            );
          })}
        </div>
      </>
    );
  });

  return (
    <div
      className="creatorContainer"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="picrossContainer">
        <h2 style={{ color: "white", marginTop: 0 }}>Picross Creator</h2>
        {renderGrid}
        <div
          style={{
            marginTop: 16,
          }}
        >
          <button onClick={() => console.log(grid)}>Grid</button>
          <label htmlFor="xValue">Width: </label>
          <select
            style={{ marginRight: 8 }}
            name="xValue"
            id="xValue"
            onChange={(e) => setGridSize({ ...gridSize, x: e.target.value })}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <label htmlFor="yValue">Height: </label>
          <select
            style={{ marginRight: 8 }}
            name="yValue"
            id="yValue"
            onChange={(e) => setGridSize({ ...gridSize, y: e.target.value })}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
      <div>
        <ColorSelector color={color} setColor={setColor} />
      </div>
    </div>
  );
};

export default PicrossCreator;
