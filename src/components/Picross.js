import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const PicrossGrid = (props) => {
  const [grid, setGrid] = useState([
    ["X", "X", "X", "X", "", ""],
    ["X", "", "", "X", "", ""],
    ["X", "", "", "X", "", ""],
    ["X", "X", "X", "X", "", ""],
    ["X", "", "", "", "X", "X"],
    ["X", "", "", "X", "", ""],
  ]);
  const [correctCoords, setCorrectCoords] = useState({});
  const [userCoordinates, setUserCoordinates] = useState({});
  const [rowColCounts, setRowColCounts] = useState({
    row: [],
    col: [],
  });

  useEffect(() => {
    getCorrectCoords();
    setRowColCounts({ row: getRowCounts(), col: getColCounts() });
  }, []);

  useEffect(() => {
    if (Object.keys(userCoordinates).length) {
      checkIfPicrossIsCorrect();
    }
  }, [userCoordinates]);

  function getCorrectCoords() {
    const tempObj = { ...correctCoords };
    grid.forEach((row, yIndex) => {
      if (!tempObj[yIndex]) tempObj[yIndex] = [];
      row.forEach((col, xIndex) => {
        col === "X" && tempObj[yIndex].push(xIndex);
      });
    });
    setCorrectCoords(tempObj);
  }

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
    });

    solved && props.setSolved(true);
  }

  function getRowCounts() {
    let counter = 0;
    let rowCountArr = [];

    grid.forEach((row, yIndex) => {
      const currentRowArr = [];
      row.forEach((col, xIndex) => {
        if (col === "X") {
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
    let counter = 0;
    let colCountArr = [];

    for (let xIndex = 0; xIndex < grid[0].length; xIndex++) {
      const currentColCount = [];
      grid.forEach((row, yIndex) => {
        if (row[xIndex] === "X") {
          counter++;
        } else {
          counter > 0 && currentColCount.push(counter);
          counter = 0;
        }
        if (yIndex === grid[0].length - 1) {
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

    console.log(colCountArr);
    return colCountArr;
  }

  const renderGrid = grid.map((row, yIndex) => {
    return (
      <div key={yIndex}>
        {yIndex === 0 && (
          <div className="row justify-content-center">
            <h4
              className="gridSquare"
              style={{ textAlign: "center", border: "none" }}
            ></h4>
            {rowColCounts.col.map((val, index) => {
              return (
                <h4
                  key={index}
                  className="gridSquare"
                  style={{ textAlign: "center", border: "none" }}
                >
                  {val.toString()}
                </h4>
              );
            })}
          </div>
        )}
        <div className="row justify-content-center">
          {rowColCounts.row.length && (
            <h4
              className="gridSquare"
              style={{ textAlign: "center", border: "none", margin: 0 }}
            >
              {rowColCounts.row[yIndex].toString()}
            </h4>
          )}
          {row.map((col, xIndex) => {
            return (
              <GridSquare
                key={xIndex}
                coordinates={{ x: xIndex, y: yIndex }}
                setUserCoordinates={setUserCoordinates}
                userCoordinates={userCoordinates}
              />
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      {renderGrid}
      <Button onClick={() => console.log(rowColCounts.row[0].toString())}>
        Row/Col Counts
      </Button>
    </>
  );
};

const GridSquare = ({ coordinates, userCoordinates, setUserCoordinates }) => {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("white");

  useEffect(() => {
    updateUserCoordinates();
  }, [active]);

  function toggleGridSquare() {
    setActive(!active);
    setColor(color === "white" ? "black" : "white");
  }

  function updateUserCoordinates() {
    const tempObj = { ...userCoordinates };
    if (!tempObj[coordinates.y]) tempObj[coordinates.y] = [];
    if (active) {
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

  return (
    <Button
      className="btn gridSquare"
      style={{ backgroundColor: color }}
      onClick={() => {
        toggleGridSquare();
      }}
    />
  );
};

const Picross = () => {
  const [solved, setSolved] = useState(false);

  return (
    <div className="container mt-5">
      <PicrossGrid setSolved={setSolved} />
      {solved && (
        <div className="row mt-3 justify-content-center">
          <div className="col-4">
            <h3 style={{ textAlign: "center" }}>You did It!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Picross;
