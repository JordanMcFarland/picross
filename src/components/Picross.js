import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const PicrossGrid = (props) => {
  const [grid, setGrid] = useState([
    ["X", "", "", "X"],
    ["", "X", "X", ""],
    ["", "X", "X", ""],
    ["X", "", "", "X"],
  ]);
  const [correctCoords, setCorrectCoords] = useState({});
  const [userCoordinates, setUserCoordinates] = useState({});

  useEffect(() => {
    getCorrectCoords();
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

  const renderGrid = grid.map((row, yIndex) => {
    return (
      <div key={yIndex} className="row justify-content-center">
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
    );
  });

  return <>{renderGrid}</>;
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
