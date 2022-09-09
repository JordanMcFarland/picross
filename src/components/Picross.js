import React, { useEffect, useState } from "react";
import PUZZLES from "../shared/PUZZLES";

const PicrossGrid = ({ setSolved }) => {
  const [grid, setGrid] = useState([["x", ""]]);
  const [correctCoords, setCorrectCoords] = useState({});
  const [userCoordinates, setUserCoordinates] = useState({});
  const [rowColCounts, setRowColCounts] = useState({
    row: [],
    col: [],
  });
  const [currentTool, setCurrentTool] = useState("fillInTool");

  // Get the correct coordinates of a new puzzle
  useEffect(() => {
    function getCorrectCoords() {
      const tempObj = {};
      grid.forEach((row, yIndex) => {
        if (!tempObj[yIndex]) tempObj[yIndex] = [];
        row.forEach((col, xIndex) => {
          col === "x" && tempObj[yIndex].push(xIndex);
        });
      });
      setCorrectCoords(tempObj);
    }
    getCorrectCoords();
  }, [grid]);

  // Update the puzzle column and row counts when a new puzzle comes up
  useEffect(() => {
    console.log(grid);
    function getRowCounts() {
      let rowCountArr = [];

      grid.forEach((row, yIndex) => {
        const currentRowArr = [];
        let counter = 0;
        row.forEach((col, xIndex) => {
          if (col === "x") {
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
      console.log(rowCountArr);

      return rowCountArr;
    }

    function getColCounts() {
      let colCountArr = [];

      for (let xIndex = 0; xIndex < grid[0].length; xIndex++) {
        let counter = 0;
        const currentColCount = [];
        grid.forEach((row, yIndex) => {
          if (row[xIndex] === "x") {
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

  // Check if puzzle is correct when user changes an input
  useEffect(() => {
    function checkIfPicrossIsCorrect() {
      const keys = Object.keys(correctCoords);

      const solved = keys.every((key) => {
        if (userCoordinates[key]) {
          return (
            correctCoords[key].every((xValue) =>
              userCoordinates[key].includes(xValue)
            ) && correctCoords[key].length === userCoordinates[key].length
          );
        }
        return false;
      });

      solved && setSolved(true);
    }

    if (Object.keys(userCoordinates).length) {
      checkIfPicrossIsCorrect();
    }
  }, [userCoordinates]);

  function getPuzzle(puzzleSize) {
    let newPuzzle = [];
    const keys = Object.keys(PUZZLES[puzzleSize]);
    const rand = Math.floor(Math.random() * keys.length);
    const newPuzzleName = keys[rand];
    console.log(PUZZLES[puzzleSize][newPuzzleName]);
    newPuzzle = PUZZLES[puzzleSize][newPuzzleName];
    setSolved(false);
    setUserCoordinates({});
    setGrid(newPuzzle);
  }

  function renderColumnNumberRow() {
    return (
      <div className="gridRow">
        <div style={{ width: 40 }}></div>
        {rowColCounts.col.map((colArr, index) => {
          return (
            <div key={index} className="verticalNumContainer">
              {colArr.map((num, numIndex) => {
                return (
                  <div key={numIndex} className="yNumCount">
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
      <div className="horizontalNumContainer">
        {rowColCounts.row[yIndex]?.map((num, index) => {
          return (
            <div key={index} className="xNumCount">
              <p>{num}</p>
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
        <div className="gridRow">
          {rowColCounts.row.length && renderRowNumbers(yIndex)}
          {row.map((col, xIndex) => {
            return (
              <GridSquare
                key={xIndex}
                coordinates={{ x: xIndex, y: yIndex }}
                setUserCoordinates={setUserCoordinates}
                userCoordinates={userCoordinates}
                currentTool={currentTool}
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
      <button onClick={() => getPuzzle("fiveByFive")}>Test</button>
      <button onClick={() => console.log(correctCoords)}>Grid</button>
      <ToolSelector currentTool={currentTool} setCurrentTool={setCurrentTool} />
    </>
  );
};

const GridSquare = ({
  coordinates,
  userCoordinates,
  setUserCoordinates,
  currentTool,
}) => {
  const [state, setState] = useState("inactive");

  // Update User Inputs
  useEffect(() => {
    function updateUserCoordinates() {
      const tempObj = { ...userCoordinates };
      if (!tempObj[coordinates.y]) tempObj[coordinates.y] = [];
      if (state === "active") {
        if (!tempObj[coordinates.y].includes[coordinates.x]) {
          tempObj[coordinates.y].push(coordinates.x);
          tempObj[coordinates.y].sort();
        }
      } else {
        const filteredCoords = tempObj[coordinates.y].filter(
          (xValue) => xValue !== coordinates.x
        );
        tempObj[coordinates.y] = filteredCoords;
      }
      setUserCoordinates(tempObj);
    }

    updateUserCoordinates();
  }, [state]);

  function toggleGridSquare() {
    switch (currentTool) {
      case "fillInTool":
        setState(state === "active" ? "inactive" : "active");
        break;
      case "xTool":
        setState(state === "dead" ? "inactive" : "dead");
        break;
      default:
        break;
    }
  }

  return (
    <div
      className="gridSquare"
      style={{
        backgroundColor: state === "active" ? "black" : "white",
        borderColor: state === "active" ? "grey" : "black",
        height: 38,
        width: 38,
      }}
      onClick={() => {
        toggleGridSquare();
      }}
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
        style={{ borderWidth: currentTool === "fillInTool" && 5 }}
      />
      <div
        className="xTool"
        onClick={() => setCurrentTool("xTool")}
        style={{ borderWidth: currentTool === "xTool" && 5 }}
      >
        <p style={{ userSelect: "none" }}>X</p>
      </div>
    </div>
  );
};

export default Picross;
