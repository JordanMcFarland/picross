import React from "react";

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

export default GridSquare;
