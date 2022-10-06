import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

const RowNumber = ({ rowColCounts, yIndex, solved }) => {
  const [nodeHeight, setNodeHeight] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      console.log("default: ", nodeRef.current.offsetHeight);
      setNodeHeight(nodeRef.current.offsetHeight - 4);
    }
  }, [nodeRef.current]);

  useEffect(() => {
    console.log("new: ", nodeHeight);
  }, [nodeHeight]);

  const defaultStyle = {
    transition: `all 1000ms ease-in-out`,
  };

  const transitionStyles = {
    entering: {
      opacity: 0,
      height: nodeHeight,
    },
    entered: {
      opacity: 0,
      height: nodeHeight,
    },
  };

  return (
    <Transition nodeRef={nodeRef} in={solved} duration={1000}>
      {(state) => (
        <div
          ref={nodeRef}
          key={"row" + yIndex}
          className="horizontalNumContainer"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {rowColCounts.row[yIndex]?.map((num, index) => {
            return (
              <div key={index} className="xNumCount">
                <p
                  style={{
                    userSelect: "none",
                    fontWeight: "bold",
                  }}
                >
                  {num}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Transition>
  );
};

export default RowNumber;
