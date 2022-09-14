import React, { useEffect, useState } from "react";
import GridSquare from "./GridSquare";
import PUZZLES from "../shared/PUZZLES";

const PicrossCreator = () => {
  const [gridSize, setGridSize] = useState({ x: 10, y: 5 });
  const [grid, setGrid] = useState([[]]);
  const [dragging, setDragging] = useState(false);
  const [dragState, setDragState] = useState();
  const [picrossName, setPicrossName] = useState("");

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
          const xIndexObj = { marked: false, state: "inactive" };
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
    console.log(JSON.stringify(formattedGrid));
  }

  const renderGrid = grid.map((row, yIndex) => {
    return (
      <div key={yIndex} className="gridRow">
        {row.map((col, xIndex) => {
          return (
            <GridSquare
              key={xIndex}
              x={xIndex}
              y={yIndex}
              state={col.state}
              coordinates={{ x: xIndex, y: yIndex }}
              currentTool={"fillInTool"}
              dragging={dragging}
              setDragging={setDragging}
              dragState={dragState}
              setDragState={setDragState}
              grid={grid}
              setGrid={setGrid}
            />
          );
        })}
      </div>
    );
  });

  return (
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
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <label htmlFor="yValue">Height: </label>
        <select
          style={{ marginRight: 8 }}
          name="yValue"
          id="yValue"
          onChange={(e) => setGridSize({ ...gridSize, y: e.target.value })}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
};

export default PicrossCreator;
