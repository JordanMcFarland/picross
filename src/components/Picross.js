import React, { useEffect, useState } from "react";
import PUZZLES from "../shared/PUZZLES";

const PicrossGrid = ({ setSolved }) => {
  const [grid, setGrid] = useState([[]]);
  const [rowColCounts, setRowColCounts] = useState({
    row: [],
    col: [],
  });
  const [currentTool, setCurrentTool] = useState("fillInTool");
  const [dragging, setDragging] = useState(false);
  const [dragState, setDragState] = useState();
  const [newGridSize, setNewGridSize] = useState("fiveByFive");

  // Listen for mouse up anywhere on screen so drag state updates properly
  useEffect(() => {
    function handleMouseUp() {
      setDragging(false);
    }
    window.addEventListener("mouseup", handleMouseUp);

    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Get initial puzzle
  useEffect(() => {
    getPuzzle("fiveByFive");
  }, []);

  // Update the puzzle column and row counts when a new puzzle comes up
  useEffect(() => {
    function getRowCounts() {
      let rowCountArr = [];

      grid?.forEach((row, yIndex) => {
        const currentRowArr = [];
        let counter = 0;
        row.forEach((col, xIndex) => {
          if (col.marked) {
            counter++;
          } else {
            counter > 0 && currentRowArr.push(counter);
            counter = 0;
          }
          if (xIndex === row.length - 1) {
            if (counter > 0) {
              currentRowArr.push(counter);
              counter = 0;
            } else {
              if (!currentRowArr.length) {
                currentRowArr.push(counter);
              }
            }
          }
        });
        rowCountArr.push(currentRowArr);
      });
      return rowCountArr;
    }

    function getColCounts() {
      let colCountArr = [];

      for (let xIndex = 0; xIndex < grid[0].length; xIndex++) {
        let counter = 0;
        const currentColCount = [];
        grid.forEach((row, yIndex) => {
          if (row[xIndex].marked) {
            counter++;
          } else {
            counter > 0 && currentColCount.push(counter);
            counter = 0;
          }
          if (yIndex === grid.length - 1) {
            if (counter > 0) {
              currentColCount.push(counter);
              counter = 0;
            } else {
              if (!currentColCount.length) {
                currentColCount.push(counter);
              }
            }
          }
        });
        colCountArr.push(currentColCount);
      }

      return colCountArr;
    }

    setRowColCounts({ row: getRowCounts(), col: getColCounts() });
  }, [grid]);

  // Check if puzzle is correct when user changes a grid square state
  useEffect(() => {
    function checkIfPicrossIsCorrect() {
      const puzzleSolved = grid.every((row) => {
        return row.every((col) => {
          if (col.marked && col.state === "active") return true;
          else if (!col.marked && col.state !== "active") return true;
          else return false;
        });
      });

      setSolved(puzzleSolved);
    }

    checkIfPicrossIsCorrect();
  }, [grid]);

  function getPuzzle(puzzleSize) {
    let newPuzzle = [];
    const keys = Object.keys(PUZZLES[puzzleSize]);
    const rand = Math.floor(Math.random() * keys.length);
    const newPuzzleName = keys[rand];
    newPuzzle = setANewGrid(PUZZLES[puzzleSize][newPuzzleName]);
    setSolved(false);
    setGrid(newPuzzle);
  }

  function setANewGrid(newPuzzle) {
    let newGrid = [];
    newPuzzle.forEach((row) => {
      const currentRow = [];
      row.forEach((xIndex) => {
        const xIndexObj = { marked: false, state: "inactive" };
        if (xIndex === "x") {
          xIndexObj.marked = true;
        }
        currentRow.push(xIndexObj);
      });
      newGrid.push(currentRow);
    });
    return newGrid;
  }

  function renderColumnNumberRow() {
    return (
      <div className="gridRow">
        {rowColCounts.col.map((colArr, index) => {
          return (
            <div key={index} className="verticalNumContainer">
              {colArr.map((num, numIndex) => {
                return (
                  <div
                    key={numIndex}
                    className="yNumCount"
                    style={{ userSelect: "none", fontWeight: "bold" }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  function renderRowNumbers(yIndex) {
    return (
      <div key={"row" + yIndex} className="horizontalNumContainer">
        {rowColCounts.row[yIndex]?.map((num, index) => {
          return (
            <div key={index} className="xNumCount">
              <p style={{ userSelect: "none", fontWeight: "bold" }}>{num}</p>
            </div>
          );
        })}
      </div>
    );
  }

  const renderGrid = grid.map((row, yIndex) => {
    return (
      <>
        {yIndex === 0 && renderColumnNumberRow()}
        <div key={yIndex} className="gridRow">
          {rowColCounts.row.length && renderRowNumbers(yIndex)}
          {row.map((col, xIndex) => {
            return (
              <GridSquare
                key={xIndex}
                x={xIndex}
                y={yIndex}
                state={col.state}
                coordinates={{ x: xIndex, y: yIndex }}
                currentTool={currentTool}
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
      </>
    );
  });

  return (
    <>
      {renderGrid}
      <div
        style={{
          marginTop: 16,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <button onClick={() => getPuzzle(newGridSize)}>New Puzzle</button>
        <label
          htmlFor="newPuzzleSize"
          style={{ display: "flex", alignItems: "center", marginRight: 4 }}
        >
          Size:{" "}
        </label>
        <select
          defaultValue="fiveByFive"
          name="newPuzzleSize"
          id="newPuzzleSize"
          onChange={(e) => setNewGridSize(e.target.value)}
        >
          <option value="fiveByFive">5x5</option>
          <option value="tenByTen">10x10</option>
        </select>
      </div>
      <ToolSelector currentTool={currentTool} setCurrentTool={setCurrentTool} />
    </>
  );
};

const GridSquare = ({
  coordinates,
  currentTool,
  dragging,
  setDragging,
  dragState,
  setDragState,
  grid,
  setGrid,
  state,
}) => {
  function getDragState() {
    switch (currentTool) {
      case "fillInTool":
        setDragState(state !== "active" ? "active" : "inactive");
        break;
      case "xTool":
        setDragState(state !== "dead" ? "dead" : "inactive");
    }
  }

  // update the state of the toggled grid square
  function ToggleGridSquare() {
    const newGrid = [...grid];
    let toState;

    switch (currentTool) {
      case "fillInTool":
        dragging
          ? (toState = dragState)
          : (toState = state === "active" ? "inactive" : "active");
        break;
      case "xTool":
        dragging
          ? (toState = dragState)
          : (toState = state === "dead" ? "inactive" : "dead");
        break;
      default:
        toState = "inactive";
        break;
    }

    newGrid[coordinates.y][coordinates.x] = {
      ...newGrid[coordinates.y][coordinates.x],
      state: toState,
    };
    setGrid(newGrid);
  }

  return (
    <div
      className="gridSquare"
      style={{
        backgroundColor: state === "active" ? "black" : "white",
        outlineColor: state === "active" ? "grey" : "black",
      }}
      onMouseDown={() => {
        ToggleGridSquare();
        getDragState();
        setDragging(true);
      }}
      onMouseOver={() => dragging && ToggleGridSquare()}
    >
      {state === "dead" && <p style={{ userSelect: "none" }}>X</p>}
    </div>
  );
};

const Picross = () => {
  const [solved, setSolved] = useState(false);

  return (
    <div className="picrossContainer">
      <PicrossGrid setSolved={setSolved} />
      {solved && <h3 style={{ textAlign: "center" }}>You did It!</h3>}
    </div>
  );
};

const ToolSelector = ({ currentTool, setCurrentTool }) => {
  return (
    <div className="toolBar">
      <div
        className="fillInTool"
        onClick={() => setCurrentTool("fillInTool")}
        style={{ outlineWidth: currentTool === "fillInTool" && 5 }}
      />
      <div
        className="xTool"
        onClick={() => setCurrentTool("xTool")}
        style={{ outlineWidth: currentTool === "xTool" && 5 }}
      >
        <p style={{ userSelect: "none" }}>X</p>
      </div>
    </div>
  );
};

export default Picross;
