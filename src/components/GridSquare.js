import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

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
  x,
  y,
  solved,
  color,
}) => {
  const nodeRef = useRef(null);

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
  function toggleGridSquare() {
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

  // Animation Info

  const duration = 3000;

  // being overridden by transition styles?
  const defaultStyle = {
    backgroundColor: state === "active" ? "black" : "white",
    border: "1px solid rgb(128, 128, 128, .5)",
    transition: `all ${duration}ms ease-in-out`,
  };

  const transitionStyles = {
    entering: { backgroundColor: color, border: "solid 0px" },
    entered: { backgroundColor: color, border: "none" },
    exiting: { backgroundColor: "white" },
    exited: { backgroundColor: "white" },
  };

  return (
    <Transition nodeRef={nodeRef} in={solved} enter={false} timeout={duration}>
      {(transState) => (
        <div
          className="gridSquare"
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[transState],
          }}
          // style={{
          //   backgroundColor:
          //     solved && color ? color : state === "active" ? "black" : "white",
          // }}
          onMouseDown={() => {
            toggleGridSquare();
            getDragState();
            setDragging(true);
          }}
          onMouseOver={() => dragging && toggleGridSquare()}
        >
          {state === "dead" && <p style={{ userSelect: "none" }}>X</p>}
        </div>
      )}
    </Transition>
  );
};

export default GridSquare;
