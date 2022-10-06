import React, { useRef } from "react";
import { Transition } from "react-transition-group";

const ColumnNumberRow = ({ solved, rowColCounts }) => {
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `all 1000ms ease-in-out`,
  };

  const transitionStyles = {
    entering: {
      opacity: 0,
    },
    entered: {
      opacity: 0,
    },
  };

  return (
    <Transition in={solved} nodeRef={nodeRef}>
      {(state) => (
        <div
          ref={nodeRef}
          className="gridRow"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {rowColCounts.col.map((colArr, index) => {
            return (
              <div
                key={index}
                className="verticalNumContainer"
                style={{
                  marginLeft: index > 0 && index % 5 === 0 && 2,
                }}
              >
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
      )}
    </Transition>
  );
};

export default ColumnNumberRow;
